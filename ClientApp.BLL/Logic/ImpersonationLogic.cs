using Bnsights.CoreLib.DTOs.Model.AccountMngmnt;
using Bnsights.CoreLib.Identity;
using ClientApp.BLL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BBSFLogic = Bnsights.CoreLib.BLL.AccountManagementLogic;

namespace ClientApp.BLL.Logic
{
    public class ImpersonationLogic : Bnsights.CoreLib.BLL.IImpersonationLogic
    {
        private readonly BBSFLogic _bbsfLogic;

        public ImpersonationLogic(BBSFLogic bbsfLogic)
        {
            this._bbsfLogic = bbsfLogic;
        }

        public T Impersonate<T>(string username) where T : UserIdentity
        {
            // _bbsfLogic is of type Bnsights.CoreLib.BLL.AccountManagementLogic
            // Login skipping the password check, to get the default BBSF IdentityModel
            var identityModel = _bbsfLogic.Login(
                new LoginModel { Username = username },
                licenseCheck: false,
                skipPasswordCheck: true);

            // Gain Access to the ClientUser Object
            var clientUser = identityModel.User as ClientUser;

            // Use your own CustomUserIdentityModel
            var customModel = new CustomUserIdentityModel(identityModel);
            // Load Custom Identity Properties from database (in this case TeamID)
            // here u should get the code from Login Method in ClientAccountManagementLogic
            //customModel.TeamID = clientUser.TeamID;

            // Pass the customModel to the thread Identity
            CustomUserIdentity identity = new CustomUserIdentity(customModel);
            return identity as T;
        }
    }
}
