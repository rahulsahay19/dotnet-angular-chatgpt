using API.DTOs;
using Core.Entities.Identity;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using AutoMapper; 

namespace API.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ApplicationIdentityDbContext _dbContext;
        private readonly IMapper _mapper; 

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ApplicationIdentityDbContext dbContext,
            IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _dbContext = dbContext;
            _mapper = mapper; 
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = _mapper.Map<ApplicationUser>(model); 

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok(new { Message = "Registration successful" });
            }

            return BadRequest(new { Message = "Registration failed", Errors = result.Errors });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                return Ok(new { Message = "Login successful" });
            }

            if (result.RequiresTwoFactor)
            {
                // Handle two-factor authentication if enabled
                // You can implement this based on your setup
                return BadRequest(new { Message = "Two-factor authentication required" });
            }

            return BadRequest(new { Message = "Login failed" });
        }

        // Other actions...

        [Authorize]
        [HttpPost("update-user-address")]
        public async Task<IActionResult> UpdateUserAddress(AddressDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = _userManager.GetUserId(User);
            var user = _dbContext.Users.Find(userId);

            if (user == null)
            {
                return NotFound(new { Message = "User not found" });
            }

            var address = _mapper.Map<Address>(model); 
            user.Address = address;

            await _dbContext.SaveChangesAsync();

            return Ok(new { Message = "User address updated successfully" });
        }
    }
}
