using DAL.Models;
using System;
using System.Linq.Expressions;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface ITblStudyRepository : IRepository<TblStudy>
    {
        List<TblStudy> GetPaginatedSearchResults(Expression<Func<TblStudy, bool>> predicate, int pageNumber, int pageSize);
        List<TblStudy> GetList(int studyId);
    }
}
