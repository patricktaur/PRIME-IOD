using DAL.Models;
using System;
using System.Linq.Expressions;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface ITblDepartmentRepository : IRepository<TblDepartment>
    {
        List<TblDepartment> GetPaginatedSearchResults(Expression<Func<TblDepartment, bool>> predicate, int pageNumber, int pageSize);
        List<TblDepartment> GetList(int studyId);
    }
}
