using BLL.Command;
using BLL.Query;
namespace BLL
{
    public partial class BizLogic
    {
        
        
        private TblEmployeeCommands _TblEmployeeCommands;
        public TblEmployeeCommands TblEmployeeCommands {
            get {
                if (_TblEmployeeCommands == null)
                    _TblEmployeeCommands = new TblEmployeeCommands (_unitOfWork);

                return _TblEmployeeCommands;
            }
        }
        
        private TblEmployee_Query _TblEmployeeQuery;
        public TblEmployee_Query TblEmployee_Query {
            get {
                if (_TblEmployeeQuery == null)
                    _TblEmployeeQuery = new TblEmployee_Query (_unitOfWork, _mapper);

                return _TblEmployeeQuery;
            }
        }

    }
}
