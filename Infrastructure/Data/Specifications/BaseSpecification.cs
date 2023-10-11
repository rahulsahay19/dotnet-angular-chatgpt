using System.Linq.Expressions;
using Core.Enums;
using Core.Specifications;

namespace Infrastructure.Data.Specifications
{
    public abstract class BaseSpecification<T> : ISpecification<T>
    {
        public Expression<Func<T, bool>> Criteria { get; private set; } = _ => true; // Default criteria to select all.
        public List<Expression<Func<T, object>>> Includes { get; } = new List<Expression<Func<T, object>>>();
        public Expression<Func<T, object>> OrderBy { get; private set; } = null;
        public OrderBy OrderByDirection { get; private set; } = Core.Enums.OrderBy.Ascending; // Default to ascending order.
        public int Take { get; private set; } = -1; // No paging by default.
        public int Skip { get; private set; } = 0; // Start from the first record by default.
        public bool IsPagingEnabled { get; private set; } = false;

        protected void AddInclude(Expression<Func<T, object>> includeExpression)
        {
            Includes.Add(includeExpression);
        }

        protected void ApplyCriteria(Expression<Func<T, bool>> criteria)
        {
            Criteria = criteria;
        }

        protected void ApplyOrderBy(Expression<Func<T, object>> orderBy, OrderBy direction)
        {
            OrderBy = orderBy;
            OrderByDirection = direction;
        }

        protected void ApplyPaging(int skip, int take)
        {
            Skip = skip;
            Take = take;
            IsPagingEnabled = true;
        }
    }
}