using Bnsights.CoreLib.Utils.Security;
using Bnsights.Mvc;
using ClientApp.Web.App_Start;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ClientApp.Web.Controllers
{

    public class ErrorController : BaseController
    {
        private IEncryptionManager _encryptor;
        public ErrorController(IEncryptionManager encryptor)
        {
            _encryptor = encryptor;
        }
        public ActionResult Index(string message, string correlationID)
        {
            message = string.IsNullOrEmpty(message) ? Bnsights.CoreLib.Common.UI.SomethingWentWrong : _encryptor.Decrypt(message);
            ViewBag.Message = message;
            ViewBag.CorrelationID = correlationID;

            return View();
        }
    }
}