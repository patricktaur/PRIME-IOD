using System.Collections.Generic;
namespace Helpers.UIGrid
{
    public class UIGridProperties
    {
        public UIGridProperties(){
            Columns = new List<UIGridColumn>(); 
        }
        public string Title { get; set; }
        public int FilterGroup { get; set; }
        
        public string SortedByFields { get; set; }
        
        
        public List<UIGridColumn> Columns { get; set; }
    }

    public class UIGridColumn{
        public string type { get; set; } //??
        public string field { get; set; }
        public string view { get; set; }  //??
        public string header { get; set; }

        public bool hide { get; set; } 
        public string hideGroup { get; set; } 

        public bool columFixed { get; set; }  //Column Manager cannot hide

        public string format { get; set; }  //Angular pipe: date:'MM/dd/yy'  number:'3.1-5', 

        public int width { get; set; } 

        public string align { get; set; }  //left, center, right 

    }
}

