using BLL.Command;
using BLL.Query;
namespace BLL
{
    public partial class BizLogic
    {
        
        
        private TblFteDemandCommands _TblFteDemandCommands;
        public TblFteDemandCommands TblFteDemandCommands {
            get {
                if (_TblFteDemandCommands == null)
                    _TblFteDemandCommands = new TblFteDemandCommands (_unitOfWork);

                return _TblFteDemandCommands;
            }
        }
        
        private TblFteDemand_Query _TblFteDemandQuery;
        public TblFteDemand_Query TblFteDemand_Query {
            get {
                if (_TblFteDemandQuery == null)
                    _TblFteDemandQuery = new TblFteDemand_Query (_unitOfWork, _mapper);

                return _TblFteDemandQuery;
            }
        }

    }
}
