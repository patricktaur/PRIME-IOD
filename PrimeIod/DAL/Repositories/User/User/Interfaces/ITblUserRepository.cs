using DAL.Models;
using System;
using System.Linq.Expressions;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface ITblUserRepository : IRepository<TblUser>
    {
        List<T> GetList<T>(Expression<Func<TblUser, bool>> predicate);
        public T GetRecordDto<T>(Expression<Func<TblUser, bool>> predicate);
        public T GetRecordDto<T>(int id);
    }
}
