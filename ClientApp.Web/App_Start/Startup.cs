using Bnsights.CoreLib;
using Microsoft.Owin;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

[assembly: OwinStartup(typeof(ClientApp.Web.App_Start.Startup))]

namespace ClientApp.Web.App_Start
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseBBSF();
        }
    }
}