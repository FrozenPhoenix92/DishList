using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace DishList.Models
{
    public class DishContext : DbContext
    {
        public DbSet<Dish> Dishes { get; set; }
    }
}