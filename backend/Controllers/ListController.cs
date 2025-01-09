using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.DTOs;
using backend.Models;
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
        public async Task<IActionResult> GetAllLists()
        {
            var allLists = await dbContext.Lists.ToListAsync();
            return Ok(allLists);
        }

        [HttpGet]
        [Route("{id:long}")]
        public async Task<IActionResult> GetListById(long id)
        {
            var list = await dbContext.Lists.FindAsync(id);

            if (list is null)
            {
                return NotFound();
            }

            return Ok(list);
        }

        [HttpPost]
        public async Task<IActionResult> AddList(AddListDto addListDto)
        {
            var listEntity = new List
            {
                Title = addListDto.Title,
                Description = addListDto.Description,
            };

            dbContext.Lists.Add(listEntity);
            await dbContext.SaveChangesAsync();

            return Ok(listEntity);
        }

        [HttpPut]
        [Route("{id:long}")]
        public async Task<IActionResult> UpdateList(long id, UpdateListDto updateListDto)
        {
            var list = await dbContext.Lists.FindAsync(id);

            if (list is null)
            {
                return NotFound();
            }

            list.Title = updateListDto.Title;
            list.Description = updateListDto.Description;
            list.IsCompleted = updateListDto.IsCompleted;
            list.CreatedAt = updateListDto.CreatedAt;

            await dbContext.SaveChangesAsync();

            return Ok(list);
        }

        [HttpDelete]
        [Route("{id:long}")]
        public async Task<IActionResult> DeleteList(long id)
        {
            var list = await dbContext.Lists.FindAsync(id);

            if (list is null)
            {
                return NotFound();
            }

            dbContext.Lists.Remove(list);
            await dbContext.SaveChangesAsync();

            return Ok();
        }
    }
}
