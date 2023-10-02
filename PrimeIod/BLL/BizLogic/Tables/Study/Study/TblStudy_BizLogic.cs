using BLL.Command;
using BLL.Query;
namespace BLL
{
    public partial class BizLogic
    {
        
        
        private TblStudyCommands _TblStudyCommands;
        public TblStudyCommands TblStudyCommands {
            get {
                if (_TblStudyCommands == null)
                    _TblStudyCommands = new TblStudyCommands (_unitOfWork);

                return _TblStudyCommands;
            }
        }
        
        private TblStudy_Query _TblStudyQuery;
        public TblStudy_Query TblStudy_Query {
            get {
                if (_TblStudyQuery == null)
                    _TblStudyQuery = new TblStudy_Query (_unitOfWork, _mapper);

                return _TblStudyQuery;
            }
        }

    }
}
