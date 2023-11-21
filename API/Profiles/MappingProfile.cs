using API.DTOs;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;

namespace API.Profiles;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Product, ProductDTO>()
            .ForMember(dest => dest.ProductBrand, opt => opt.MapFrom(src => src.ProductBrand.Name))
            .ForMember(dest => dest.ProductType, opt => opt.MapFrom(src => src.ProductType.Name));
        CreateMap<RegisterDto, ApplicationUser>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email)); 

        CreateMap<AddressDto, Address>();
    }
}