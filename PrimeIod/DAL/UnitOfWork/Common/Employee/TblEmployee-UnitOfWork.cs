// =============================
// claritytechnologies
// =============================

using DAL.Repositories;
using DAL.Repositories.Interfaces;
//using DAL;

namespace DAL
{
    public partial class UnitOfWork : IUnitOfWork
    {
        
        ITblEmployeeRepository _TblEmployee;
        public ITblEmployeeRepository TblEmployee_Repo  //pluralize if required
        {
            get
            {
                if (_TblEmployee == null)
                    _TblEmployee = new TblEmployeeRepository(_context);

                return _TblEmployee;
            }
        }
    
    }
}
