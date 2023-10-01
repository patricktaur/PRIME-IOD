using DAL.Models;
using System;
using System.Linq.Expressions;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface ITblFteDemandRepository : IRepository<TblFteDemand>
    {
        List<TblFteDemand> GetList();
        // List<TblFteDemand> GetPaginatedSearchResults(Expression<Func<TblFteDemand, bool>> predicate, int pageNumber, int pageSize);
        // List<TblFteDemand> GetList(int studyId);
    }
}
