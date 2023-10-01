using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IGenericRepository<Product> _productRepository;
        private readonly IGenericRepository<ProductType> _productTypeRepository;
        private readonly IGenericRepository<ProductBrand> _productBrandRepository;
        
        public ProductsController(
            IGenericRepository<Product> productRepository,
            IGenericRepository<ProductBrand> productBrandRepository,
            IGenericRepository<ProductType> productTypeRepository)
        {
            _productRepository = productRepository;
            _productBrandRepository = productBrandRepository;
            _productTypeRepository = productTypeRepository;
        }

        // GET: api/v1/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await _productRepository.GetProductsAsync(p => p.ProductType, p => p.ProductBrand);
            return Ok(products);
        }

        // GET: api/v1/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _productRepository.GetProductByIdAsync(id, p => p.ProductType, p => p.ProductBrand);

            //var product = await _productRepository.GetProductByIdAsync(id);
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
