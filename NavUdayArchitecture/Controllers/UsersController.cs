using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NavUdayArchitecture.Authorization;
using NavUdayArchitecture.Database.Models;
using NavUdayArchitecture.Services.Interface;
using NavUdayArchitecture.Services.ViewModels;
using AllowAnonymousAttribute = NavUdayArchitecture.Authorization.AllowAnonymousAttribute;
using AuthorizeAttribute = NavUdayArchitecture.Authorization.AuthorizeAttribute;

namespace NavUdayArchitecture.Controllers
{
    [ApiController]
    [Route("users")]
    public class UsersController : Controller
    {
        private IUserService _userService;
        private IJwtUtils _jwtUtils;

        public UsersController(IUserService userService, IJwtUtils jwtUtils)
        {
            _userService = userService;
            _jwtUtils = jwtUtils;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            try
            {
                var user = _userService.Authenticate(model);
                // authentication successful so generate jwt token
                var jwtToken = _jwtUtils.GenerateJwtToken(user);

                var response = new AuthenticateResponse(user, jwtToken);
                return Ok(response);

            }
            catch (Exception)
            {
                return BadRequest();
            }

        }
    }
}
