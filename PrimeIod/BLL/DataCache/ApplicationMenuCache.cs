
using System;
using System.Collections.Generic;
using System.Linq;
using System.Globalization;
using Microsoft.Extensions.Caching.Memory;
using System.IO;
using CsvHelper;
using BLL.MenuAccess;
using DAL.DTOs;
namespace BLL.CachedData
{
    public class ApplicationMenuCache
    {
        private const string _key = "app-menu";
        private const string MenuConfigFilePath = "AppSettings/Menu/MenuConfig.csv";
        private readonly IMemoryCache _memoryCache;
        // private readonly BizLogic _bizLogic;
        private readonly MenuItemCsvData _menuItemCsvData;
        
        public ApplicationMenuCache(
            //  BizLogic bizLogic,
            IMemoryCache memoryCache,
            MenuItemCsvData menuItemCsvData
        ){
            //  _bizLogic = bizLogic;
            _memoryCache = memoryCache;
            _menuItemCsvData = menuItemCsvData;
        }

        public List<MenuItem> MenuConfigDataCached{
            get{
                List<MenuItem> menuItems;
                if (_memoryCache.TryGetValue(_key, out List<MenuItem> menuItemsCached))
                {
                    // prevent accidental chanes to the original list.
                    menuItems = CloneMenuItems(menuItemsCached);
                }else{
                    var orginalList = _menuItemCsvData.GetMenuConfigData(); //GetMenuConfigData();
                    _memoryCache.Set(_key, orginalList);
                    menuItems = CloneMenuItems(orginalList);
                }
                return menuItems;
            }
        }

        public void RefreshCache(){
            _memoryCache.Remove(_key);
            var menuItems = _menuItemCsvData.GetMenuConfigData();
            _memoryCache.Set(_key, menuItems);
        }

        public static List<MenuItem> CloneMenuItems(List<MenuItem> source)
        {
            List<MenuItem> cloned = new List<MenuItem>();
            foreach (MenuItem item in source)
            {
                MenuItem clone = new MenuItem()
                {
                    Id = item.Id,
                    MenuId = item.MenuId,
                    Title = item.Title,
                    Key = item.Key,
                    Visible = item.Visible,
                    Type = item.Type,
                    Mode = item.Mode,
                    Status = item.Status,
                    AlternatePath = item.AlternatePath,
                    AlternateText = item.AlternateText,
                    ChildCollection = CloneMenuItems(item.ChildCollection)
                };
                cloned.Add(clone);
            }
            return cloned;
        }

    }
}
