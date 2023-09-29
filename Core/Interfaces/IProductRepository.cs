using Core.Entities;

namespace Core.Interfaces;

public interface IProductRepository
{
    Task<Product> GetProductByIdAsync(int id);
    Task<IList<Product>> GetProductsAsync();
    Task<IList<ProductBrand>> GetProductBrandsAsync();
    Task<IList<ProductType>> GetProductTypesAsync();
}