
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
    public class TblDepartmentRepository : Repository<TblDepartment>, ITblDepartmentRepository
    {

        public TblDepartmentRepository(DbContext context) : base(context)
        { }

        public List<TblDepartment> GetPaginatedSearchResults(Expression<Func<TblDepartment, bool>> predicate, int pageNumber, int pageSize)
        {
            return _appContext.TblDepartment
            .Where(predicate)
            //.OrderBy(x => x.DeliverableDate)
            .Skip((pageNumber-1) * pageSize).Take(pageSize)
            .Select(x => new TblDepartment() //todo : Replace TblStudyTimelineInterimLocks with ViewModel
            {
                Id = x.Id
                // DeliverableDate = x.DeliverableDate
            })
            .ToList();
        }

        public List<TblDepartment> GetList(int studyId){
           return _appContext.TblDepartment
           //.Include(x => x.DeliverableTypeP)
            //.Include(x => x.OutcomeP)
            // .Where(
            //     x => x.StudyId == studyId
            //     && !x.DeletedOn.HasValue
            // )
            .ToList();
        }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
