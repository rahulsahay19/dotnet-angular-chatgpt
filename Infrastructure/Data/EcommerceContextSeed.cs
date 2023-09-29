using System.Text.Json;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
    public class EcommerceContextSeed
    {
        private ILogger<EcommerceContextSeed> _logger;

        public EcommerceContextSeed(ILogger<EcommerceContextSeed> logger)
        {
            _logger = logger;
        }
        public async Task SeedDataAsync(EcommerceContext context)
        {
            using var transaction = context.Database.BeginTransaction();
            try
            {
                if (!await context.ProductBrands.AnyAsync() &&
                    !await context.ProductTypes.AnyAsync() &&
                    !await context.Products.AnyAsync())
                {
                    await SeedBrandsAsync(context);
                    await SeedTypesAsync(context);
                    await SeedProductsAsync(context);
                    // If all seeding steps are successful, commit the transaction
                    transaction.Commit();
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                _logger.LogError(ex, "An error occurred while seeding the database.");
                throw;
            }
        }

        private async Task SeedBrandsAsync(EcommerceContext context)
        {
            try
            {
                var brandsJson = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/brands.json");
                var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsJson);

                await context.ProductBrands.AddRangeAsync(brands);
                await context.SaveChangesAsync();
                _logger.LogInformation("Seeded Brands data.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error seeding Brands data.");
            }
        }

        private async Task SeedTypesAsync(EcommerceContext context)
        {
            try
            {
                var typesJson = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/types.json");
                var types = JsonSerializer.Deserialize<List<ProductType>>(typesJson);

                await context.ProductTypes.AddRangeAsync(types);
                await context.SaveChangesAsync();
                _logger.LogInformation("Seeded Types data.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error seeding Types data.");
            }
        }

        private async Task SeedProductsAsync(EcommerceContext context)
        {
            try
            {
                var productsJson = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/products.json");
                var products = JsonSerializer.Deserialize<List<Product>>(productsJson);

                await context.Products.AddRangeAsync(products);
                await context.SaveChangesAsync();
                _logger.LogInformation("Seeded Products data.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error seeding Products data.");
            }
        }
    }
}
