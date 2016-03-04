using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace DishList.Models
{
    public class Dish
    {
        [ScaffoldColumn(false)]
        public int Id { get; set; }

        [Display(Name = "Название")]
        [Required(ErrorMessage = "Введите название")]
        [StringLength(100, ErrorMessage = "Длина названия не должна превышать 100 символов")]
        public string Title { get; set; }

        [Display(Name = "Описание")]
        [StringLength(1000, ErrorMessage = "Длина описания не должна превышать 1000 символов")]
        public string Description { get; set; }
    }
}