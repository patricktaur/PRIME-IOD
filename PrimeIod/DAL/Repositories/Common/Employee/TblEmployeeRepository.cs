
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using DAL.Repositories.Interfaces;
using DAL.Models;
using DAL;

namespace DAL.Repositories
{
    public class TblEmployeeRepository : Repository<TblEmployee>, ITblEmployeeRepository
    {

        public TblEmployeeRepository(DbContext context) : base(context)
        { }

        public List<TblEmployee> GetPaginatedSearchResults(Expression<Func<TblEmployee, bool>> predicate, int pageNumber, int pageSize)
        {
            return _appContext.TblEmployee
            .Where(predicate)
            //.OrderBy(x => x.DeliverableDate)
            .Skip((pageNumber-1) * pageSize).Take(pageSize)
            .Select(x => new TblEmployee() //todo : Replace TblStudyTimelineInterimLocks with ViewModel
            {
                Id = x.Id
                // DeliverableDate = x.DeliverableDate
            })
            .ToList();
        }

        public List<TblEmployee> GetList(int studyId){
           return _appContext.TblEmployee
           
            // .Where(
            //     x => x.StudyId == studyId
            //     && !x.DeletedOn.HasValue
            // )
            .ToList();
        }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
