using BLL.Command;
using BLL.Query;
namespace BLL
{
    public partial class BizLogic
    {
        
        
        private tblAppAccessGroupMembersCommands _tblAppAccessGroupMembersCommands;
        public tblAppAccessGroupMembersCommands tblAppAccessGroupMembersCommands {
            get {
                if (_tblAppAccessGroupMembersCommands == null)
                    _tblAppAccessGroupMembersCommands = new tblAppAccessGroupMembersCommands (_unitOfWork);

                return _tblAppAccessGroupMembersCommands;
            }
        }
        
        private tblAppAccessGroupMembers_Query _tblAppAccessGroupMembersQuery;
        public tblAppAccessGroupMembers_Query tblAppAccessGroupMembers_Query {
            get {
                if (_tblAppAccessGroupMembersQuery == null)
                    _tblAppAccessGroupMembersQuery = new tblAppAccessGroupMembers_Query (_unitOfWork, _mapper);

                return _tblAppAccessGroupMembersQuery;
            }
        }

    }
}
