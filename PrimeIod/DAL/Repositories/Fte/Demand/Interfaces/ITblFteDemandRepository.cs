using DAL.Models;
using System;
using System.Linq.Expressions;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface ITblFteDemandRepository : IRepository<TblFteDemand>
    {
        List<TblFteDemand> GetList();
        

        List<T> GetList<T>(Expression<Func<TblFteDemand, bool>> predicate);
        List<T> GetList<T>(int studyId);
        public T GetRecordDto<T>(int id);
        
    }
}
