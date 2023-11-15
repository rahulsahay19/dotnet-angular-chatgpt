namespace Core.Entities;

public class Basket
{
    public Basket()
    {
        
    }

    public Basket(string id)
    {
        Id = id;
    }
    public string Id { get; set; }
    public List<BasketItem> Items { get; set; } = new List<BasketItem>();

    // Custom methods can be added here for basket operations
}
