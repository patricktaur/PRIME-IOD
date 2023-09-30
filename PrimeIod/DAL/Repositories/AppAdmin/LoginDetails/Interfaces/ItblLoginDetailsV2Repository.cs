using DAL.Models;
using System;
using System.Linq.Expressions;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface ItblLoginDetailsV2Repository : IRepository<tblLoginDetailsV2>
    {
        List<tblLoginDetailsV2> GetPaginatedSearchResults(Expression<Func<tblLoginDetailsV2, bool>> predicate, int pageNumber, int pageSize);
        List<tblLoginDetailsV2> GetList();
    }
}
