using System.Linq.Expressions;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Exceptions;

namespace Infrastructure.Data.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly EcommerceContext _context;

        public GenericRepository(EcommerceContext context)
        {
            _context = context;
        }

        public async Task<T> GetProductByIdAsync(int id, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _context.Set<T>();

            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            var entity = await query.FirstOrDefaultAsync(e => e.Id == id);

            if (entity == null)
            {
                throw new NotFoundException($"{typeof(T).Name} not found");
            }

            return entity;
        }

        public async Task<IList<T>> GetProductsAsync(params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _context.Set<T>();

            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return await query.ToListAsync();
        }

        public async Task<IList<T>> GetProductBrandsAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<IList<T>> GetProductTypesAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }
    }
}