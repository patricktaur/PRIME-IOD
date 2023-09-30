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
        
        ITblAppAccessGroupRepository _TblAppAccessGroup;
        public ITblAppAccessGroupRepository TblAppAccessGroup_Repo  //pluralize if required
        {
            get
            {
                if (_TblAppAccessGroup == null)
                    _TblAppAccessGroup = new TblAppAccessGroupRepository(_context);

                return _TblAppAccessGroup;
            }
        }
    
    }
}
