using Bnsights.CoreLib.Exceptions;
using Bnsights.CoreLib.Identity;
using Bnsights.CoreLib.Utils;
using Bnsights.Mvc;
using ClientApp.Web.App_Start;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Bnsights.CoreLib.DTOs.Model;
using Bnsights.CoreLib.Common.StringHelper;
using Bnsights.CoreLib.Utils.Security;
using ClientApp.BLL;
using Autofac.Core;
using Autofac;
using ClientApp.Web.App_Start.ClientApp.Web.App_Start;
using System.Reflection;
using Newtonsoft.Json;

namespace ClientApp.Web
{
    public class MvcApplication : System.Web.HttpApplication
    {
        private static string _appVersionNumber;
        public static string AppVersionNumber
        {
            get
            {
                if (string.IsNullOrEmpty(_appVersionNumber))
                    _appVersionNumber = typeof(MvcApplication).Assembly.GetName().Version.ToString();
                return _appVersionNumber;

            }
        }

        private static string _sessionStateCookieName;
        public static string SessionStateCookieName
        {
            get
            {
                if (string.IsNullOrEmpty(_sessionStateCookieName))
                {
                    var sessionStateSection = (System.Web.Configuration.SessionStateSection)System.Configuration.ConfigurationManager.GetSection("system.web/sessionState");

                    _sessionStateCookieName = sessionStateSection.CookieName;
                }

                return _sessionStateCookieName;
            }
        }

        public static List<Menu> MenuLinks
        {
            get
            {
                return BaseController.AdminMenuItems;

            }
        }

        private UtilizationLogger _utilizationLogger => Bootstrapper.ResolveWeb<UtilizationLogger>();
        private Logger _logger => Bootstrapper.ResolveWeb<Logger>();
        private IEncryptionManager _encryptor => Bootstrapper.ResolveWeb<IEncryptionManager>();
        private UserIdentity _identity => HttpContext.Current.User as UserIdentity;



        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(System.Web.Optimization.BundleTable.Bundles);
            Bootstrapper.Load();
            Bnsights.Mvc.AppStart.Load();
        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            log4net.ThreadContext.Properties["CorrelationID"] = Guid.NewGuid().ToString().ToUpper();

        }

        /// <summary>
        /// Sets the identity to the thread, produces language cookie, Logs Utiliziation
        /// </summary>
        protected void Application_AcquireRequestState(object sender, EventArgs e)
        {
            if (HttpContext.Current.Session == null)
                return;

            var token = Request.Headers["token"];
            var permset = Request.Headers["permset"];
            var model = HttpContext.Current.Session["Principal"] as ClientApp.BLL.CustomUserIdentityModel;
            if (!string.IsNullOrEmpty(token))
            {
                if (model != null && HttpContext.Current.Session.SessionID != token)
                {
                    HandleUnauthorized(isRedirect: true, isRedirectToHome: true);
                    return;
                }
            }

            if (!string.IsNullOrEmpty(permset))
            {
                if (model != null && model.LastUsedPermissionSetID != int.Parse(permset))
                {
                    HandleUnauthorized(isRedirect: true, isRedirectToHome: true);
                    return;
                }
            }

            Authorize(model);
        }

        protected void Application_Error(object sender, EventArgs e)
        {
            try
            {
                var tempCulture = System.Threading.Thread.CurrentThread.CurrentCulture;
                System.Threading.Thread.CurrentThread.CurrentUICulture = System.Threading.Thread.CurrentThread.CurrentCulture = AppExtensions.GetCulture(Constants.English);// always set cultre to english to get english exceptions in logs

                Exception exception = Server.GetLastError();
                string url = null;
                string httpMethod = null;
                try
                {
                    url = Request.Url.ToString();
                    httpMethod = Request.HttpMethod.ToUpper();
                }
                catch (System.Web.HttpException httpException)// catch initialization errors
                {
                    if (!httpException.Message.Contains("Request is not available in this context"))
                        throw;
                }

                if (_identity == null || _identity.IsAnonymous)
                    _logger.Error(exception, "Anonymous - [{0}] - {1}", httpMethod, url);
                else if (_identity.OriginalIdentity != null)
                {
                    _logger.Error(exception, "{0} - {1} on behalf of {2} - {3} - [{4}] - {5} "
                        , _identity.OriginalIdentity.UserID
                        , _identity.OriginalIdentity.Username
                        , _identity.UserID
                        , _identity.Username
                        , httpMethod
                        , url);
                }
                else
                    _logger.Error(exception, "{0} - {1} - [{2}] - {3} ", _identity.UserID, _identity.Username, httpMethod, url);

                System.Threading.Thread.CurrentThread.CurrentUICulture = System.Threading.Thread.CurrentThread.CurrentCulture = tempCulture;

                if (exception is HttpException && exception.Message.Contains("Unable to connect to SQL Server session database"))
                {
                    Response.Clear();
                    Response.StatusCode = 404;
                    Response.Write(@"Unable to connect to SQL Server session database:
                        <br />cd C:\Windows\Microsoft.NET\Framework64\v4.0.30319 
                        <br />aspnet_regsql.exe -S localhost -E -ssadd -sstype p");
                    Response.End();

                    return;
                }

                if (!string.IsNullOrEmpty(url) && !IsAjaxRequest())
                {
                    string message;
                    var httpException = exception as HttpException;
                    if (httpException != null && httpException.GetHttpCode() == 404)
                        message = Bnsights.CoreLib.Common.UI.Error404;
                    else
                        message = Res.Main.UnexpectedError;


                    if (message.Length > 2000)
                        message = message.Substring(0, 2000);

                    message = _encryptor.Encrypt(message);

                    var erroPageLink = $"{Constants.ErrorPage}/?message={message}&correlationID={log4net.ThreadContext.Properties["CorrelationID"]}";
                    //var url = String.Format("{0}/?message={1}", Constants.ErrorPage, Server.UrlEncode(message.Length > 2000 ? message.Substring(0, 2000) : message));

                    Server.ClearError();

                    if (IsSessionException(exception))
                    {
                        Logout();

                        var redirectURLEncoded = Server.UrlEncode(url.Length > 2000 ? url.Substring(0, 2000) : url);

                        Response.Redirect($"{Constants.LoginPage}?redirectURL={redirectURLEncoded}");
                    }
                    else if (Request.Url.LocalPath != Constants.ErrorPage)
                    {
                        Response.Redirect(erroPageLink, true);
                    }
                }
                else
                {
                    if (_identity == null)
                        HandleUnauthorized(true);
                    else if (IsAntiForgeryException(exception))
                        HandleUnauthorized(false);
                    else if (exception is HttpRequestValidationException)
                    {
                        Server.ClearError();
                        Response.Clear();
                        Response.TrySkipIisCustomErrors = true;
                        Response.StatusCode = 523;
                        Response.ContentType = "application/json";
                        Response.End();
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.Fatal("Unexpected Error Occured in Global.asax Application_Error", ex);
            }
        }

        protected void Application_PreSendRequestHeaders(object sender, EventArgs e)
        {
            if (Response.Cookies.AllKeys.Contains("__RequestVerificationToken"))
            {
                var reqCookie = Response.Cookies["__RequestVerificationToken"];
                if (reqCookie != null && IsHttps())
                    reqCookie.Secure = true;
            }

            Response.Headers.Remove("X-Powered-By");
            Response.Headers.Remove("X-AspNet-Version");
            Response.Headers.Remove("X-AspNetMvc-Version");
            Response.Headers.Remove("Server");

            Response.AddHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
            Response.AddHeader("x-Frame-Options", "DENY");
            Response.AddHeader("X-XSS-Protection", "1; mode=block");
            // If web API request (image handler) from IE, then dont add
            var request = ((System.Web.HttpApplication)sender).Context.Request;
            //var isWebAPIrequest = request.AppRelativeCurrentExecutionFilePath != null && request.AppRelativeCurrentExecutionFilePath.StartsWith(WebApiConfig.UrlPrefixRelative);
            var isIEOrEdge = request.UserAgent.Contains("Edge") || request.Browser.Browser == "InternetExplorer";

            //// if NOT WebAPI, OR (WebAPI and NOT InternetExplorer)
            //bool addNonWebApiFriendlyHeaders = !isWebAPIrequest || (isWebAPIrequest && !isIEOrEdge);
            if (!isIEOrEdge)
                Response.AddHeader("X-Content-Type-Options", "nosniff");


            // Disable Cache
            string extension = System.IO.Path.GetExtension(Request.Url.AbsoluteUri);
            if ((string.IsNullOrEmpty(extension)
                || (!extension.Contains(".ttf")
                    && !extension.Contains(".otf")
                    && !extension.Contains(".eot")
                    && !extension.Contains(".woff"))))
            {
                Response.Cache.SetCacheability(HttpCacheability.NoCache);
                Response.Cache.AppendCacheExtension("no-store, must-revalidate");
                Response.AppendHeader("Pragma", "no-cache");
                Response.AppendHeader("Expires", "0");
            }

            // CSP
            string currentDomain = Request.Url.Host + ":" + Request.Url.Port;
            string contentSecurityPolicy = @"default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'unsafe-inline' 'self'; object-src 'self'; font-src 'self'; img-src 'self';connect-src 'self'";
            Response.AddHeader("Content-Security-Policy", contentSecurityPolicy);

        }

        protected void Application_PostRequestHandlerExecute(object sender, EventArgs e)
        {
            if (_identity != null && _identity.IsChanged)
            {
                UserIdentityModel newModel = new UserIdentityModel(_identity);
                HttpContext.Current.Session["Principal"] = newModel;
            }
        }

        protected void Application_End()
        {
            var runtime = typeof(HttpRuntime).InvokeMember("_theRuntime", BindingFlags.NonPublic | BindingFlags.Static | BindingFlags.GetField, null, null, null);
            var runtimeType = runtime.GetType();
            var shutDownMessage = runtimeType.InvokeMember("_shutDownMessage", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.GetField, null, runtime, null);
            var shutDownStack = runtimeType.InvokeMember("_shutDownStack", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.GetField, null, runtime, null);

            var log = $"AppPool Terminating...............\r\nMessage: {shutDownMessage}\r\nStackTrace: {shutDownStack}";
            _logger.Info(log);
        }


        public void Authorize(CustomUserIdentityModel model)
        {
            HttpCookie cookie;
            var ipAddress = GetIPAddress();

            if (model != null)// Logged in User
            {
                CustomUserIdentity principal = new CustomUserIdentity(model);
                HttpContext.Current.User = principal;
                cookie = GetOrCreateCookie(principal.LangKey, false);
                _utilizationLogger.Log(principal.UserID, principal.Username, Request.Url.ToString(), ipAddress);
                if (principal.OriginalIdentity == null)
                    _utilizationLogger.Log(principal.UserID, principal.Username, Request.Url.ToString(), ipAddress);
                else
                    _utilizationLogger.Log(principal.UserID, principal.Username
                                        , principal.OriginalIdentity.UserID, principal.OriginalIdentity.Username
                                        , Request.Url.ToString(), ipAddress);

            }
            else// Anonymous User
            {
                cookie = GetOrCreateCookie(Constants.DefaultLanguage, true);
                _utilizationLogger.LogAnonymous(Request.Url.ToString(), ipAddress);
            }
            HttpContext.Current.Response.Cookies.Add(cookie);

        }
        public void Authenticate(CustomUserIdentityModel model)
        {
            HttpContext.Current.Session["Principal"] = model;
            System.Web.Security.FormsAuthentication.SetAuthCookie(model.Username, false);
            Authorize(model);
        }


        private static bool IsHttps()
        {
            return HttpContext.Current == null ? false : HttpContext.Current.Request.Url.Scheme.ToLower() == "https";
        }
        private bool IsAjaxRequest()
        {
            if (Request == null)
            {
                throw new ArgumentNullException("request");
            }
            var context = HttpContext.Current;
            var isCallbackRequest = false;// callback requests are ajax requests
            if (context != null && context.CurrentHandler != null && context.CurrentHandler is System.Web.UI.Page)
            {
                isCallbackRequest = ((System.Web.UI.Page)context.CurrentHandler).IsCallback;
            }
            return isCallbackRequest || (Request["X-Requested-With"] == "XMLHttpRequest") || (Request.Headers["X-Requested-With"] == "XMLHttpRequest");
        }
        private bool IsSessionException(Exception exception)
        {
            if (exception.GetType() == typeof(EmptySessionKeyException))
                return true;
            else if (exception.InnerException != null)
                return IsSessionException(exception.InnerException);
            else
                return false;
        }
        private bool IsAntiForgeryException(Exception exception)
        {
            if (exception.GetType() == typeof(HttpAntiForgeryException))
                return true;
            else if (exception.InnerException != null)
                return IsAntiForgeryException(exception.InnerException);
            else
                return false;
        }
        private void HandleUnauthorized(bool isRedirect, bool isRedirectToHome = false)
        {
            Server.ClearError();
            Response.Clear();
            Response.TrySkipIisCustomErrors = true;
            Response.StatusCode = 402;
            if (isRedirect)
                Response.Write(JsonConvert.SerializeObject(new
                {
                    redirect_url = isRedirectToHome ? AppConfig.BaseURLS : $"{Bnsights.Mvc.Constants.LoginPage}?redirectURL={(IsAjaxRequest() ? Request.UrlReferrer.AbsoluteUri : Request.Url.AbsoluteUri)}",
                    mode = "redirect"
                }));
            else
                Response.Write(JsonConvert.SerializeObject(new
                {
                    mode = "reload"
                }));
            Response.ContentType = "application/json";
            Response.End();
        }

        public void Logout()
        {
            HttpCookie cookie = HttpContext.Current.Response.Cookies[Constants.CookieLanguage];
            cookie.Expires = DateTime.Now.AddDays(-1d);

            System.Web.Security.FormsAuthentication.SignOut();
            Session.Abandon();
            Response.Cookies.Add(new HttpCookie("ASP.NET_SessionId", ""));
        }
        private string GetIPAddress()
        {
            if (Request.Headers["CF-CONNECTING-IP"] != null)
                return Request.Headers["CF-CONNECTING-IP"].ToString();

            var ipAddress = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

            if (string.IsNullOrEmpty(ipAddress))
                return Request.UserHostAddress;

            var addresses = ipAddress.Split(',');
            return addresses.Length != 0 ? addresses[0] : Request.UserHostAddress;
        }
        private HttpCookie GetOrCreateCookie(string langKey, bool isAnonymous)
        {
            HttpCookie cookie = HttpContext.Current.Request.Cookies[Constants.CookieLanguage];

            if (cookie == null)
            {
                cookie = new HttpCookie(Constants.CookieLanguage);
                cookie.Value = langKey;
            }
            else
            {
                if (!isAnonymous)
                    cookie.Value = langKey;
            }

            cookie.Expires = DateTime.Now.AddMinutes(Constants.CookieExpiryMinutes);
            cookie.HttpOnly = true;
            if (IsHttps())
                cookie.Secure = true;
            cookie.Domain = HttpContext.Current.Request.Url.Host;
            //                cookie.Domain = HttpContext.Current.Request.Url.Host;
            AppExtensions.SetThreadCulture(cookie.Value);
            return cookie;
        }
    }
}