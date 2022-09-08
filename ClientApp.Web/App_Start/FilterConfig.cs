using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClientApp.Web.App_Start
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Mvc;
    using WebMarkupMin.AspNet4.Mvc;

    namespace ClientApp.Web.App_Start
    {
        public class FilterConfig
        {
            public static void RegisterGlobalFilters(GlobalFilterCollection filters)
            {
                filters.Add(new CompressContentAttribute());
                filters.Add(new MinifyHtmlAttribute());
                filters.Add(new MinifyXmlAttribute());
            }

        }
    }
}