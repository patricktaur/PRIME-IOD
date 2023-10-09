
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

        

        public List<TblStudy> GetList(){
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
