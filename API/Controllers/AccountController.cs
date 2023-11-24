using API.DTOs;
using Core.Entities.Identity;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using AutoMapper; 
using Core.Interfaces;
using System.Security.Claims;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ApplicationIdentityDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly ITokenGenerationService _tokenService; 

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ApplicationIdentityDbContext dbContext,
            IMapper mapper,
            ITokenGenerationService tokenService) 
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _dbContext = dbContext;
            _mapper = mapper;
            _tokenService = tokenService; 
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
        public async Task<ActionResult<UserDto>> Login(LoginDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);

                // Generate a JWT token with user claims
                var tokenClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(ClaimTypes.Name, user.DisplayName),
                    new Claim(ClaimTypes.Email, user.Email),
                    // Add more claims as needed
                };

                // Generate the JWT token
                var token = _tokenService.GenerateToken(tokenClaims);

                return new UserDto
                {
                    Email = user.Email,
                    Token = token,
                    DisplayName = user.DisplayName
                };
            }

            if (result.RequiresTwoFactor)
            {
                // Handle two-factor authentication if enabled
                // You can implement this based on your setup
                return BadRequest(new { Message = "Two-factor authentication required" });
            }

            return BadRequest(new { Message = "Login failed" });
        }
        
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> LoadUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound(new { Message = "User not found" });
            }

            // Generate a JWT token with user claims
            var tokenClaims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.DisplayName),
                new Claim(ClaimTypes.Email, user.Email),
                // Add more claims as needed
            };

            // Generate the JWT token
            var token = _tokenService.GenerateToken(tokenClaims);

            var userDto = new UserDto
            {
                Email = user.Email,
                DisplayName = user.DisplayName,
                Token = token // Set the Token property with the generated token
            };

            return Ok(userDto);
        }




        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok(new { Message = "Logout successful" });
        }

        [Authorize]
        [HttpGet("user-address")]
        public IActionResult GetUserAddress()
        {
            var userId = _userManager.GetUserId(User);
            var user = _dbContext.Users.Find(userId);

            if (user == null)
            {
                return NotFound(new { Message = "User not found" });
            }

            var address = _mapper.Map<AddressDto>(user.Address);
            // Return the user's address as needed

            return Ok(new { Address = address });
        }
        
        [HttpGet("check-email-exists")]
        public async Task<IActionResult> CheckEmailExists(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest(new { Message = "Email is required" });
            }

            var user = await _userManager.FindByEmailAsync(email);

            if (user != null)
            {
                return Ok(new { EmailExists = true });
            }

            return Ok(new { EmailExists = false });
        }

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
