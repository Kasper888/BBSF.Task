using Bnsights.CoreLib.BLL;
using Bnsights.CoreLib.Common.StringHelper;
using Bnsights.CoreLib.DAL;
using Bnsights.CoreLib.DTOs.Model.AccountMngmnt;
using Bnsights.CoreLib.Identity;
using Bnsights.CoreLib.Model;
using Bnsights.CoreLib.Utils;
using Bnsights.CoreLib.Utils.Security;
using ClientApp.BLL.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BBSFLogic = Bnsights.CoreLib.BLL.AccountManagementLogic;

namespace ClientApp.BLL.Logic
{
    public class Client_AccountManagementLogic : AccountManagementLogic<ClientUser>
    {
        private readonly BBSFLogic _bbsfLogic; 
        public Client_AccountManagementLogic(BBSFLogic bbsfLogic, AppConfig appConfig, Bnsights.CoreLib.DAL.TransactionFactory transactionFactory, UnitOfWork unitOfWork, 
                                             IDbSet<ClientUser> userDAL, IDbSet<UserInfo> userInfoDAL, PasswordHashing hasher,
                                             RandomStringGenerator randomStringGenerator, IDbSet<Organization> organizationDAL, IDbSet<PermissionSet> permissionSetDAL,
                                             IDbSet<ImpersonationRule> impersonationRuleRepo, TransactionFactory transFactory, NotificationsLogic notificationsLogic,
                                             IDbSet<Template> templateDAL, PasswordHashing passwordHashing, LicenseManagementLogic licenseManagementLogic,
                                             IEncryptionManager encryptor, BaseConfig baseConfig)
            : base(userDAL, userInfoDAL, unitOfWork, hasher, randomStringGenerator, organizationDAL, permissionSetDAL, impersonationRuleRepo, transFactory, 
                  notificationsLogic, templateDAL, passwordHashing, licenseManagementLogic, encryptor, baseConfig)

        {
            _bbsfLogic = bbsfLogic;
            _unitOfWork = unitOfWork;
        }
        public override void ResendActivation(ResendActivationModel model)
        {
            model.ActivationTemplateID = (int)Templates.ActivationTemplate;
            model.ActivationPageURL = GetFullUrl(model.ActivationPageURL);

            _bbsfLogic.ResendActivation(model);
        }
       
        public UserIdentityModelWrapper Activate(ActivationModel model)
        {
            var identityModel = _bbsfLogic.Activate(model);
            var customModel = new CustomUserIdentityModel(identityModel);
            UserIdentityModelWrapper wrapper = new UserIdentityModelWrapper(customModel);
            wrapper.Area = GetUserArea(identityModel.PermissionSets);

            return wrapper;
        }
        public UserIdentityModelWrapper Login(LoginModel model)
        {
            // Override defaults here if required

            //model.FailedLogin_Count = 10;
            //model.FailedLogin_LockoutMinutes = 30;

            var identityModel = _bbsfLogic.Login(model, false);
            var customModel = new CustomUserIdentityModel(identityModel);
            UserIdentityModelWrapper wrapper = new UserIdentityModelWrapper(customModel);
            wrapper.Area = GetUserArea(identityModel.PermissionSets);

            return wrapper;
        }
        public Area GetUserArea(List<int> permissionSets)
        {
            if (permissionSets.Contains((int)PermissionSets.Admin))
                return Area.Admin;

            throw new ApplicationException($"Could not find an area. PermissionSetSID{string.Join(",", permissionSets)}");
        }
        public override void ForgotPassword(ForgotPasswordModel model)
        {
            model.ActivationTemplateID = (int)Templates.ActivationTemplate;
            model.ResetPasswordTemplateID = (int)Templates.ResetPasswordTemplate;

            model.ActivationPageURL = GetFullUrl(model.ActivationPageURL);
            model.ResetPasswordPageUrl = GetFullUrl(model.ResetPasswordPageUrl);

            _bbsfLogic.ForgotPassword(model);
        }
        public UserIdentityModelWrapper ResetPassword(ResetPasswordModel model)
        {
            var identityModel = _bbsfLogic.ResetPassword(model);
            var customModel = new CustomUserIdentityModel(identityModel);
            UserIdentityModelWrapper wrapper = new UserIdentityModelWrapper(customModel);
            wrapper.Area = GetUserArea(identityModel.PermissionSets);

            return wrapper;
        }
      

    }
    public class UserIdentityModelWrapper
    {
        public CustomUserIdentityModel UserIdentityModel { get; set; }
        public Area Area { get; set; }
        public UserIdentityModelWrapper()
        {

        }
        public UserIdentityModelWrapper(CustomUserIdentityModel model)
        {
            UserIdentityModel = model;
        }
    }
}
