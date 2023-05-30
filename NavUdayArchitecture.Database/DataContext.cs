using Microsoft.EntityFrameworkCore;
using NavUdayArchitecture.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NavUdayArchitecture.Database
{
    public class DataContext: DbContext
    {
        public DbSet<User> Users { get; set; }

        public DataContext()
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // in memory database used for simplicity, change to a real db for production applications
            options.UseInMemoryDatabase("TestDb");
        }
    }
}
