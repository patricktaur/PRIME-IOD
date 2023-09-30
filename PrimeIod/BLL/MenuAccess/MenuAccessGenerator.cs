using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using DAL.DTOs;
using BLL.CachedData;

namespace BLL.MenuAccess
{
    

    public class MenuAccessGenerator
    {
        private string _menuConfigFile;
        private ApplicationMenuCache _menuItemCsvDataCached;

        private BizLogic _bizLogic;
        public MenuAccessGenerator(ApplicationMenuCache  menuItemCsvData,
        BizLogic bizLogic
        ){
            _menuItemCsvDataCached = menuItemCsvData;
            _bizLogic = bizLogic;
        }

        public MenuAccessGenerator(){
            
        }
        
        

        public List<MenuPermission> GetMenuPmerissions( List<MenuItem> menuItemsList, List<ComponentPermission> permissions){
   
            foreach (MenuItem menuItem in menuItemsList)
            {
                TraverseAndMark(menuItem,  false, "", permissions);
                RollUpComponentCode(menuItem);
            }

            var value = FlattenMenu(menuItemsList);
            return FlattenMenu(menuItemsList);
        }
 

        public void TraverseAndMark(MenuItem menuItem,  bool isChildVisible, string key, List<ComponentPermission> permissions)
        {
            key += menuItem.MenuId;
            key += "/"; // Add a dot separator between parent and child keys

            bool shouldMarkCurrentItemVisible = false; // Start by assuming current item is not visible
            // string componentCode = "";
            
            
            if (menuItem.ChildCollection.Count == 0) // Bottom-most branch
            {
                //Last level - Component
                menuItem.Key = menuItem.MenuId; 
                // var permission = permissions.Where(x => x.CompCode == menuItem.Key).FirstOrDefault();
                var permission = permissions.Where(x => x.CompCode == menuItem.Key && x.Mode == menuItem.Mode).FirstOrDefault();
                if (permission != null){
                    shouldMarkCurrentItemVisible = true;
                    menuItem.Status = permission.Status;
                    // componentCode = permission.CompCode;
                    permission.Path = menuItem.ParentId;
                }
                
            }
            else
            {

                //roll up the Status
                
                
                foreach (MenuItem childItem in menuItem.ChildCollection)
                {
                    string childKey = key;
                    TraverseAndMark(childItem,  shouldMarkCurrentItemVisible, childKey, permissions); // Recursively traverse through ChildCollections
                    if (childItem.Visible) // If any child is visible, mark parent item as visible too
                    {
                        shouldMarkCurrentItemVisible = true;
                    }

                    //override any child permission:
                    if (menuItem.Visible == false){
                        shouldMarkCurrentItemVisible = false;
                    }

                    
                    //Bug: Menu Item with a view child. Status is not set. 
                    // if (menuItem.ChildCollection.Select(c => c.Status).Distinct().Count() == 1){
                    //     menuItem.Status = menuItem.ChildCollection.First().Status;
                    // }

                    // var distCount = menuItem.ChildCollection
                    // .Where(x => x.Status!= null && x.Visible)
                    // .Select(c => c.Status).Distinct().Count();

                    // if (distCount == 1){
                    //     menuItem.Status = menuItem.ChildCollection.First().Status;
                    // }

                    //Get the highest status in ChildCollection
                    var childStatus = menuItem.ChildCollection.Select(c => c.Status).Distinct().Max();
                    menuItem.Status = childStatus;

                }
                menuItem.Key = key.Substring(0, key.Length - 1); // Set the key of the current item based on its parent key and its own MenuId
            }

            menuItem.Visible = shouldMarkCurrentItemVisible; // Set the visible property of the current item based on child visibility
            // menuItem.ComponentCode = componentCode;
        }

        private List<MenuPermission> FlattenMenu(List<MenuItem> menuItemsList, string parentKey = "")
        {
            // var flattenedMenu = new Dictionary<string, bool>();
            var flattenedMenuX  = new List<MenuPermission>();
            
            foreach (var menuItem in menuItemsList)
            {
                // var key = string.IsNullOrEmpty(parentKey) ? menuItem.Key : $"{parentKey}.{menuItem.Key}";
                // flattenedMenu.Add(menuItem.Key, menuItem.Visible);
                if (menuItem.Visible && menuItem.Type == MenuItemType.Menu){
                    flattenedMenuX.Add(new MenuPermission{
                        
                        MenuPath = menuItem.Key,
                        Status = menuItem.Status,
                        Title = menuItem.Title,
                        ComponentCode = menuItem.ComponentCode,
                        AlternatePath = menuItem.AlternatePath,
                        AlternateText = menuItem.AlternateText
                        //Mode = not used
                    });
                }
                
                if (menuItem.ChildCollection != null)
                {
                    var flattenedChildMenu = FlattenMenu(menuItem.ChildCollection);
                    flattenedMenuX.AddRange(flattenedChildMenu);
                }
            }
            
            return flattenedMenuX;
        }

        public void RollUpComponentCode(MenuItem menuItem)
        {
            var isLastButOneItem = IsLastButOneItem(menuItem);
            // if (menuItem.ChildCollection.Count == 1) 
            if(isLastButOneItem)
            {
                var childItem = menuItem.ChildCollection[0];
                menuItem.ComponentCode = childItem.MenuId;
            }
            else
            {
                foreach (MenuItem childItem in menuItem.ChildCollection)
                {
                    RollUpComponentCode(childItem); // Recursively traverse through ChildCollections
                }
            }

        }

        private void SetVisibility(MenuItem menuItem, bool visible)
        {
            menuItem.Visible = visible;
            if (menuItem.ChildCollection != null)
            {
                foreach (var child in menuItem.ChildCollection)
                {
                    SetVisibility(child, visible);
                }
            }
        }

       
        public List<ComponentPermission> GetComponentPermissions(int userId, List<int> roleIds, List<AppComponent> appComps ){
            var retValue = new List<ComponentPermission>();
            appComps.ForEach(x => {
                var mode = AccessMode.None;
                if (x.AppComponentRoles.Any(acr => roleIds.Contains(acr.RoleId) && acr.Mode == AccessMode.Edit)){
                   mode = AccessMode.Edit; 
                } else if(x.AppComponentRoles.Any(acr => roleIds.Contains(acr.RoleId) && acr.Mode == AccessMode.EditIfUserIsInStudyResource)){
                     mode = AccessMode.EditIfUserIsInStudyResource; 
                } else if(x.AppComponentRoles.Any(acr => roleIds.Contains(acr.RoleId) && acr.Mode == AccessMode.View)){
                     mode = AccessMode.View; 
                }

                if (mode != AccessMode.None){
                    var item = new ComponentPermission();
                    // item.CompCode =  mode == AccessMode.Edit  || mode == AccessMode.EditIfUserIsInStudyResource ? x.CompCode + "-edit" : x.CompCode + "-view";
                    item.CompCode =  x.CompCode ;
                    item.Mode = mode;
                    item.Status = x.Status;
                    item.Title = x.Title;
                    if (item.Mode == AccessMode.EditIfUserIsInStudyResource){
                        // var resourceBasedEditRoleIds  = x.AppComponentRoles.Where(y => y.Mode == AccessMode.EditIfUserIsInStudyResource).Select(x => x.RoleId).ToList();
                        // item.StudiesPermitted = GetStudiesPermitted(userId, resourceBasedEditRoleIds);
                        // //Change AccessMode to Edit and add if permission contains one or more permitted studies. 
                        // if (item.StudiesPermitted.Count > 0){
                        //     item.Mode = AccessMode.Edit;
                        //     retValue.Add(item);
                        // } else {
                        //     // if(x.AppComponentRoles.Any(acr => roleIds.Contains(acr.RoleId) && acr.Mode == AccessMode.View)){
                        //         // item.Mode = AccessMode.View;
                        //         // retValue.Add(item);
                        //     // }

                        //     if(x.AppComponentRoles.Any(acr => roleIds.Contains(acr.RoleId) && acr.Mode == AccessMode.EditIfUserIsInStudyResource)){
                        //         item.Mode = AccessMode.View;
                        //         retValue.Add(item);
                        //     }
                        //     // item.Mode = AccessMode.View;
                        //     // retValue.Add(item);
                        // }
                    }else{
                        retValue.Add(item);
                    }
                    
                    
                }
            }) ;  


            return retValue;

        }

        

        


        private string AppendCompCode(AppComponent ac, List<int> roleIds){
            var accessMode = GetAccessMode(ac, roleIds);
            return (accessMode == AccessMode.Edit || accessMode == AccessMode.EditIfUserIsInStudyResource) ? ac.CompCode + "-edit" : ac.CompCode;
        }

        private AccessMode GetAccessMode(AppComponent ac, List<int> roleIds){
            // return ac.AppComponentRoles.Select(acr => acr.Mode).FirstOrDefault();
            // roleIds.Contains(acr.RoleId)
            if (ac.AppComponentRoles.Any(acr => roleIds.Contains(acr.RoleId) && acr.Mode == AccessMode.Edit)){
                return AccessMode.Edit;
            }

            if (ac.AppComponentRoles.Any(acr =>  roleIds.Contains(acr.RoleId) && acr.Mode == AccessMode.EditIfUserIsInStudyResource)){
                return AccessMode.EditIfUserIsInStudyResource;
            }

            if (ac.AppComponentRoles.Any(acr =>  roleIds.Contains(acr.RoleId) &&  acr.Mode == AccessMode.View)){
                return AccessMode.View;
            }

            return AccessMode.None;
            
            // return ac.AppComponentRoles
            // .FirstOrDefault(acr =>
            //     acr.Mode == AccessMode.Edit 
            //     || acr.Mode == AccessMode.EditIfUserIsInStudyResource
            //     || acr.Mode == AccessMode.View
            //     || acr.Mode == AccessMode.None
            //     ).Mode;




        }

        private bool IsLastButOneItem(MenuItem menuItem) {
            if(menuItem.ChildCollection.Count == 1) {
                if(menuItem.ChildCollection[0].ChildCollection.Count > 0){
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }


    }
}
