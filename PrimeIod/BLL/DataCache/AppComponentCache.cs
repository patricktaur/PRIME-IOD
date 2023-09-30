
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
    public class AppComponentCache
    {
        private const string _key = "role-matrix";
        private const string MenuConfigFilePath = "AppSettings/RoleMatrixTest.csv";
        private readonly IMemoryCache _memoryCache;
        private readonly AppComponentCsvData _appComponentCsvData;
        
        public AppComponentCache(
            IMemoryCache memoryCache,
            AppComponentCsvData roleMatrixData
        ){
            _memoryCache = memoryCache;
            _appComponentCsvData = roleMatrixData;
        }

        public List<AppComponent> AppComponentDataCached{
            get{
                List<AppComponent> appComponents;
                if (_memoryCache.TryGetValue(_key, out List<AppComponent> menuItemsCached))
                {
                    // prevent reference - to prevent changes to the orignial list.
                    appComponents = GetClone(menuItemsCached);
                }else{
                    var appComponentsOrigin = _appComponentCsvData.GetRoleMatrix(); //GetMenuConfigData();
                    _memoryCache.Set(_key, appComponentsOrigin);
                    appComponents = GetClone(appComponentsOrigin);
                }
                return appComponents;
            }
        }

        public void RefreshCache(){
            _memoryCache.Remove(_key);
            var menuItems = _appComponentCsvData.GetRoleMatrix();
            _memoryCache.Set(_key, menuItems);
        }


        public List<AppComponent> GetClone(List<AppComponent> sourceList)
        {
            // Create a new list to store the copied objects
            List<AppComponent> newList = new List<AppComponent>();

            // Loop through the source list and create a copy of each object
            foreach (AppComponent sourceObj in sourceList)
            {
                AppComponent newObj = new AppComponent
                {
                    Title = sourceObj.Title,
                    Description = sourceObj.Description,
                    CompCode = sourceObj.CompCode,
                    Status = sourceObj.Status,
                    RedirectTo = sourceObj.RedirectTo
                };

                // Create a new hash set for the roles and add each role from the source object
                newObj.AppComponentRoles = new HashSet<AppComponentRoles>();
                foreach (AppComponentRoles sourceRole in sourceObj.AppComponentRoles)
                {
                    AppComponentRoles newRole = new AppComponentRoles
                    {
                        RoleId = sourceRole.RoleId,
                        Mode = sourceRole.Mode
                    };
                    newObj.AppComponentRoles.Add(newRole);
                }

                // Add the new object to the new list
                newList.Add(newObj);
            }

            // Return the new list
            return newList;
        }


    }
}
