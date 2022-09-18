using Bnsights.MvcControls;
using ClientApp.BLL.Validators;
using FluentValidation.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClientApp.BLL.DTOs
{
    public class StudentDto
    {
        public int ID { get; set; }
        public EnglishArabicDTO Name { get; set; }

        public string Email { get; set; }
        public DateTime Birthday { get; set; }
    }
}
