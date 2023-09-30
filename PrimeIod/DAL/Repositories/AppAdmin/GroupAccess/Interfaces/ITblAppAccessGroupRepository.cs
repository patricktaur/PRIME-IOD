using DAL.Models;
using System;
using System.Linq.Expressions;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface ITblAppAccessGroupRepository : IRepository<TblAppAccessGroup>
    {
        List<TblAppAccessGroup> GetPaginatedSearchResults(Expression<Func<TblAppAccessGroup, bool>> predicate, int pageNumber, int pageSize);
        List<TblAppAccessGroup> GetList();
    }
}
