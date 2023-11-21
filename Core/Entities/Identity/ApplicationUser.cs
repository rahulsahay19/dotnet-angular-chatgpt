using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Identity;

public class ApplicationUser : IdentityUser
{
    public string DisplayName { get; set; }
    public Address Address { get; set; }
}