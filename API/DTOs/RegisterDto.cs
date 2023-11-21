using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email address")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Password is required")]
    [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
    [DataType(DataType.Password)]
    public string Password { get; set; }

    [Required(ErrorMessage = "Confirm Password is required")]
    [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
    [DataType(DataType.Password)]
    public string ConfirmPassword { get; set; }
    
    [Required(ErrorMessage = "Display Name is required")]
    public string DisplayName { get; set; }
}