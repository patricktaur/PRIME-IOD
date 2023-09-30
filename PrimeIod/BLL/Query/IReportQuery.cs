using System.Collections.Generic;
using Helpers.UIGrid;
namespace BLL.Query
{
    public interface IReportQuery<T>
    {
        List<T> ReportList();
        byte[] GenerateCSVOutput();
        UIGridProperties GetColumnProperties();
    }
}