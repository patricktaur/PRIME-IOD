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
        
        ItblAppAccessGroupMembersRepository _tblAppAccessGroupMembers;
        public ItblAppAccessGroupMembersRepository tblAppAccessGroupMembers_Repo  //pluralize if required
        {
            get
            {
                if (_tblAppAccessGroupMembers == null)
                    _tblAppAccessGroupMembers = new tblAppAccessGroupMembersRepository(_context, _mapper);

                return _tblAppAccessGroupMembers;
            }
        }
    
    }
}
