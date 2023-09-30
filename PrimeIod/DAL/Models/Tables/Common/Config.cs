using DAL.Repositories.Interfaces;

namespace DAL.Models
{
    public class Config : IConfig
    {
        public string ItemMastersUploadFolder { get; set; }
        public string GroupsUploadFolder { get; set; }
        public string ImagesFolder { get; set; }
    }
}