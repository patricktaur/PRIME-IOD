//new
using System.Collections.Generic;
//Note :
//rename required: DAL.ViewModelForSearch rename to DAL.DTOs
//corresponding rename reqired in template Generator and Digital Dashboard
namespace DAL.DTOs
{
    public class PaginatedResult<T>
    {
         public int RecordCount {get;set;}
          public List<T> Records;
    }
}

