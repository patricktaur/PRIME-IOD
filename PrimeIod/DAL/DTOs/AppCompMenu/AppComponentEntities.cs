using System;
using System.Collections.Generic;
using Computations.Enumerators;
namespace DAL.DTOs
{

    public class MenuCsvItem
    {
        public string Id { get; set; }
        public string ParentId { get; set; }
        public string MenuId { get; set; }
        public string Title { get; set; }
        // public string Key { get; set; }
        public string Visible { get; set; }
        public string Type { get; set; }

        public string Mode { get; set; }

        public string AlternatePath { get; set; } 
        public string AlternateText { get; set; }
      
    }
    
    public class MenuItem
    {
        // Id	ParentId	MenuId	Title	Visible	Type	Mode	Alternate Path

        //Data populated from  menuconfig.csv file: Id ...AlternatePath
        public int Id { get; set; }
        public string ParentId { get; set; }

        public string MenuId { get; set; }
        public string Title { get; set; }
        
        public bool Visible { get; set; }

        public MenuItemType Type { get; set; }

        public AccessMode? Mode { get; set; }

        public string AlternatePath { get; set; }
        public string AlternateText { get; set; }

        //updated by applicaitn:

        public string Key { get; set; }

        public MenuStatus? Status { get; set; }
        public string ComponentCode { get; set; }

        public List<MenuItem> ChildCollection { get; set; }

        
    }

    public partial class AppComponent
    {
        
        public AppComponent()
        {
            AppComponentRoles = new HashSet<AppComponentRoles>();
        }
        
        public string Title { get; set; }
        public string Description { get; set; }
        public string CompCode { get; set; }

        public MenuStatus? Status { get; set; }

        public string RedirectTo { get; set; } //route to redirect when comp does not have permission


        public virtual ICollection<AppComponentRoles> AppComponentRoles { get; set; }
  
    }

    public partial class AppComponentRoles
    {
        public int RoleId { get; set; }
        public AccessMode Mode { get; set; }
    }

    public partial class ComponentPermission
    {
        public string CompCode { get; set; }
        public string ComponentPath { get; set; }
        public string Path { get; set; } //for iterating through siblings
        //AlternatePath: for use when Mode = EditIfUserIsInStudyResource
        //and the currentStudyId is not found in StudiesPermitted -s collection.
        //then Guard must redirect to AlternatePath
        //Get AlternatePath from MenuConfig.csv
        public string AlternatePath { get; set; }  
        public MenuStatus? Status { get; set; }
        public string Title { get; set; }
        public AccessMode Mode { get; set; }
        public string ModeName { get{
            return Mode.ToString();
        }}
        // public List<StudyIconNumberVM> StudiesPermitted { get; set; }
    }

    public partial class MenuPermission
    {
        public string MenuPath { get; set; }
        public MenuStatus? Status { get; set; }
        public string Title { get; set; }
        public AccessMode Mode { get; set; }

        public string ComponentCode { get; set; }
        public string AlternatePath { get; set; }
        public string AlternateText { get; set; }
    }

    

    public class AppCompAndMenuPermissions{
        public List<ComponentPermission> AppCompPermissions { get; set; }
        public List<MenuPermission> AppMenuPermissions { get; set; }
    }



    public enum MenuItemType{
        Menu,
        Component

    }

    public enum MenuStatus{
        NotReady,
        ReadyForUAT,
        UATPassed,
        ProductionPassed,
        // UnderMaintenance

    }

    public enum AccessMode
    {
        None = 0,
        View = 1,
        EditIfUserIsInStudyResource = 2,
        Edit = 3
        
    }
    

    

    

    
}


