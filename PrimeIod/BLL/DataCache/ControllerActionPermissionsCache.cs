using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.AspNetCore.Identity;
using DAL.Models;
 using DAL.DTOs;
using AutoMapper;
using Computations.Enumerators;
using Helpers.Extensions;


namespace BLL.CachedData
{
    
    public class ControllerActionPermissionsCache
    {
        private const string _key = "controllerActionPermissions";
        private readonly IMemoryCache _memoryCache;
        // private readonly RoleManager<ApplicationRole> _roleManager;
        public ControllerActionPermissionsCache(
            
            IMemoryCache memoryCache
        ){
            _memoryCache = memoryCache;
        }

        public List<ControllerActionPermissionDTO> ControllerActionPermissionsCached { 
            get{
                List<ControllerActionPermissionDTO> openStudyListDTOs;
                if (_memoryCache.TryGetValue(_key, out List<ControllerActionPermissionDTO> openStudyListDTOsCache))
                {
                    openStudyListDTOs = openStudyListDTOsCache;
                }else{
                    openStudyListDTOs = GetControllerValues();
                    _memoryCache.Set(_key, openStudyListDTOs);
                }
                return openStudyListDTOs;
            }
        }

        public string GetPermissionValue(string ControllerName, string ActionName){
            var cont = ControllerActionPermissionsCached
                .Where(x => x.ControllerName.ToLower() == ControllerName.ToLower()).FirstOrDefault();
                
            if (cont == null){
                return "";
            }

            var action = cont.ActionPermissions
            .Where(x => x.ActionName == ActionName).
            FirstOrDefault();

            if (action == null){
                return "";
            }
            return action.PermissionValue;
            
        }

        //todo : review these roles:
         private List<ControllerActionPermissionDTO> GetControllerValues(){
            var requestRequestPermissions = "rol.Admin, rol.DMPM_manager, rol.DMPM_oversight, rol.DMPM, rol.CDMS Manager, rol.CDS Manager, rol.IMI_TPM, rol.CRM_Central_Monitor, rol.CRM_Clinical_Data_Analyst, rol.CRM_Clinical_Data_Analyst_Sr, rol.CRM_Clinical_Risk_Manager, rol.CRM_Clinical_Risk_Manager_Sr, rol.CRM_Director_Sr, rol.IMI_PM, rol.IMI_PD_PM";
            
            var requestApprovePermissions = "rol.Admin";
             
            var values = new List<ControllerActionPermissionDTO>{

                new ControllerActionPermissionDTO{ControllerName="TblAppAccessGroup", 
                    ActionPermissions = new List<ActionPermissionsDTO>{
                         new ActionPermissionsDTO{ActionName="List", PermissionValue="reports.view, rol.*, res.*"},
                        new ActionPermissionsDTO{ActionName="Edit", PermissionValue="reports.view, rol.*, res.*"},
                        new ActionPermissionsDTO{ActionName="New", PermissionValue="reports.view, rol.*, res.*"},
                        new ActionPermissionsDTO{ActionName="GetById", PermissionValue="reports.view, rol.*, res.*"},
                        new ActionPermissionsDTO{ActionName="AddOrUpdate", PermissionValue="reports.view, rol.*, res.*"},
                        new ActionPermissionsDTO{ActionName="Delete", PermissionValue="reports.view, rol.*, res.*"},
                        // new ActionPermissionsDTO{ActionName="GetUsers", PermissionValue="reports.view, rol.*, res.*"},
                    }
                 },

                 new ControllerActionPermissionDTO{ControllerName="TblAppAccessGroupMembers", 
                    ActionPermissions = new List<ActionPermissionsDTO>{
                        //  new ActionPermissionsDTO{ActionName="List", PermissionValue="reports.view, rol.*, res.*"},
                         new ActionPermissionsDTO{ActionName="GetGroupMembers", PermissionValue="reports.view, rol.*, res.*"},
                        // new ActionPermissionsDTO{ActionName="New", PermissionValue="reports.view, rol.*, res.*"},
                        // new ActionPermissionsDTO{ActionName="GetById", PermissionValue="reports.view, rol.*, res.*"},
                         new ActionPermissionsDTO{ActionName="UpdateGroupMembers", PermissionValue="reports.view, rol.*, res.*"},
                        // new ActionPermissionsDTO{ActionName="Delete", PermissionValue="reports.view, rol.*, res.*"},
                        new ActionPermissionsDTO{ActionName="GetUsers", PermissionValue="reports.view, rol.*, res.*"},
                    }
                 },


                new ControllerActionPermissionDTO{ControllerName="Common", 
                    ActionPermissions = new List<ActionPermissionsDTO>{
                        new ActionPermissionsDTO{ActionName="GetFilters", PermissionValue="reports.view, *"},
                        new ActionPermissionsDTO{ActionName="GetDmStudyIconNumbers", PermissionValue="reports.view, *"},
                        new ActionPermissionsDTO{ActionName="GetDmStudyIconNumbersAndSponsors", PermissionValue="reports.view, *"},
                        new ActionPermissionsDTO{ActionName="UserStudyResources", PermissionValue="reports.view, *"},
                        new ActionPermissionsDTO{ActionName="UserRoles", PermissionValue="reports.view, *"},
                    }

                },


                new ControllerActionPermissionDTO{ControllerName="FTEDemand", 
                    ActionPermissions = new List<ActionPermissionsDTO>{
                        new ActionPermissionsDTO{ActionName="List", PermissionValue="reports.view, *"},
                        
                    }

                },
                #region AppComponents

                
                
                new ControllerActionPermissionDTO{ControllerName="AppComponent", 
                    ActionPermissions = new List<ActionPermissionsDTO>{
                        new ActionPermissionsDTO{ActionName="GetAppMenuPermissions", PermissionValue="*"},
                        new ActionPermissionsDTO{ActionName="GetComponentPermissions", PermissionValue="*"},
                    }

                },

                #endregion
                
                new ControllerActionPermissionDTO{ControllerName="TblUser", 
                    ActionPermissions = new List<ActionPermissionsDTO>{
                        new ActionPermissionsDTO{ActionName="Update", PermissionValue="users.manage"},
                        new ActionPermissionsDTO{ActionName="GetUsersByRole", PermissionValue="reports.view, rol.*, res.*"},
                        new ActionPermissionsDTO{ActionName="GetDmpmCdlUsers", PermissionValue="reports.view, rol.*, res.*"},
                        new ActionPermissionsDTO{ActionName="GetUsers", PermissionValue="reports.view, rol.*, res.*"},
                        new ActionPermissionsDTO{ActionName="GetTblUserById", PermissionValue="reports.view, rol.*, res.*"},
                        new ActionPermissionsDTO{ActionName="GetUserViewDTO", PermissionValue="reports.view, rol.*, res.*"},
                        new ActionPermissionsDTO{ActionName="GetUserAndRolesDTO", PermissionValue="reports.view, rol.*, res.*"},
                        new ActionPermissionsDTO{ActionName="SdtmProgrammingLeads", PermissionValue="reports.view, rol.*, res.*"},
                        new ActionPermissionsDTO{ActionName="ClinicalProgrammingLeads", PermissionValue="reports.view, rol.*, res.*"},
                        new ActionPermissionsDTO{ActionName="GetAll", PermissionValue="reports.view, rol.*, res.*"},
                        new ActionPermissionsDTO{ActionName="UpdateUser", PermissionValue="reports.view, rol.*, res.*"},
                        new ActionPermissionsDTO{ActionName="Cdpl_CdsManager_CdplSdtmProgrammer", PermissionValue="reports.view, rol.*, res.*"},
                        new ActionPermissionsDTO{ActionName="Cdpl_CdsProgrammer", PermissionValue="reports.view, rol.*, res.*"},
                        new ActionPermissionsDTO{ActionName="CdsProgrammer", PermissionValue="reports.view, rol.*, res.*"},
                        new ActionPermissionsDTO{ActionName="Imi_Cdpl", PermissionValue="reports.view, rol.*, res.*"},
                        new ActionPermissionsDTO{ActionName="ReportList", PermissionValue="reports.view, rol.*, res.*"},
                        new ActionPermissionsDTO{ActionName="ReportUIGrid", PermissionValue="reports.view, rol.*, res.*"},   
                        new ActionPermissionsDTO{ActionName="GetUsersForCDACM", PermissionValue="reports.view, rol.*, res.*"},   
                        new ActionPermissionsDTO{ActionName="GetUsersForClinicalRiskMag", PermissionValue="reports.view, rol.*, res.*"},   
                        new ActionPermissionsDTO{ActionName="GetUsersForAnalyticsDevLead", PermissionValue="reports.view, rol.*, res.*"},   
                    }
                },

                new ControllerActionPermissionDTO{ControllerName="tblLoginDetailsV2", 
                    ActionPermissions = new List<ActionPermissionsDTO>{
                        new ActionPermissionsDTO{ActionName="GetRecords", PermissionValue="*"},
                        new ActionPermissionsDTO{ActionName="ReportList_S", PermissionValue="reports.view, rol.*, res.*"},
                        new ActionPermissionsDTO{ActionName="UserLogin_ReportList_S", PermissionValue="reports.view, rol.*, res.*"}
                    }
                },

                

                new ControllerActionPermissionDTO{ControllerName="ErrorLogs", 
                    ActionPermissions = new List<ActionPermissionsDTO>{
                        new ActionPermissionsDTO{ActionName="GetRecords", PermissionValue="reports.view, rol.*, res.*"},
                        new ActionPermissionsDTO{ActionName="GetLogFile", PermissionValue="reports.view, rol.*, res.*"}
                    }
                },

                

                

                

                

                
                
                new ControllerActionPermissionDTO{ControllerName="Export", 
                    ActionPermissions = new List<ActionPermissionsDTO>{
                        new ActionPermissionsDTO{ActionName="DmExport", PermissionValue="reports.view, rol.*, res.*"},
                        new ActionPermissionsDTO{ActionName="CdsExport", PermissionValue="reports.view, rol.*, res.*"},
                        new ActionPermissionsDTO{ActionName="CdmsExport", PermissionValue="reports.view, rol.*, res.*"},
                        new ActionPermissionsDTO{ActionName="ImiExport", PermissionValue="reports.view, rol.*, res.*"},
                        new ActionPermissionsDTO{ActionName="CrmExport", PermissionValue="reports.view, rol.*, res.*"},
                    }
                },
            } ;  
                
                




            return values;

        }
    }
}