using NavUdayArchitecture.Database.Models;
using NavUdayArchitecture.Services.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NavUdayArchitecture.Services.Interface
{
    public interface IUserService
    {
        User Authenticate(AuthenticateRequest model);
        IEnumerable<User> GetAll();
        User GetById(int id);
    }
}
