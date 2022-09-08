using Bnsights.CoreLib.Identity;
using Bnsights.CoreLib.Utils;
using Bnsights.CoreLib.Utils.Captcha;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ClientApp.BLL.Logic;
using System.Web.Mvc;
using Bnsights.CoreLib.DTOs.Model.AccountMngmnt;
using Bnsights.CoreLib.Utils.Honeypot;
using ClientApp.BLL;
using System.Web.Configuration;

using Bnsights.CoreLib.BLL;
using System.Data.Entity;
using Bnsights.CoreLib.Model;
using Bnsights.CoreLib.Utils.Security;
using Bnsights.CoreLib.Exceptions;
using Bnsights.CoreLib.Common;
using Bnsights.CoreLib.Common.StringHelper;
using Bnsights.Mvc;

namespace ClientApp.Web.Controllers
{
    public class HomeController : BaseController
    {
        CustomUserIdentity _identity;
        Logger _logger;
        CaptchaGenerator _captchaGenerator;
        Client_AccountManagementLogic _accountMngmtLogic;
        //ProfileLogic _profileLogic;
        LookUpItemLogic _lookupItemLogic;
        CountryLogic _countryLogic;
        AppConfig _config;
        readonly IEncryptionManager _encryptionMngr;
        public HomeController(CustomUserIdentity identity, Logger logger, CaptchaGenerator captchaGenerator, Client_AccountManagementLogic accountMngmtLogic, //ProfileLogic profileLogic,
             CountryLogic countryLogic, LookUpItemLogic lookupItemLogic, IEncryptionManager encryptionMngr, AppConfig config)
        {
            _config = config;
            _identity = identity;
            _logger = logger;
            _captchaGenerator = captchaGenerator;
            _accountMngmtLogic = accountMngmtLogic;
            //_profileLogic = profileLogic;
            _lookupItemLogic = lookupItemLogic;
            _countryLogic = countryLogic;
            _encryptionMngr = encryptionMngr;
        }


        [HttpGet, AllowAnonymous]
        public void Index()
        {
            //FakeIdentity();

            if (_identity.IsAnonymous)
            {
                if (!IsWindowsAuthentication)
                {
                    var query = HttpUtility.ParseQueryString(Request.Url.Query).ToString();
                    var url = string.IsNullOrEmpty(query) ? Constants.LoginPage : Constants.LoginPage + "?" + query;
                    Response.Redirect(url, true);
                }
                else
                {
                    //var usrModel = _accMngmt.Login(null, true);
                    //if (usrModel.IsValid)
                    //    Response.Redirect("~" + GetRedirectionURL(usrModel.Area), true);
                    //else
                    //    Response.Redirect(WebConstants.WindowsAuthErrorPage, true);
                }

                return;
            }

            try
            {
                //var area = _accMngmt.GetUserArea(_appContext.Identity_User.PermSetList, _appContext.Identity_User.SelectedPermSetCID);
                // _identity.Area
                var area = _accountMngmtLogic.GetUserArea(_identity.PermissionSetsList);
                var url = GetRedirectionURL(area);
                Response.Redirect(url, true);
            }
            catch (Exception e)
            {
                _logger.Error(e);
                Response.Redirect(Constants.LoginPage, true);
            }
        }

        [HttpGet, AllowAnonymous]
        public ActionResult SignUp()
        {
            SignUpModel model = new SignUpModel();
            //model.Captcha = _captchaGenerator.Generate();

            return View(model);
        }
        [HttpPost, AllowAnonymous, Honeypot(manuallyHandleBots: true)]
        public ActionResult SignUp(SignUpModel model)
        {
            if (Request.HoneypotFaild())
                return JSON_ValidationError_HoneyPot();

            var validationErrors = CheckValidationErrors();
            if (validationErrors != null) return validationErrors;
            //gosaaa
            //model.ActivationPageURL = Constants.ActivatePageURL;
            model.ActivationPageURL = "/Home/Activate/";

            try
            {
                _accountMngmtLogic.SignUp(model);
                return JSON(new { val = true });
            }
            catch (Exception e)
            {
                _logger.Error(e);
                return JSON_ValidationError(Bnsights.CoreLib.Common.UI.SomethingWentWrong);
            }
        }




        [HttpGet, AllowAnonymous]
        public ActionResult ResendActivation()
        {
            ResendActivationModel model = new ResendActivationModel();

            return View(model);
        }
        [HttpPost, AllowAnonymous, Honeypot(manuallyHandleBots: true)]
        public ActionResult ResendActivation(ResendActivationModel model)
        {
            if (Request.HoneypotFaild())
                return JSON_ValidationError_HoneyPot();

            var validationErrors = CheckValidationErrors();
            if (validationErrors != null) return validationErrors;

            model.ActivationPageURL = "/Home/Activate/";
            try
            {
                _accountMngmtLogic.ResendActivation(model);
                return JSON(new { val = true });
            }
            catch (Exception e)
            {
                _logger.Error(e);
                return JSON_ValidationError(Bnsights.CoreLib.Common.UI.SomethingWentWrong);
            }
        }

        [HttpGet, AllowAnonymous]
        public ActionResult Activate(string id)
        {
            ActivationModel model = _accountMngmtLogic.ActivationTokenValidation(id);

            return View(model);
        }
        [HttpPost, AllowAnonymous, Honeypot(manuallyHandleBots: true)]
        public ActionResult Activate(ActivationModel model)
        {
            if (Request.HoneypotFaild())
                return JSON_ValidationError_HoneyPot();


            var validationErrors = CheckValidationErrors();
            if (validationErrors != null) return validationErrors;

            try
            {
                var userIdentityWrapper = _accountMngmtLogic.Activate(model);

                MvcApplication.Authenticate(userIdentityWrapper.UserIdentityModel);

                var url = GetRedirectionURL(userIdentityWrapper.Area);

                return JSON(new { val = true, url = url });
            }
            catch (Exception e)
            {
                _logger.Error(e);
                return JSON_ValidationError(Bnsights.CoreLib.Common.UI.SomethingWentWrong);
            }
        }
        
        [HttpGet, AllowAnonymous]
        public ActionResult Login()
        {
            LoginModel model = new LoginModel();
            model.RedirectUrl = Request.QueryString["redirectURL"];
            return View(model);
        }
        [HttpPost, AllowAnonymous, Honeypot(manuallyHandleBots: true)]
        public ActionResult Login(LoginModel model)
        {
            if (Request.HoneypotFaild())
                return JSON_ValidationError_HoneyPot();

            var validationErrors = CheckValidationErrors();
            if (validationErrors != null) return validationErrors;

            try
            {
                var userIdentityWrapper = _accountMngmtLogic.Login(model);
                MvcApplication.Authenticate(userIdentityWrapper.UserIdentityModel);
                string url;
                if (string.IsNullOrEmpty(model.RedirectUrl))
                {
                    url = GetRedirectionURL(userIdentityWrapper.Area);
                }
                else
                    url = HttpUtility.UrlDecode(model.RedirectUrl); //RedirectURL Code

                return JSON(new { val = true, url = url });
            }
            catch (Exception e)
            {
                _logger.Error(e);
                var message = e is InvalidCredentialsException || e is UserActivationException
                                    ? e.Message : Bnsights.CoreLib.Common.UI.SomethingWentWrong;
                return JSON_ValidationError(message);
            }
        }

        [HttpGet, AllowAnonymous]
        public ActionResult ForgotPassword()
        {
            ForgotPasswordModel model = new ForgotPasswordModel();
            //model.Captcha = _captchaGenerator.Generate();

            return View(model);
        }
        [HttpPost, AllowAnonymous, Honeypot(manuallyHandleBots: true)]
        public ActionResult ForgotPassword(ForgotPasswordModel model)
        {
            if (Request.HoneypotFaild())
                return JSON_ValidationError_HoneyPot();

            var validationErrors = CheckValidationErrors();
            if (validationErrors != null) return validationErrors;

            model.ResetPasswordPageUrl = Constants.ResetPasswordPageURL;
            model.ActivationPageURL = Constants.ActivatePageURL;
            try
            {
                _accountMngmtLogic.ForgotPassword(model);
                return JSON(new { val = true });
            }
            catch (Exception e)
            {
                _logger.Error(e);
                return JSON_ValidationError(e.Message);
            }
        }

        [HttpGet, AllowAnonymous]
        public ActionResult ResetPassword(string id)
        {
            ResetPasswordModel model = _accountMngmtLogic.ActivationTokenValidation(id);

            return View(model);
        }
        [HttpPost, AllowAnonymous, Honeypot(manuallyHandleBots: true)]
        public ActionResult ResetPassword(ResetPasswordModel model)
        {
            if (Request.HoneypotFaild())
                return JSON_ValidationError_HoneyPot();

            var validationErrors = CheckValidationErrors();
            if (validationErrors != null) return validationErrors;

            try
            {
                var userIdentityWrapper = _accountMngmtLogic.ResetPassword(model);

                MvcApplication.Authenticate(userIdentityWrapper.UserIdentityModel);

                var url = GetRedirectionURL(userIdentityWrapper.Area);

                return JSON(new { val = true, url = url });
            }
            catch (Exception e)
            {
                _logger.Error(e);
                return JSON_ValidationError(Bnsights.CoreLib.Common.UI.SomethingWentWrong);
            }
        }

        [AllowAnonymous]
        public JsonResult RefreshCaptcha()
        {
            var model = _captchaGenerator.Generate();
            return JSON(new { val = RenderRazorViewToString("~/Views/Common/Captcha.cshtml", model, ControllerContext, ViewData, TempData) });
        }

        internal string GetRedirectionURL(Area area)
        {
            switch (area)
            {
                case Area.Admin:
                    return Constants.AdminAreaURL;
                default:
                    throw new ApplicationException("Unexpected area: " + area);
            }
        }

        bool? _isWindowsAuthentication;
        bool IsWindowsAuthentication
        {
            get
            {
                if (_isWindowsAuthentication.HasValue)
                    return _isWindowsAuthentication.Value;

                try
                {
                    var configuration = WebConfigurationManager.OpenWebConfiguration("/");
                    var authenticationSection = (AuthenticationSection)configuration.GetSection("system.web/authentication");
                    if (authenticationSection.Mode == AuthenticationMode.Windows)
                    {
                        if (string.IsNullOrEmpty(System.Threading.Thread.CurrentPrincipal.Identity.Name))
                            _isWindowsAuthentication = false;
                        else
                            _isWindowsAuthentication = true;
                    }
                    else
                        _isWindowsAuthentication = false;
                }
                catch
                {
                    _isWindowsAuthentication = false;
                }
                return _isWindowsAuthentication.Value;
            }
        }


        public ActionResult Logout()
        {
            MvcApplication.Logout();

            return RedirectToAction("Login");
        }
        public ActionResult ChangeLanguage(string urlHash)
        {
            var cookie = Response.Cookies[Constants.CookieLanguage];

            string newLang = cookie.Value == "en" ? "ar" : "en";
            if (!_identity.IsAnonymous)
                _accountMngmtLogic.ChangeUserLanguage(_identity.UserID, newLang);
            _identity.LangKey = newLang;
            cookie.Value = newLang;

            var fragment = string.IsNullOrEmpty(urlHash) ? string.Empty : !urlHash.StartsWith("#") ? $"#{urlHash}" : urlHash;
            var redirectURL = Request.UrlReferrer == null ? $"{Request.Url.Scheme}://{Request.Url.Authority}/Home/Index/{fragment}" : Request.UrlReferrer.AbsoluteUri + fragment;

            return Redirect(redirectURL);
        }

        [HttpGet]
        public ActionResult ChangePassword()
        {
            ChangePasswordModel model = new ChangePasswordModel();
            model.UserID = _identity.UserID;
            return View(model);
        }
        public ActionResult ChangePassword(ChangePasswordModel changePasswordVM)
        {
            var validationErrors = CheckValidationErrors();
            if (validationErrors != null) return validationErrors;
            try
            {
                _accountMngmtLogic.ChangePassword(changePasswordVM);

                return JSON(new
                {
                    val = true,
                    Validation = new[] { UI.RecordUpdated }
                });
            }
            catch (Exception e)
            {
                _logger.Error(e);
                return JSON_ValidationError(UI.SomethingWentWrong);
            }

        }





    }

}