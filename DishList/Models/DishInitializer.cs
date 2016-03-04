using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace DishList.Models
{
    public class DishInitializer : DropCreateDatabaseAlways<DishContext>
    {
        protected override void Seed(DishContext context)
        {
            for (var index = 0; index <= 100; index++)
            {
                context.Dishes.Add(new Dish { Title = "Блюдо #" + index, Description = "Описание №" + index });
            }
            
            base.Seed(context);
        }
    }
}