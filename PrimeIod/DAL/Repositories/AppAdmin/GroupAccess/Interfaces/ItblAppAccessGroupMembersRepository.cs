using DAL.Models;
using System;
using System.Linq.Expressions;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface ItblAppAccessGroupMembersRepository : IRepository<TblAppAccessGroupMembers>
    {
        List<TblAppAccessGroupMembers> GetPaginatedSearchResults(Expression<Func<TblAppAccessGroupMembers, bool>> predicate, int pageNumber, int pageSize);
        List<TblAppAccessGroupMembers> GetList(int studyId);

        List<T> GetList<T>(Expression<Func<TblAppAccessGroupMembers, bool>> predicate);
    }
}
