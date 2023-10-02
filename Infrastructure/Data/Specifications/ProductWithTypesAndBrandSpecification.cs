using Core.Entities;

namespace Infrastructure.Data.Specifications;

public class ProductWithTypesAndBrandSpecification : BaseSpecification<Product>
{
    public ProductWithTypesAndBrandSpecification()
    {
        AddInclude(p => p.ProductType);
        AddInclude(p => p.ProductBrand);
        ApplyCriteria(p => p.Price > 4200); // Example custom criteria.
    }

    public ProductWithTypesAndBrandSpecification(int id)
    {
        AddInclude(p => p.ProductType);
        AddInclude(p => p.ProductBrand);
    }
}

