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
        
        ITblUserRepository _TblUser;
        public ITblUserRepository TblUser_Repo  //pluralize if required
        {
            get
            {
                if (_TblUser == null)
                    _TblUser = new TblUserRepository(_context, _mapper);

                return _TblUser;
            }
        }
    
    }
}
