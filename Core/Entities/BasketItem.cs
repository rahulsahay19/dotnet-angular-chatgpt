namespace Core.Entities;

public class BasketItem
{
    public int Id { get; set; }
    public string ProductName { get; set; }
    public double Price { get; set; }
    public int Quantity { get; set; }
    public string PictureUrl { get; set; }
    public string ProductBrand { get; set; }
    public string ProductType { get; set; }
}