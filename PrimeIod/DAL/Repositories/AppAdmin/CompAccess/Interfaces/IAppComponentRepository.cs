using DAL.Models;
using System;
using System.Linq.Expressions;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IAppComponentRepository : IRepository<AppComponent>
    {
        List<AppComponent> GetPaginatedSearchResults(Expression<Func<AppComponent, bool>> predicate, int pageNumber, int pageSize);
        List<AppComponent> GetList(int studyId);

        List<T> GetList<T>(Expression<Func<AppComponentRoles, bool>> predicate);
    }
}
