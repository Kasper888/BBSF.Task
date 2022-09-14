using Bnsights.CoreLib.Identity;
using Bnsights.CoreLib.Model;
using Bnsights.CoreLib.Utils;
using System.Data.Entity;

namespace ClientApp.BLL.Model
{
    public class ClientAppContext : BBSFContext
    {
        public ClientAppContext()
        {

        }
        public ClientAppContext(UserIdentity identity, Logger logger) : base(identity, logger, "ClientAppContext_Connection")
        {
        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public new DbSet<ClientUser> Users { get; set; }
        public new DbSet<ClientLookupItem> LookupItems { get; set; }
        public virtual DbSet<Student> Students { get; set; }

    }
}
