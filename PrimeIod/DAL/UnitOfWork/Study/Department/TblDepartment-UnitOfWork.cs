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
        
        ITblDepartmentRepository _TblDepartment;
        public ITblDepartmentRepository TblDepartment_Repo  //pluralize if required
        {
            get
            {
                if (_TblDepartment == null)
                    _TblDepartment = new TblDepartmentRepository(_context);

                return _TblDepartment;
            }
        }
    
    }
}
