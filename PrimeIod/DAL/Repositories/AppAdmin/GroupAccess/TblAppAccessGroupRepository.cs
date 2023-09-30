
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
    public class TblAppAccessGroupRepository : Repository<TblAppAccessGroup>, ITblAppAccessGroupRepository
    {

        public TblAppAccessGroupRepository(DbContext context) : base(context)
        { }

        public List<TblAppAccessGroup> GetPaginatedSearchResults(Expression<Func<TblAppAccessGroup, bool>> predicate, int pageNumber, int pageSize)
        {
            return _appContext.TblAppAccessGroup
            .Where(predicate)
            //.OrderBy(x => x.DeliverableDate)
            .Skip((pageNumber-1) * pageSize).Take(pageSize)
            .Select(x => new TblAppAccessGroup() //todo : Replace TblStudyTimelineInterimLocks with ViewModel
            {
                RecId = x.RecId
                // DeliverableDate = x.DeliverableDate
            })
            .ToList();
        }
        public List<TblAppAccessGroup> GetList(){
           return _appContext.TblAppAccessGroup
           //.Include(x => x.DeliverableTypeP)
            //.Include(x => x.OutcomeP)
            .Where(
                x =>  !x.DeletedOn.HasValue
            ).ToList();
        }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
