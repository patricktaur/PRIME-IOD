namespace DAL.DTOs
{
    public class FilterItem
    {
        public int Id { get; set; }
        public string Value { get; set; }

        public int? OrderNumber {get;set;}

        public string Description {get;set;}

        public int ParId {get;set;}
        
    }

    public class FilterItemText
    {
        public string Id { get; set; }
        public string Value { get; set; }
        
    }
}