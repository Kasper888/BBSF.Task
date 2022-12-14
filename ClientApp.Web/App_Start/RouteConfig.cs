using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace ClientApp.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
                namespaces: new[] { "ClientApp.Web.Controllers" }
            );
            routes.MapRoute(
             name: "Default1",                                            // Route name
             url: "{controller}/{action}/{id}",                           // URL with parameters
             defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },  // Parameter defaults
             namespaces: new[] { "ClientApp.Web.Areas.Controllers" }      // required
           );
        }
    }
}
