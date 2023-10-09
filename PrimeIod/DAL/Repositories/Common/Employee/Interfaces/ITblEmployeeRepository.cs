using DAL.Models;
using System;
using System.Linq.Expressions;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface ITblEmployeeRepository : IRepository<TblEmployee>
    {
        List<TblEmployee> GetList();
    }
}
