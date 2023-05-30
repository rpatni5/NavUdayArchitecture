using NavUdayArchitecture.Database;
using NavUdayArchitecture.Database.Models;
using NavUdayArchitecture.Services.Helper;
using NavUdayArchitecture.Services.Interface;
using NavUdayArchitecture.Services.ViewModels;
using BCryptNet = BCrypt.Net.BCrypt;

namespace NavUdayArchitecture.Services.Services
{
    public class UserService : IUserService
    {
        private DataContext _context;
        public UserService(DataContext context)
        {
            _context = context;
        }


        public User Authenticate(AuthenticateRequest model)
        {
            var user = _context.Users.SingleOrDefault(x => x.Username == model.Username);

            // validate
            if (user == null || !BCryptNet.Verify(model.Password, user.PasswordHash))
                throw new AppException("Username or password is incorrect");

            // authentication successful so generate jwt token
            //var jwtToken = _jwtUtils.GenerateJwtToken(user);

            return user;
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users;
        }

        public User GetById(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null) throw new KeyNotFoundException("User not found");
            return user;
        }
    }
}
