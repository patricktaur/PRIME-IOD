using DAL.Models;
using System;
using System.Linq.Expressions;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface ITblStudyRepository : IRepository<TblStudy>
    {
        List<TblStudy> GetList();
    }
}
