using Bnsights.CoreLib.DTOs.Model;
using Bnsights.CoreLib.Utils;
using Bnsights.CoreLib.Utils.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Resources;


namespace ClientApp.Web
{
    public class BaseController : Bnsights.Mvc.BaseController
    {
        private IEncryptionManager _EncryptionManager;        public IEncryptionManager EncryptionManager        {            get            {                if (_EncryptionManager == null)                    _EncryptionManager = App_Start.Bootstrapper.ResolveWeb<IEncryptionManager>();                return _EncryptionManager;            }        }

        public BaseController() : base()
        {

        }

        protected MvcApplication MvcApplication
        {
            get
            {
                return HttpContext.ApplicationInstance as MvcApplication;
            }
        }
        public int ExtractFromQueryString<T>(string key, System.Linq.Expressions.Expression<Func<T>> propertyExpression)
        {
            var qs = Request.QueryString[key];
            if (string.IsNullOrEmpty(qs))
                throw new ArgumentException("Invalid qs value: " + qs);
            else
            {
                var idInt = EncryptionManager.Decrypt<int>(qs, "Invalid " + Bnsights.CoreLib.Utils.ExpressionsHelper.GetPropertyName(propertyExpression) + ": " + qs);
                return idInt;
            }
        }
    }
}