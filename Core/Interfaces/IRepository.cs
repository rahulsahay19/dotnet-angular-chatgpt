using Core.Entities;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface IRepository<T> where T : BaseEntity
    {
        Task<T> GetByIdAsync(ISpecification<T> spec);
        Task<IList<T>> ListAsync(ISpecification<T> spec);
        Task<IList<T>> GetProductBrandsAsync();
        Task<IList<T>> GetProductTypesAsync();
        Task<int> CountAsync(ISpecification<T> spec);
    }
}