using API.DTOs;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IRepository<Product> _productRepository;
        private readonly IRepository<ProductType> _productTypeRepository;
        private readonly IMapper _mapper;
        private readonly IRepository<ProductBrand> _productBrandRepository;
        
        public ProductsController(
            IRepository<Product> productRepository,
            IRepository<ProductBrand> productBrandRepository,
            IRepository<ProductType> productTypeRepository,IMapper mapper)
        {
            _productRepository = productRepository;
            _productBrandRepository = productBrandRepository;
            _productTypeRepository = productTypeRepository;
            _mapper = mapper;
        }

        // GET: api/v1/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDTO>>> GetProducts()
        {
            // Create a specification
            var spec = new ProductWithTypesAndBrandSpecification();

            // Use the specification with the repository to get filtered and included results
            var products = await _productRepository.ListAsync(spec);
            var productDTOs = _mapper.Map<List<ProductDTO>>(products);

            return Ok(productDTOs);
        }

        // GET: api/v1/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            // Create a specification
            var spec = new ProductWithTypesAndBrandSpecification(id);

            // Use the specification with the repository to get filtered and included results
            var product = await _productRepository.GetByIdAsync(spec);
            return Ok(product);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IEnumerable<ProductBrand>>> GetProductBrands()
        {
            return Ok(await _productBrandRepository.GetProductBrandsAsync());
        }
        
        [HttpGet("types")]
        public async Task<ActionResult<IEnumerable<ProductType>>> GetProductTypes()
        {
            return Ok(await _productTypeRepository.GetProductTypesAsync());
        }
    }
}
