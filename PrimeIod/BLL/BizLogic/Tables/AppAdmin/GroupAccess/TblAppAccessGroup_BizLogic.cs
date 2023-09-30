using BLL.Command;
using BLL.Query;
namespace BLL
{
    public partial class BizLogic
    {
        
        
        private TblAppAccessGroupCommands _TblAppAccessGroupCommands;
        public TblAppAccessGroupCommands TblAppAccessGroupCommands {
            get {
                if (_TblAppAccessGroupCommands == null)
                    _TblAppAccessGroupCommands = new TblAppAccessGroupCommands (_unitOfWork);

                return _TblAppAccessGroupCommands;
            }
        }
        
        private TblAppAccessGroup_Query _TblAppAccessGroupQuery;
        public TblAppAccessGroup_Query TblAppAccessGroup_Query {
            get {
                if (_TblAppAccessGroupQuery == null)
                    _TblAppAccessGroupQuery = new TblAppAccessGroup_Query (_unitOfWork, _mapper);

                return _TblAppAccessGroupQuery;
            }
        }

    }
}
