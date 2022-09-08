using Bnsights.CoreLib.BLL;
using Bnsights.CoreLib.DTOs.Model.Folders;
using Bnsights.CoreLib.Model;
using System.Data.Entity;
using System.Linq;

namespace ClientApp.BLL.Logic
{
    public class ClientFolderAutorization : IFolderAuthorization
    {
        private readonly IDbSet<LibraryFolder> _folderDAL;
        public ClientFolderAutorization(IDbSet<LibraryFolder> folderDAL)
        {
            _folderDAL = folderDAL;
        }

        public RootFolderDTO GetUserRootFolders(int? userID = null, string extraParameters = null)
        {
            return new RootFolderDTO
            {
                FoldersIDs = _folderDAL.Where(f => !f.ParentFolderID.HasValue).Select(f => f.ID).ToList(),
                CanCreateFoldersInRoot = true,
                AccessPermission = AccessPermission.ReadWrite,
            };
        }

        public void NewFolderAdded(int userID, int folderID)
        {

        }
    }
}
