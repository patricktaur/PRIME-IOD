
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
    public class TblFteDemandRepository : Repository<TblFteDemand>, ITblFteDemandRepository
    {

        public TblFteDemandRepository(DbContext context) : base(context)
        { }

        

        public List<TblFteDemand> GetList(int studyId){
           return _appContext.TblFteDemand
           //.Include(x => x.DeliverableTypeP)
            //.Include(x => x.OutcomeP)
            // .Where(
            //     // x => x.StudyId == studyId
            //     // && !x.DeletedOn.HasValue
            // )
            .ToList();
        }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
