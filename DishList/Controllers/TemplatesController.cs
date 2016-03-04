using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DishList.Controllers
{
    public class TemplatesController : Controller
    {
        public ActionResult Create()
        {
            Response.AddHeader("Content-Disposition", new System.Net.Mime.ContentDisposition { Inline = true, FileName = "index.htm" }.ToString());
            return File(Server.MapPath("/Templates/") + "create.html", "text/plain");
        }

        public ActionResult Delete()
        {
            Response.AddHeader("Content-Disposition", new System.Net.Mime.ContentDisposition { Inline = true, FileName = "index.htm" }.ToString());
            return File(Server.MapPath("/Templates/") + "delete.html", "text/plain");
        }
    }
}