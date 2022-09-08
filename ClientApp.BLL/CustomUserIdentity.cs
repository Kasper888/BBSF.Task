﻿using Bnsights.CoreLib.Identity;
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
        public CustomUserIdentity(CustomUserIdentityModel model) : base(model)
            //PartnerID = model.PartnerID;
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
        public CustomUserIdentityModel(UserIdentityModel identity)
    }
}