//new
using System.Data;
using Helpers.UIGrid;
//Note :
//rename required: DAL.ViewModelForSearch rename to DAL.DTOs
//corresponding rename reqired in template Generator and Digital Dashboard
namespace DAL.DTOs
{
    public class PaginatedResultWithDataTable
    {
         public int RecordCount {get;set;}
          public DataTable Records;

          public UIGridProperties Headers;
    }
}

