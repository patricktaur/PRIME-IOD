using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Globalization;

using System.IO;
using System.Linq;
using CsvHelper;
using DAL.DTOs;
namespace BLL.MenuAccess
{
    public class MenuItemCsvData
    {
        // private const string MenuConfigFilePath = @"C:\Development\p935-icon-prism-core\Prism\WebApi\AppSettings\MenuConfig.csv";
         private string _menuConfigFile; // = "AppSettings/MenuConfig.csv";
        // private List<MenuItem> _menuItems;
        public MenuItemCsvData(){
           
        }
        
        public MenuItemCsvData(string configFile){
            _menuConfigFile = configFile;
        }
        public List<MenuItem> GetMenuConfigData()
        {

            using (var reader = new StreamReader(_menuConfigFile))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                var records = csv.GetRecords<MenuCsvItem>().ToList();

                var menuItems = ConvertToMenuItems(records);

                return menuItems;    

                
            }
        }

        public List<MenuItem> ConvertToMenuItems(List<MenuCsvItem> csvItems)
        {
            var menuItems = new List<MenuItem>();

            // First pass: create MenuItem objects
            foreach (var csvItem in csvItems)
            {
                var menuItem = new MenuItem
                {
                    Id = int.Parse(csvItem.Id),
                    ParentId = csvItem.ParentId,
                    MenuId = csvItem.MenuId,
                    Title = csvItem.Title,
                    // Key = csvItem.Key,
                    Visible = csvItem.Visible == "Y",
                    Type = csvItem.Type == "c" ? MenuItemType.Component : MenuItemType.Menu,
                    Mode = GetAccessMode(csvItem) ,
                    AlternatePath = csvItem.AlternatePath,
                    AlternateText = csvItem.AlternateText,
                    ChildCollection = new List<MenuItem>()
                };

                

                menuItems.Add(menuItem);
            }

            // Second pass: link MenuItem objects
            foreach (var csvItem in csvItems)
            {
                if (!string.IsNullOrEmpty(csvItem.ParentId))
                {
                    //
                    if (csvItem.ParentId == csvItem.MenuId){
                        throw new ArgumentException($"Menu Id and Parent Id are identical: {csvItem.MenuId} - {csvItem.ParentId}");
                    }
                    var parentId = int.Parse(csvItem.ParentId);
                    var parentMenuItem = menuItems.Find(m => m.Id == parentId);
                    if (parentMenuItem ==  null){
                        throw new ArgumentException($"Parent Menu with Id {csvItem.ParentId} not found for Id :  {csvItem.Id}. ");
                    }else{
                        parentMenuItem.ChildCollection.Add(menuItems.Find(m => m.Id == int.Parse(csvItem.Id)));

                    }
                }
            }

            // Third pass: return only the root MenuItem objects
            return menuItems.Where(m => string.IsNullOrEmpty(csvItems.Find(c => c.Id == m.Id.ToString())?.ParentId)).ToList();
        }

    //   private AccessMode? GetAccessMode(string mode, string menuId){
    //      if (!string.IsNullOrWhiteSpace(mode))
    //         {
    //             return mode switch
    //             {
    //                 "V" => AccessMode.View,
    //                 "R" => AccessMode.EditIfUserIsInStudyResource,
    //                 "E" => AccessMode.Edit,
    //                 _ => throw new ArgumentException($"Invalid mode value: {mode} found at menuId: {menuId}")
    //             };
    //         }else{
    //             return null;
    //         }
    //   }

      private AccessMode? GetAccessMode(MenuCsvItem csvItem){
         if (csvItem.Type.ToLower() != "c"){
            return null;
         }
         if (csvItem.Mode.ToLower() == "e"){
            return AccessMode.Edit;
         }else{
            return AccessMode.View;
         }
         
      }
    
    }
}