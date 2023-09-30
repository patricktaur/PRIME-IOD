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
        
        ItblLoginDetailsV2Repository _tblLoginDetailsV2;
        public ItblLoginDetailsV2Repository tblLoginDetailsV2_Repo  //pluralize if required
        {
            get
            {
                if (_tblLoginDetailsV2 == null)
                    _tblLoginDetailsV2 = new tblLoginDetailsV2Repository(_context);

                return _tblLoginDetailsV2;
            }
        }
    
    }
}
