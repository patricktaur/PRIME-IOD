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
    public class AppComponentCsvData
    {
        // private const string MenuConfigFilePath = @"C:\Development\p935-icon-prism-core\Prism\WebApi\AppSettings\MenuConfig.csv";
        private string _menuConfigFile; // = "AppSettings/RoleMatrixTest.csv";
        public AppComponentCsvData(string fileName){
           _menuConfigFile = fileName;
        }
        
        public List<AppComponent> GetRoleMatrix()
        {
            using (var reader = new StreamReader(_menuConfigFile))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                List<AppComponent> appComponents = new List<AppComponent>();

                // Read the header row
                csv.Read();
                csv.ReadHeader();

                string[] header = csv.HeaderRecord;
                csv.Read();

                var roles = header;
                

                

                for (int row = 3; csv.Read(); row++)
                {
                    AppComponent appComponent = new AppComponent();
                    appComponent.Title = csv.GetField<string>(3);
                    appComponent.CompCode = csv.GetField<string>(0);
                    appComponent.RedirectTo = csv.GetField<string>(1);
                    appComponent.Status = GetStatus(csv.GetField<string>(2), row, 1);
                    appComponent.AppComponentRoles = new List<AppComponentRoles>();

                    for (int i = 5; i < roles.Length; i++)
                    {
                        int roleId;
                        if (int.TryParse(roles[i], out roleId))
                        {
                            string cellValue = csv.GetField<string>(i);
                            AccessMode mode;
                            if (!string.IsNullOrWhiteSpace(cellValue))
                            {
                                mode = GetAccessMode(cellValue, row, i);
                                if (mode != AccessMode.None){  //
                                    appComponent.AppComponentRoles.Add(new AppComponentRoles
                                    {
                                        RoleId = roleId,
                                        Mode = mode
                                    });
                                }
                                
                            }
                        }
                    }
                    appComponents.Add(appComponent);
                }

                

                return appComponents;
            }
        }

        private MenuStatus? GetStatus(string status, int row, int col){

            
            if (!string.IsNullOrWhiteSpace(status))
            {
                return status switch
                {
                    "NR" => MenuStatus.NotReady,
                    "RFU" => MenuStatus.ReadyForUAT,
                    "UP" => MenuStatus.UATPassed,
                    "PP" => MenuStatus.ProductionPassed,
                    // "UM" => MenuStatus.UnderMaintenance,
                    _ => throw new ArgumentException($"Invalid status value: {status} found in row {row}, column {col + 1}.")
                };
            }else{
                return null;
            }
            
            
        }
//throw new Exception($"Invalid permission value '{cellValue}' found in row {j}, column {i}.");

        private AccessMode GetAccessMode(string mode, int row, int col){
            return mode switch
                {
                    "N" => AccessMode.None,
                    "V" => AccessMode.View,
                    "E" => AccessMode.Edit,
                    "R" => AccessMode.EditIfUserIsInStudyResource,
                    
                    _ => throw new ArgumentException($"Invalid mode value: {mode} found in row {row}, column {col + 1}.")
                };
        }
        
    
    }
}