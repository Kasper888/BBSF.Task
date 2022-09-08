using Bnsights.CoreLib.BLL;

namespace ClientApp.BLL.Logic
{
    public class ClientLayoutResolver : ILayoutResolver
    {
        // here u should check for userIdentity and based on app Logic, decide which layout, mainly by PermissionSet
        public string GetCurrentLayout(int userId, string extraParameters = null)
        {
            return "~/Views/Layout/_AdminLayout.cshtml";
        }
    }
}
