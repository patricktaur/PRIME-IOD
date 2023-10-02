using BLL.Command;
using BLL.Query;
namespace BLL
{
    public partial class BizLogic
    {
        
        
        private TblDepartmentCommands _TblDepartmentCommands;
        public TblDepartmentCommands TblDepartmentCommands {
            get {
                if (_TblDepartmentCommands == null)
                    _TblDepartmentCommands = new TblDepartmentCommands (_unitOfWork);

                return _TblDepartmentCommands;
            }
        }
        
        private TblDepartment_Query _TblDepartmentQuery;
        public TblDepartment_Query TblDepartment_Query {
            get {
                if (_TblDepartmentQuery == null)
                    _TblDepartmentQuery = new TblDepartment_Query (_unitOfWork, _mapper);

                return _TblDepartmentQuery;
            }
        }

    }
}
