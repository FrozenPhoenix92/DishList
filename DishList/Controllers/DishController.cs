using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using DishList.Models;

namespace DishList.Controllers
{
    public class DishController : ApiController
    {
        private readonly DishContext _dishContext = new DishContext();
        
        [HttpGet]
        public IEnumerable<Dish> List()
        {
            return _dishContext.Dishes.ToArray();
        }

        [HttpGet]
        public Dish Get(int id)
        {
            return _dishContext.Dishes.Find(id);
        }

        [HttpPost]
        public Dish Create(Dish dish)
        {
            if (!ModelState.IsValid) return null;
            _dishContext.Dishes.Add(dish);
            _dishContext.SaveChanges();
            return dish;
        }

        [HttpPut]
        public Dish Update(Dish dish)
        {
            if (!ModelState.IsValid) return null;
            _dishContext.Entry(dish).State = System.Data.Entity.EntityState.Modified;
            _dishContext.SaveChanges();
            return dish;
        }

        [HttpDelete]
        public int? Delete(int id)
        {
            var dish = _dishContext.Dishes.Find(id);
            if (dish == null) return null;
            _dishContext.Dishes.Remove(dish);
            _dishContext.SaveChanges();
            return id;
        }
    }
}