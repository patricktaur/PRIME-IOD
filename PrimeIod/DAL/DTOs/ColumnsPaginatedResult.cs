//new
using System.Data;
using System.Collections.Generic;
using Helpers.UIGrid;
//Note :
//rename required: DAL.ViewModelForSearch rename to DAL.DTOs
//corresponding rename reqired in template Generator and Digital Dashboard
namespace DAL.DTOs
{
    public class ColumnsPaginatedResult
    {
         public int RecordCount {get;set;}
          public DataTable Records  {get;set;}
          public List<UIGridColumn> Columns {get;set;}
    }
}

