using System.Linq.Expressions;
using Core.Entities;

namespace Core.Interfaces;

public interface IGenericRepository<T> where T: BaseEntity
{
    Task<T> GetProductByIdAsync(int id, params Expression<Func<T, object>>[] includes);
    Task<IList<T>> GetProductsAsync(params Expression<Func<T, object>>[] includes);
    Task<IList<T>> GetProductBrandsAsync();
    Task<IList<T>> GetProductTypesAsync();
}