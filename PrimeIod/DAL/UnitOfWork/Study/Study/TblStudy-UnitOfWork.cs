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
        
        ITblStudyRepository _TblStudy;
        public ITblStudyRepository TblStudy_Repo  //pluralize if required
        {
            get
            {
                if (_TblStudy == null)
                    _TblStudy = new TblStudyRepository(_context);

                return _TblStudy;
            }
        }
    
    }
}
