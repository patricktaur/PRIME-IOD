
using System;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using WebApi.Helpers;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
namespace WebApi.Authorization
{
    public class WindowsAuthActionFilter : IActionFilter
    {
        //WindowsAuthAttribute not suffcessful, hence attempting this workaround:
        ControllerPermissions _controllerPermissions;
        IConfiguration _config;

        private readonly ILogger _logger;

        public WindowsAuthActionFilter(
            ControllerPermissions permissions,
            IConfiguration config,
            ILogger<WindowsAuthActionFilter> logger
            ){
            _controllerPermissions = permissions;
            _config = config;
            _logger = logger;
        }
        
        public void OnActionExecuting(ActionExecutingContext context)
        {
            string controllerName = (string)context.RouteData.Values["Controller"];
            var actionName = (string)context.RouteData.Values["action"];
            var enterpriseId = context.HttpContext.User.Identity.Name;

            var site = _config["Site"] + "";
            if (site.ToLower() == "devp"){
                enterpriseId = _config["test-enterpriseId"] + "";
                //enterpriseId = "Laptop5\\admin";
                // = "Laptop5\\TestCRITUser";
                // enterpriseId = "ent-dmpm";
                //   enterpriseId = "LAPTOP5\\Leo"; //dmpm tara hampton
                
            }
            
            // enterpriseId = "normal-user";
           
           var logConfig =  _config["LogControllerAction"] + "";
           var logRequired = false;
           if (logConfig.ToLower() == "true") {
               logRequired = true;
           }
           _logger.LogInformation("logConfig: " + logConfig);
           _logger.LogInformation("logRequired: " + logRequired);

           var logMessage = String.Format("enterpriseId: {0}-{1}/{2}", enterpriseId, controllerName, actionName);

            if (_controllerPermissions.HasPermission(enterpriseId, controllerName, actionName)){
                if (logRequired){
                    _logger.LogInformation("Access Success: " + logMessage);
                }
                return;
            }

            if (logRequired){
                _logger.LogInformation("Access Failed: " + logMessage);
            }
            
             context.Result = new UnauthorizedObjectResult("Unuathorized");
             return;
            
        }
        public void OnActionExecuted(ActionExecutedContext context)
        {
            // our code after action executes
        }
    }
}