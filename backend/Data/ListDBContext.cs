
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ListDBContext:DbContext
    {
        public ListDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {
            
        }

        public required DbSet<List> Lists { get; set; }

    }
}