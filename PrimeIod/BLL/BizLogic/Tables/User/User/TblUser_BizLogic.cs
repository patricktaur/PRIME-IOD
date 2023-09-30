using BLL.Command;
using BLL.Query;
namespace BLL
{
    public partial class BizLogic
    {
        
        
        private TblUserCommands _TblUserCommands;
        public TblUserCommands TblUserCommands {
            get {
                if (_TblUserCommands == null)
                    _TblUserCommands = new TblUserCommands (_unitOfWork);

                return _TblUserCommands;
            }
        }
        
        private TblUser_Query _TblUserQuery;
        public TblUser_Query TblUser_Query {
            get {
                if (_TblUserQuery == null)
                    _TblUserQuery = new TblUser_Query (_unitOfWork, _mapper);

                return _TblUserQuery;
            }
        }

    }
}
