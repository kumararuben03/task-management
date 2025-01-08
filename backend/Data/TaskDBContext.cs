using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class TaskDBContext:DbContext
    {
        public TaskDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {
            
        }

        public required DbSet<Stock> Stocks { get; set; }
        public required DbSet<Comment> Comments { get; set; }
    }
}