using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Identity
{
    public static class ApplicationIdentityDbContextSeed
    {
        public static async Task SeedAsync(IServiceProvider serviceProvider)
        {
            using (var scope = serviceProvider.CreateScope())
            {
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
                var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationIdentityDbContext>();

                await SeedUserAsync(userManager, dbContext);
            }
        }

        private static async Task SeedUserAsync(UserManager<ApplicationUser> userManager, ApplicationIdentityDbContext dbContext)
        {
            if (!userManager.Users.Any())
            {
                var user = new ApplicationUser
                {
                    UserName = "rahul@sahay.com",
                    Email = "rahul@sahay.com",
                    DisplayName = "Rahul Sahay",
                    // Add other properties as needed
                    Address = new Address
                    {
                        Id = Guid.NewGuid().ToString(), 
                        Fname = "Rahul",
                        Lname = "Sahay",
                        Street = "123 Bariyatu",
                        City = "Ranchi",
                        State = "Jharkhand",
                        ZipCode = "123456"
                    }
                };

                var result = await userManager.CreateAsync(user, "Pa$$w0rd@1");

                if (result.Succeeded)
                {
                    // Optionally, you can do additional seeding or customization here
                    // For example, add user roles, claims, etc.
                }
                else
                {
                    throw new Exception($"User creation failed: {string.Join(", ", result.Errors)}");
                }
            }
        }
    }
}
