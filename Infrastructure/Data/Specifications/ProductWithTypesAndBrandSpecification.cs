using System;
using System.Linq.Expressions;
using Core.Entities;
using Infrastructure.Data.Specifications;

public class ProductWithTypesAndBrandSpecification : BaseSpecification<Product>
{
    public ProductWithTypesAndBrandSpecification(string sort, int? productTypeId, int? productBrandId, int skip, int take, string search)
    {
        AddInclude(p => p.ProductType);
        AddInclude(p => p.ProductBrand);
        // Default sorting by name in ascending order
        ApplyOrderBy(p => p.Name, Core.Enums.OrderBy.Ascending);

        // Parse and apply sorting based on the 'sort' parameter
        if (!string.IsNullOrEmpty(sort))
        {
            switch (sort.ToLower())
            {
                case "priceasc":
                    ApplyOrderBy(p => p.Price, Core.Enums.OrderBy.Ascending);
                    break;
                case "pricedesc":
                    ApplyOrderBy(p => p.Price, Core.Enums.OrderBy.Descending);
                    break;
                case "namedesc":
                    ApplyOrderBy(p => p.Name, Core.Enums.OrderBy.Descending);
                    break;
                // Add more sorting options as needed
                default:
                    ApplyOrderBy(p => p.Name, Core.Enums.OrderBy.Ascending);
                    break;
            }
        }

        // Apply filtering based on product type and product brand
        if (productTypeId.HasValue)
        {
            ApplyCriteria(p => p.ProductTypeId == productTypeId.Value);
        }

        if (productBrandId.HasValue)
        {
            ApplyCriteria(p => p.ProductBrandId == productBrandId.Value);
        }
        //Apply Paging
        if (skip >= 0 && take > 0)
        {
            ApplyPaging(skip, take);
        }
        // Apply search criteria
        if (!string.IsNullOrEmpty(search))
        {
            ApplyCriteria(p => p.Name.ToLower().Contains(search.ToLower()));
        }
    }

    public ProductWithTypesAndBrandSpecification(int id)
    {
        AddInclude(p => p.ProductType);
        AddInclude(p => p.ProductBrand);
    }
}