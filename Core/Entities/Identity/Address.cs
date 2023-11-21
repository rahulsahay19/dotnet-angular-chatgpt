using System.ComponentModel.DataAnnotations;

namespace Core.Entities.Identity;

public class Address
{
    public string Id { get; set; }
    public string Fname { get; set; }
    public string Lname { get; set; }
    public string Street { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string ZipCode { get; set; }
    [Required]
    public string ApplicationUserId { get; set; }
    public ApplicationUser User { get; set; }
    
}