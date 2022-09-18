using Bnsights.CoreLib.DAL;
using Bnsights.MvcControls;
using ClientApp.BLL.DTOs;
using ClientApp.BLL.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClientApp.BLL.Logic
{
    public class StudentLogic
    {
        private readonly IDbSet<Student> _db;
        private readonly UnitOfWork _uof;

        public StudentLogic(IDbSet<Student> db, UnitOfWork uof)
        {
            _db = db;
            _uof = uof;
        }
        public ListingDTO<List<StudentDto>> GetAll(PagingDTO paging)
        {
            var query = _db.AsQueryable();
            //Todo: apply filters
            paging.TotalCount = query.Count();
            var result = query
                .OrderBy(s => s.ID)
                .Skip(paging.Skip)
                .Take(paging.Take)
                .Select(s => new StudentDto
                {
                    Name = new EnglishArabicDTO { Arabic = s.NameAr, English = s.NameEn },
                    ID = s.ID,
                    Birthday = s.Birthday,
                    Email = s.Email
                }).ToList();
            return new ListingDTO<List<StudentDto>> { PagingDTO = paging, Data = result };
        }
        public StudentDto GetSingle(int id)
        {
            var dbStudent = _db.Find(id);
            var studentDto = new StudentDto();
            studentDto.Name = new EnglishArabicDTO { Arabic = dbStudent.NameAr, English = dbStudent.NameEn };
            studentDto.Email = dbStudent.Email;
            studentDto.Birthday = dbStudent.Birthday;
            return studentDto;
        }
        public void Add(StudentDto studentDto)
        {
            var dbStudent = new Student();

            dbStudent.NameEn = studentDto.Name.English;
            dbStudent.NameAr = studentDto.Name.Arabic;
            dbStudent.Email = studentDto.Email;
            dbStudent.Birthday = studentDto.Birthday;

            _db.Add(dbStudent);
            _uof.Commit();
        }
        public void Edit(StudentDto studentDto)
        {
            var dbStudent = _db.Find(studentDto.ID);
            if (dbStudent == null)
            {
                throw new ArgumentException("Student not found");
            }

            dbStudent.NameEn = studentDto.Name.English;
            dbStudent.NameAr = studentDto.Name.Arabic;
            dbStudent.Email = studentDto.Email;
            dbStudent.Birthday = studentDto.Birthday;

            _uof.Commit();
        }
        public void Delete(int id)
        {
            var dbStudent = _db.Find(id);
            if (dbStudent == null)
            {
                throw new ArgumentException("Student not found");
            }

            _db.Remove(dbStudent);
            _uof.Commit();
        }
    }
}
