using Bnsights.CoreLib.BLL;
using Bnsights.CoreLib.DAL;
using Bnsights.CoreLib.Identity;
using Bnsights.CoreLib.Utils;
using Bnsights.CoreLib.Utils.Security;
using ClientApp.BLL.Model;

namespace ClientApp.BLL.Logic
{
    public class ClientBBSFUserLogic : BBSFUserLogic<ClientUser, ClientAppContext>
    {
        public ClientBBSFUserLogic(UserIdentity useridentity, PermissionSetLogic PermissionSetLogic, UnitOfWork unitOfWork, FileLogic filelogic, 
            ClientAppContext context, TransactionFactory transactionFactory, IAccountManagementLogic accMngmt, IEncryptionManager encryptor, BaseConfig baseConfig) 
            : base(useridentity, PermissionSetLogic, unitOfWork, filelogic, context, transactionFactory, accMngmt, encryptor, baseConfig)
        {
        }
    }
}
