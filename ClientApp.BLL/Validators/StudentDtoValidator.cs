using ClientApp.BLL.DTOs;
using ClientApp.BLL.Model;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClientApp.BLL.Validators
{
    public class StudentDtoValidator : AbstractValidator<StudentDto>
    {
        public StudentDtoValidator(IDbSet<Student> db)
        {
            RuleFor(x => x.Name.English).NotEmpty().Length(2, 255);
            RuleFor(x => x.Name.Arabic).NotEmpty().Length(2, 255);
            RuleFor(x => x.Birthday).LessThan(DateTime.Now.AddYears(-21)).WithMessage("Age must be 21 at least");
            RuleFor(x => x.Email).NotEmpty().EmailAddress()
                .Must((student, email) => !db.Any(s => s.Email == email && s.ID != student.ID))
                .WithMessage("Email already exits");
        }
    }
}
