
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
    public class TblStudyRepository : Repository<TblStudy>, ITblStudyRepository
    {

        public TblStudyRepository(DbContext context) : base(context)
        { }

        public List<TblStudy> GetPaginatedSearchResults(Expression<Func<TblStudy, bool>> predicate, int pageNumber, int pageSize)
        {
            return _appContext.TblStudy
            .Where(predicate)
            //.OrderBy(x => x.DeliverableDate)
            .Skip((pageNumber-1) * pageSize).Take(pageSize)
            .Select(x => new TblStudy() //todo : Replace TblStudyTimelineInterimLocks with ViewModel
            {
                Id = x.Id
                // DeliverableDate = x.DeliverableDate
            })
            .ToList();
        }

        public List<TblStudy> GetList(int studyId){
           return _appContext.TblStudy
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
