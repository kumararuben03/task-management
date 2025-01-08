using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ListController : ControllerBase
    {
        private readonly ListDBContext dbContext;

        public ListController(ListDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]

        public IActionResult GetAllLists()
        {
            var allLists = dbContext.Lists.ToList();

            return Ok(allLists);
        }

        [HttpGet]
        [Route("{id:long}")]
        public IActionResult GetListById(long id)
        {
            var list = dbContext.Lists.Find(id);

            if(list is null)
            {
                return NotFound();
            }

            return Ok(list);
        }

        [HttpPost]
        public IActionResult AddList(AddListDto addListDto)
        {
            var listEntity = new List()
            {
                Title = addListDto.Title,
                Description = addListDto.Description,

            };
            dbContext.Lists.Add(listEntity);
            dbContext.SaveChanges();

            return Ok(listEntity);
        }

        [HttpPut]

        public IActionResult UpdateList(long id, UpdateListDto updateListDto)
        {
            var list = dbContext.Lists.Find(id);

            if(list is null)
            {
                return NotFound();
            }

            list.Title = updateListDto.Title;
            list.Description = updateListDto.Description;
            list.IsCompleted = updateListDto.IsCompleted;

            dbContext.SaveChanges();

            return Ok(list);
        }
        [HttpDelete]
        [Route("{id:long}")]
        public IActionResult DeleteList(long id)
        {
            var list = dbContext.Lists.Find(id);

            if (list is null)
            {
                return NotFound();
            }

            dbContext.Lists.Remove(list);
            dbContext.SaveChanges();

            return Ok();
        }
    }
}