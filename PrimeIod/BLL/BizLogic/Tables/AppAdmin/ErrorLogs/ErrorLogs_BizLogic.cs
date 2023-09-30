using BLL.Command;
using BLL.Query;
namespace BLL
{
    public partial class BizLogic
    {  
        private ErrorLogs_Query _errorLogsQuery;
        public ErrorLogs_Query errorLogs_Query {
            get {
                if (_errorLogsQuery == null)
                    _errorLogsQuery = new ErrorLogs_Query ();

                return _errorLogsQuery;
            }
        }
    }
}
