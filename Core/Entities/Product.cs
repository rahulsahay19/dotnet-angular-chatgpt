namespace Core.Entities;

public class Product : BaseEntity
{
    public string Name { get; set; }
    public string Description { get; set; }
    public double Price { get; set; }
    public string PictureUrl { get; set; }
    public int ProductTypeId { get; set; } // Foreign key for ProductType
    public int ProductBrandId { get; set; } // Foreign key for ProductBrand
    // Navigation properties
    public ProductType ProductType { get; set; }
    public ProductBrand ProductBrand { get; set; }
}