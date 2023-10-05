
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

        

        public List<TblEmployee> GetList(){
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
