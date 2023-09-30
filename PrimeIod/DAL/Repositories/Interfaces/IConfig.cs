namespace DAL.Repositories.Interfaces
{
    public interface IConfig
    {
         string ItemMastersUploadFolder { get; set; }
         string GroupsUploadFolder { get; set; }
         string ImagesFolder { get; set; }
    }
}