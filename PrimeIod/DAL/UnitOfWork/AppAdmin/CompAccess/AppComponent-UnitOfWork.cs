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
        
        IAppComponentRepository _AppComponent;
        public IAppComponentRepository AppComponent_Repo  //pluralize if required
        {
            get
            {
                if (_AppComponent == null)
                    _AppComponent = new AppComponentRepository(_context, _mapper);

                return _AppComponent;
            }
        }
    
    }
}
