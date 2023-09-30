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
        
        ITblFteDemandRepository _TblFteDemand;
        public ITblFteDemandRepository TblFteDemand_Repo  //pluralize if required
        {
            get
            {
                if (_TblFteDemand == null)
                    _TblFteDemand = new TblFteDemandRepository(_context);

                return _TblFteDemand;
            }
        }
    
    }
}
