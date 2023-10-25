using Core.Entities;
using Core.Enums;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repositories
{
    public class Repository<T> : IRepository<T> where T : BaseEntity
    {
        private readonly EcommerceContext _context;

        public Repository(EcommerceContext context)
        {
            _context = context;
        }

        public async Task<T> GetByIdAsync(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).FirstOrDefaultAsync();
        }

        public async Task<IList<T>> ListAsync(ISpecification<T> spec)
        {
            var query = ApplySpecification(spec);
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

        public async Task<int> CountAsync(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).CountAsync();
        }

        private IQueryable<T> ApplySpecification(ISpecification<T> spec)
        {
            var query = _context.Set<T>().AsQueryable();

            if (spec.Criteria != null)
            {
                query = query.Where(spec.Criteria);
            }

            foreach (var include in spec.Includes)
            {
                query = query.Include(include);
            }
            
            if (spec.IsPagingEnabled)
            {
                query = query.Skip(spec.Skip).Take(spec.Take);
            }
            
            if (spec.OrderBy != null)
            {
                if (spec.OrderByDirection == OrderBy.Ascending)
                {
                    query = query.OrderBy(spec.OrderBy);
                }
                else if (spec.OrderByDirection == OrderBy.Descending)
                {
                    query = query.OrderByDescending(spec.OrderBy);
                }
            }

            return query;
        }
    }
}