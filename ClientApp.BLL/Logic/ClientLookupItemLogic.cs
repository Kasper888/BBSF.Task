using Bnsights.CoreLib.BLL;
using ClientApp.BLL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bnsights.CoreLib.DAL;
using Bnsights.CoreLib.Utils;
using System.Data.Entity;
using Bnsights.CoreLib.Model;
using Bnsights.CoreLib.Utils.Security;

namespace ClientApp.BLL.Logic
{
    public class ClientLookupItemLogic : LookUpItemLogic<ClientLookupItem>
    {
        public ClientLookupItemLogic(IDbSet<ClientLookupItem> lookupitemDAL, UnitOfWork uow, Logger logger
            , IEncryptionManager encryptionManager) 
            : base(lookupitemDAL, uow, logger, encryptionManager)
        {
        }
    }
    public class ClientLookupLogic : LookupLogicBase<Lookup, ClientLookupItem>
    {
        public ClientLookupLogic(IDbSet<Lookup> lookupDAL, IDbSet<ClientLookupItem> lookupitemDAL
            , IDbSet<LookupGroup> lookupgroupDAL, UnitOfWork uow, Logger logger, IEncryptionManager encryptionManager) 
            : base(lookupDAL, lookupitemDAL, lookupgroupDAL, uow, logger, encryptionManager)
        {
        }
    }
}
