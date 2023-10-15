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
        private readonly ILogger<UsersController> _logger;
        public UsersController(IUserService userService, IJwtUtils jwtUtils, ILogger<UsersController> logger)
        {
            _userService = userService;
            _jwtUtils = jwtUtils;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            _logger.LogInformation("UsersController Authenticate Started.");
            try
            {
                var user = _userService.Authenticate(model);
                // authentication successful so generate jwt token
                var jwtToken = _jwtUtils.GenerateJwtToken(user);

                var response = new AuthenticateResponse(user, jwtToken);
                _logger.LogInformation("UsersController Authenticate Ended.");
                return Ok(response);

            }
            catch (Exception)
            {
                return BadRequest();
            }

        }
    }
}