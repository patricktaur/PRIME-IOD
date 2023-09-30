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
    public class tblLoginDetailsV2Repository : Repository<tblLoginDetailsV2>, ItblLoginDetailsV2Repository
    {

        public tblLoginDetailsV2Repository(DbContext context) : base(context)
        { }

        public List<tblLoginDetailsV2> GetPaginatedSearchResults(Expression<Func<tblLoginDetailsV2, bool>> predicate, int pageNumber, int pageSize)
        {
            return _appContext.tblLoginDetailsV2
            .Where(predicate)
            .OrderByDescending(x => x.CreatedOn)
            //.OrderBy(x => x.DeliverableDate)
            .Skip((pageNumber-1) * pageSize).Take(pageSize)
            .ToList();
        }

        public List<tblLoginDetailsV2> GetList(){
           return _appContext.tblLoginDetailsV2
           //.Include(x => x.DeliverableTypeP)
            //.Include(x => x.OutcomeP)
            .OrderBy(x => x.CreatedOn)
            .ToList();
        }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
