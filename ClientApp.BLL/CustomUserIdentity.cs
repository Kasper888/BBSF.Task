using Bnsights.CoreLib.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClientApp.BLL
{
    public class CustomUserIdentity : UserIdentity
    {
        public CustomUserIdentity()
        {

        }
        public CustomUserIdentity(CustomUserIdentityModel model) : base(model)        {
            //PartnerID = model.PartnerID;        }
        // Add custom fields here
        //public int? PartnerID { get; set; }


    }
    [Serializable]
    public class CustomUserIdentityModel : UserIdentityModel
    {
        //public int? PartnerID { get; set; }
        public CustomUserIdentityModel()
        {

        }
        public CustomUserIdentityModel(UserIdentityModel identity)        {            this.UserID = identity.UserID;            this.OrganizationID = identity.OrganizationID;            this.LangKey = identity.LangKey;            this.NameEN = identity.NameEN;            this.NameAR = identity.NameAR;            this.Username = identity.Username;            this.ImageURL = identity.ImageURL;            this.PermissionSID = identity.PermissionSID;            this.PermissionSetSID = identity.PermissionSetSID;            this.TimeZoneInfoId = identity.TimeZoneInfoId;            this.OriginalIdentity = identity.OriginalIdentity;            this.User = identity.User as Model.ClientUser;        }        public CustomUserIdentityModel(CustomUserIdentity identity)        {            this.UserID = identity.UserID;            this.OrganizationID = identity.OrganizationID;            this.LangKey = identity.LangKey;            this.NameEN = identity.NameEN;            this.NameAR = identity.NameAR;            this.Username = identity.Username;            this.ImageURL = identity.ImageURL;            this.PermissionSID = identity.PermissionSID;            this.PermissionSetSID = identity.PermissionSetSID;            this.TimeZoneInfoId = identity.TimeZoneInfoId;            this.OriginalIdentity = identity.OriginalIdentity;        }
    }
}
