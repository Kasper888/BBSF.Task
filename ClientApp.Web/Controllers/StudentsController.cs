using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Bnsights.MvcControls;
using ClientApp.BLL;
using ClientApp.BLL.DTOs;
using ClientApp.BLL.Logic;

namespace ClientApp.Web.Controllers
{
    public class StudentsController : BaseController
    {
        private readonly StudentLogic _studentLogic;

        public StudentsController(StudentLogic studentLogic)
        {
            _studentLogic = studentLogic;
        }

        // GET: Students
        public ActionResult Index()
        {
            return View(_studentLogic.GetAll(new Bnsights.MvcControls.PagingDTO { PageCount = AppConfig.PagingCountS }));
        }
        public ActionResult GetListing(PagingDTO pagingDTO)
        {
            var model = _studentLogic.GetAll(pagingDTO);
            return JSON(new
            {
                PagingDTO = model.PagingDTO,
                PV = RenderRazorViewToString("~/Views/Students/_Listing.cshtml", model, ControllerContext, ViewData, TempData)
            });
        }

        // GET: Students/Edit/5
        public ActionResult LoadUpsertModal(int? id)
        {
            var student = id == null ? new StudentDto() : _studentLogic.GetSingle(id.Value);
            if (student == null)
            {
                return HttpNotFound();
            }
            return PartialView("~/Views/Students/_UpsertModal.cshtml", student);
        }

        // POST: Students/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Upsert(StudentDto student)
        {
            if (ModelState.IsValid)
            {
                if (student.ID == 0)
                {
                    _studentLogic.Add(student);
                }
                else
                {
                    _studentLogic.Edit(student);
                }
                return new HttpStatusCodeResult(HttpStatusCode.OK);
            }
            return PartialView("~/Views/Students/_UpsertModal.cshtml", student);
        }

        // POST: Students/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            _studentLogic.Delete(id);
            return RedirectToAction("Index");
        }
    }
}
