using System.Collections.Generic;
namespace BLL.Helpers
{
    public class ActionResponse
    {
        public ActionResponse(){
            Records = new List<string>();
        }
        public bool HasError { get; set; } = false;
        public string Message { get; set; }
        public List<string> Records { get; set; }
    }
}