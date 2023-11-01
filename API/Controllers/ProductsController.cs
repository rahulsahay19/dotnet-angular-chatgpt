using API.DTOs;
using API.Helpers;
using API.Specifications;
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
        public async Task<ActionResult<Pagination<ProductDTO>>> GetProducts([FromQuery] ProductParams productParams, bool? allBrands)
        {
            // Extract the parameters from the productParams object
            var sort = productParams.Sort;
            var productTypeId = productParams.ProductTypeId;
            var productBrandId = productParams.ProductBrandId;
            var skip = productParams.Skip;
            var take = productParams.Take;
            var search = productParams.Search;
            
            // Check if the 'allBrands' parameter is set to true
            if (allBrands == true)
            {
                // Set productBrandId to null to indicate no brand filtering
                productBrandId = null;
            }

            // Create a specification for counting products
            var countSpec = new ProductCountSpecification(productBrandId, productTypeId, search);

            // Use the specification with the repository to get the total count of products
            var totalCount = await _productRepository.CountAsync(countSpec);

            // Create a specification for fetching paginated products
            var spec = new ProductWithTypesAndBrandSpecification(sort, productTypeId, productBrandId, skip, take, search);

            // Use the specification with the repository to get filtered and included results
            var products = await _productRepository.ListAsync(spec);

            var productDTOs = _mapper.Map<List<ProductDTO>>(products);

            // Create a Pagination object to return both product data and total count
            var pagination = new Pagination<ProductDTO>(skip, take, totalCount, productDTOs);

            return Ok(pagination);
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
