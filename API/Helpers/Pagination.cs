namespace API.Helpers
{
    public class Pagination<T> where T : class
    {
        public Pagination(int pageIndex, int pageSize, int totalItems, IReadOnlyList<T> data)
        {
            PageIndex = pageIndex;
            PageSize = pageSize;
            TotalItems = totalItems;
            Data = data;
        }

        public int PageIndex { get; }
        public int PageSize { get; }
        public int TotalItems { get; }
        public IReadOnlyList<T> Data { get; }
    }
}