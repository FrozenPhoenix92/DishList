using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DishList.Models;

namespace DishList.Controllers
{
    public class HomeController : Controller
    {
        private readonly DishContext _dishContext = new DishContext();

        public ActionResult Index()
        {
            return View();
        }
        
        public JsonResult List()
        {
            return Json(_dishContext.Dishes.ToArray(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Get(int id)
        {
            return Json(_dishContext.Dishes.Find(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Create(Dish dish)
        {
            if (!ModelState.IsValid) return Json(false, JsonRequestBehavior.AllowGet);
            _dishContext.Dishes.Add(dish);
            _dishContext.SaveChanges();
            return Json(dish, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Dish dish)
        {
            if (!ModelState.IsValid) return Json(false, JsonRequestBehavior.AllowGet);
            _dishContext.Entry(dish).State = System.Data.Entity.EntityState.Modified;
            _dishContext.SaveChanges();
            return Json(dish, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int id)
        {
            var dish = _dishContext.Dishes.Find(id);
            if (dish == null) return Json(false, JsonRequestBehavior.AllowGet);
            _dishContext.Dishes.Remove(dish);
            _dishContext.SaveChanges();
            return Json(id, JsonRequestBehavior.AllowGet);
        }
    }
}