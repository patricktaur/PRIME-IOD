using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using DAL.DTOs;
using BLL.CachedData;

namespace BLL.MenuAccess
{
    public class AppComponentMenuPermissions
    {
        private ApplicationMenuCache _menuItemCsvDataCached;
        private AppComponentCache _appComponentCache;
        private MenuAccessGenerator _menuAccessGenerator;
        private BizLogic _bizLogic;

        public AppComponentMenuPermissions(
            ApplicationMenuCache  menuItemCsvData,
            AppComponentCache appComponentCache,
            MenuAccessGenerator menuAccessGenerator,
            BizLogic bizLogic
            ){
                _menuItemCsvDataCached = menuItemCsvData;
                _appComponentCache = appComponentCache;
                _menuAccessGenerator = menuAccessGenerator;
                _bizLogic = bizLogic;
        }

        public AppCompAndMenuPermissions GetMenuComponentPermissions(int userId){
            //todo: 
            //Get all user's roleIds, User.RoleIds + Resource RoleIds (DM, IMI and CRM)
            var roleIds = _bizLogic.TblUser_Query.GetUserRoleIds(userId);
            return GetMenuComponentPermissions(userId, roleIds);
            
        }
        
        public AppCompAndMenuPermissions GetMenuComponentPermissions(int userId, List<int> roleIds){
            
            
            var appComponents = _appComponentCache.AppComponentDataCached;
            var userCompPermissions = _menuAccessGenerator.GetComponentPermissions(userId, roleIds, appComponents);
            
            var menuItems = _menuItemCsvDataCached.MenuConfigDataCached;
            var userMenuPermissions = _menuAccessGenerator.GetMenuPmerissions(menuItems, userCompPermissions);

            var retPermissions = new AppCompAndMenuPermissions
            {
                AppCompPermissions = userCompPermissions,
                AppMenuPermissions = userMenuPermissions
            };

            return retPermissions;
        }

        public List<ComponentPermission> GetComponentPermissionsView(int userId){
            //List is used for displaying available componenents to the user
            //hence no-access item is not required in the list
            return null;
            // var roleIds = _bizLogic.TblUserQuery.GetUserRoleIds(userId);
            // var compPermissions = GetComponentPermissions(userId, roleIds);

            
            // return compPermissions.Where(x => x.CompCode != "no-permissions").ToList();       
        }
        
        public List<ComponentPermission> GetComponentPermissions(int userId, List<int> roleIds){
            var appComponents = _appComponentCache.AppComponentDataCached;
            var userCompPermissions = _menuAccessGenerator.GetComponentPermissions(userId, roleIds, appComponents);
            // situation: 30Apr2023-1028
            // if a user has dm studies and does not have any dm study related component permissions
            //then if the Studies menu is clicked the application displays no-access page in the outer container
            // preventing user to change to another study.
            //A no-permission comp permission is added here if the GetAllStudyIconNumbersByUser count is > 0
            //however in some situations, user has permission for some components of the dm study 
            //and the no-permission comp permission will generate menu item which is not required.
            //Hence, both conditions, !hasDmStudyTabComponents and userStudyResources.Count > 0 
            //to add the no-permissions comp permission

            bool hasDmStudyTabComponents = userCompPermissions.Any(c => DMStudyTabComponentCodes().Contains(c.CompCode));
            //commented:
        //     if (!hasDmStudyTabComponents){
        //         var userStudyResources = _bizLogic.TblStudyQuery.GetAllStudyIconNumbersByUser(userId);
                        
        //         if (userStudyResources.Count > 0 ){
        //             userCompPermissions.Add(new ComponentPermission{
        //             CompCode = "no-permissions",
        //             Title = "Study No Access Page",
        //             Mode = AccessMode.View
        //             });
        //         }
        //    }
            
            
            
            //However without the 
            
            // userCompPermissions.Add(new ComponentPermission{
            //     CompCode = "no-permissions",
            //     Title = "Study No Access Page",
            //     Mode = AccessMode.View
            //     });
            
            
            return userCompPermissions;
        }
       

        public List<MenuPermission> GetMenuPermissions(List<ComponentPermission> userCompPermissions){
            var menuItems = _menuItemCsvDataCached.MenuConfigDataCached;
            
            var userMenuPermissions = _menuAccessGenerator.GetMenuPmerissions(menuItems, userCompPermissions);  
            return userMenuPermissions;
        }


        
       List<string> DMStudyTabComponentCodes(){
          string compCodes = "study-proj-review-sign-off, study-proj-review-categories, study-proj-review-issue-tracker, study-proj-review-history, study-proj-review-offline-checks, study-pro-review-issue-list-archived, study-proj-review-archived-list, study-proj-review-history-archived-list, study-proj-review-timelines-archived, study-description, study-other-icon-departments, study-assumptions, study-resources, study-fte-resources, study-timelines, study-deliverables, study-celgene-deliverables, study-interim-locks, study-status, study-pageflow, study-external-data, study-database-lock-dashboard, study-task-database-build, study-task-programming, study-task-data-processing, study-cdms, study-cdms-cppc, study-cdms-tracker, study-cdms-clininfo-tracker, study-cds, study-cds-development-request, study-cds-output-request, study-cds-delivery-request, study-cds-coding-request, study-cds-programming-instructions, study-quality-review, study-kpis, study-kpi-dashboard, study-edc-access, study-tmf-qc, study-local-labs, study-fte-computations";
          // List<string> list = commaSeparatedString.Split(',').Select(s => s.Replace(" ", "")).ToList();
           return compCodes.Split(',')
           .Select(s => s.Replace(" ", ""))
           .ToList();
       }
       



    }
}
