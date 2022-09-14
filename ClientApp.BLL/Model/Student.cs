using Bnsights.CoreLib.DAL;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClientApp.BLL.Model
{
    public class Student : AuditableEntity<int>
    {
        [Required, MaxLength(255)]
        public string NameEn { get; set; }
        [Required, MaxLength(255)]
        public string NameAr { get; set; }
        [Required, EmailAddress]
        public string Email { get; set; }
        [DataType(DataType.Date)]
        public DateTime Birthday { get; set; }
        public override string CreatedBy { get; set; }
        public override string ModifiedBy { get; set; }
        public override DateTime Created { get; set; }
        public override DateTime Modified { get; set; }
        public override int ID { get; set; }
    }
}
