using Core.Entities;
using Infrastructure.Data.Specifications;

namespace API.Specifications
{
    public class ProductCountSpecification : BaseSpecification<Product>
    {
        public ProductCountSpecification(int? productBrandId, int? productTypeId, string search)
        {
            // Apply filtering based on product type and product brand
            if (productTypeId.HasValue)
            {
                ApplyCriteria(p => p.ProductTypeId == productTypeId.Value);
            }

            if (productBrandId.HasValue)
            {
                ApplyCriteria(p => p.ProductBrandId == productBrandId.Value);
            }

            // Apply search criteria
            if (!string.IsNullOrEmpty(search))
            {
                ApplyCriteria(p => p.Name.ToLower().Contains(search.ToLower()));
            }
        }
    }
}