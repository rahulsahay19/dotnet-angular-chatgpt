using Core.Entities;
using Infrastructure.Data.Specifications;

namespace API.Specifications
{
    public class ProductCountSpecification : BaseSpecification<Product>
    {
        public ProductCountSpecification(int? productBrandId, int? productTypeId, string search)
            : base(
                x =>
                    (string.IsNullOrEmpty(search) || x.Name.ToLower().Contains(search)) &&
                    (!productBrandId.HasValue || x.ProductBrandId == productBrandId.Value) &&
                    (!productTypeId.HasValue || x.ProductTypeId == productTypeId.Value)
            )
        {
        }
    }
}