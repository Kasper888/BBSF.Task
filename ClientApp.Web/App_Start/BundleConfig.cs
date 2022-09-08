using Bnsights.Mvc;
using ClientDependency.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace ClientApp.Web
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            BnsightsAssets();
            AnonymousLayoutAssets();
            MasterLayoutAssets();

        }

        private static void BnsightsAssets()
        {
            BundleManager.CreateJsBundle("BnsightsScriptsEN",
            new JavascriptFile("~/Assets/Bnsights/JSResources/FormValidationScripts-EN.js"),
            new JavascriptFile("~/Assets/Bnsights/FormValidationScripts.js"),
            new JavascriptFile("~/Assets/Bnsights/Bnsights.js"),
            new JavascriptFile("~/Assets/Bnsights/FormValidationDictionary.js"),
            new JavascriptFile("~/Assets/Bnsights/ww.resourceEditor.js"),
            new JavascriptFile("~/Assets/vendors/general/block-ui/jquery.blockUI.js"),
            new JavascriptFile("~/Assets/Bnsights/Plugins/toastr/toastr.min.js"),
            new JavascriptFile("~/Assets/Bnsights/plugins/jquery.confirm/jquery.confirm.js")
            );


            BundleManager.CreateJsBundle("BnsightsScriptsAR",
            new JavascriptFile("~/Assets/Bnsights/JSResources/FormValidationScripts-AR.js"),
            new JavascriptFile("~/Assets/Bnsights/FormValidationScripts.js"),
            new JavascriptFile("~/Assets/Bnsights/Bnsights.js"),
            new JavascriptFile("~/Assets/Bnsights/FormValidationDictionary.js"),
            new JavascriptFile("~/Assets/Bnsights/ww.resourceEditor.js"),
            new JavascriptFile("~/Assets/vendors/general/block-ui/jquery.blockUI.js"),
            new JavascriptFile("~/Assets/Bnsights/Plugins/toastr/toastr.min.js"),
            new JavascriptFile("~/Assets/Bnsights/plugins/jquery.confirm/jquery.confirm.js")
            );


            BundleManager.CreateCssBundle("BnsightsStyles",
            new CssFile("~/Assets/Bnsights/bnsights.css"),
            new CssFile("~/Assets/Bnsights/bnsights-controls.css"),
            new CssFile("~/Assets/Bnsights/Plugins/toastr/toastr.min.css"));

            BundleManager.CreateCssBundle("BnsightsStylesRTL",
           new CssFile("~/Assets/Bnsights/bnsights-rtl.css"),
           new CssFile("~/Assets/Bnsights/bnsights-controls-rtl.css"),
           new CssFile("~/Assets/Bnsights/Plugins/toastr/toastr.min.rtl.js"));
        }
        private static void AnonymousLayoutAssets()
        {
            BundleManager.CreateCssBundle("AnonymousStylesRTL",
            new CssFile("~/Assets/css/pages/general/login/login-1.rtl.min.css"),
            new CssFile("~/Assets/css/style.bundle.rtl.min.css"),
            //new CssFile("~/Assets/global/css/bootstrap-rtl.css"),
            new CssFile("~/Assets/css/skins/aside/dark.rtl.min.css"),
            new CssFile("~/Assets/css/skins/brand/dark.rtl.min.css"),
            new CssFile("~/Assets/css/skins/header/base/light.rtl.min.css"),
            new CssFile("~/Assets/css/skins/header/menu/light.rtl.min.css"),
            new CssFile("~/Assets/Fonts/cairo-font.css"),
            new CssFile("~/Assets/vendors/general/@fortawesome/fontawesome-free/css/all.min.rtl.css"),
            new CssFile("~/Assets/custom/custom.css"),
            new CssFile("~/Assets/custom/custom-rtl.css"),
            new CssFile("~/Assets/Bnsights/Plugins/toastr/toastr.min.rtl.js"));


            BundleManager.CreateCssBundle("AnonymousStyles",
            new CssFile("~/Assets/css/pages/general/login/login-1.min.css"),
            new CssFile("~/Assets/vendors/general/perfect-scrollbar/css/perfect-scrollbar.css"),
            new CssFile("~/Assets/css/style.bundle.min.css"),
            new CssFile("~/Assets/css/skins/aside/dark.min.css"),
            new CssFile("~/Assets/css/skins/brand/dark.min.css"),
            new CssFile("~/Assets/css/skins/header/base/light.min.css"),
            new CssFile("~/Assets/css/skins/header/menu/light.min.css"),
            new CssFile("~/Assets/vendors/general/@fortawesome/fontawesome-free/css/all.min.css"),
            new CssFile("~/Assets/custom/custom.css"),
            new CssFile("~/Assets/Bnsights/Plugins/toastr/toastr.min.css"));




            BundleManager.CreateJsBundle("AnonymousScripts",
            new JavascriptFile("~/Assets/vendors/general/popper.js/popper.min.js"),
            new JavascriptFile("~/Assets/vendors/general/bootstrap/bootstrap.min.js"),
            new JavascriptFile("~/Assets/vendors/general/js-cookie/js.cookie.js"),
            new JavascriptFile("~/Assets/vendors/general/moment/min/moment.min.js"),
            new JavascriptFile("~/Assets/vendors/general/tooltip.js/dist/umd/tooltip.min.js"),
            new JavascriptFile("~/Assets/vendors/general/perfect-scrollbar/dist/perfect-scrollbar.js"),
            new JavascriptFile("~/Assets/vendors/general/sticky-js/dist/sticky.min.js"),
            new JavascriptFile("~/Assets/vendors/general/jquery-validation/dist/jquery.validate.js"),
            new JavascriptFile("~/Assets/vendors/general/jquery-validation/dist/additional-methods.js"),
            new JavascriptFile("~/Assets/vendors/general/wnumb/wNumb.js"),
            new JavascriptFile("~/Assets/js/scripts.bundle.min.js"),
            new JavascriptFile("~/Assets/js/pages/login/login-general.min.js"),
            new JavascriptFile("~/Assets/Bnsights/Plugins/toastr/toastr.min.js"));
        }
        private static void MasterLayoutAssets()
        {
            BundleManager.CreateCssBundle("MasterStylesRTL",
            new CssFile("~/Assets/css/style.bundle.rtl.min.css"),
            new CssFile("~/Assets/css/skins/aside/dark.rtl.min.css"),
            new CssFile("~/Assets/css/skins/brand/dark.rtl.min.css"),
            new CssFile("~/Assets/css/skins/header/base/light.rtl.min.css"),
            new CssFile("~/Assets/vendors/general/perfect-scrollbar/css/perfect-scrollbar.rtl.css"),
            new CssFile("~/Assets/css/skins/header/menu/light.rtl.min.css"),
            new CssFile("~/Assets/vendors/general/@fortawesome/fontawesome-free/css/all.min.rtl.css"),
            new CssFile("~/Assets/custom/custom.css"),
            new CssFile("~/Assets/custom/custom-rtl.css"));


            BundleManager.CreateCssBundle("MasterStyles",
            new CssFile("~/Assets/css/style.bundle.min.css"),
            new CssFile("~/Assets/css/skins/aside/dark.min.css"),
            new CssFile("~/Assets/css/skins/brand/dark.min.css"),
            new CssFile("~/Assets/css/skins/header/base/light.min.css"),
            new CssFile("~/Assets/css/skins/header/menu/light.min.css"),
            new CssFile("~/Assets/vendors/general/perfect-scrollbar/css/perfect-scrollbar.css"),
            new CssFile("~/Assets/Fonts/cairo-font.css"),
            new CssFile("~/Assets/vendors/general/@fortawesome/fontawesome-free/css/all.min.css"),
            new CssFile("~/Assets/custom/custom.css"));



            BundleManager.CreateJsBundle("MasterScripts",
            new JavascriptFile("~/Assets/vendors/general/popper.js/popper.min.js"),
            new JavascriptFile("~/Assets/vendors/general/bootstrap/bootstrap.min.js"),
            new JavascriptFile("~/Assets/vendors/general/js-cookie/js.cookie.js"),
            new JavascriptFile("~/Assets/vendors/general/moment/min/moment.min.js"),
            new JavascriptFile("~/Assets/vendors/general/tooltip.js/dist/umd/tooltip.min.js"),
            new JavascriptFile("~/Assets/vendors/general/perfect-scrollbar/dist/perfect-scrollbar.js"),
            new JavascriptFile("~/Assets/vendors/general/sticky-js/dist/sticky.min.js"),
            new JavascriptFile("~/Assets/vendors/general/jquery-validation/dist/jquery.validate.js"),
            new JavascriptFile("~/Assets/vendors/general/jquery-validation/dist/additional-methods.js"),
            new JavascriptFile("~/Assets/vendors/general/wnumb/wNumb.js"),
            new JavascriptFile("~/Assets/js/scripts.bundle.min.js"));

        }
    }
}
