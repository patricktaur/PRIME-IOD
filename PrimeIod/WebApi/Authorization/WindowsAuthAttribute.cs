using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Linq;
using System;
using WebApi.Helpers;
namespace WebApi.Authorization
{
   [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]  
    public class WindowsAuthAttribute: AuthorizeAttribute, IAuthorizationFilter
    {
      
       public void OnAuthorization(AuthorizationFilterContext context)
        {
            return ;
            // var logfile = "logs/winAuth.txt";
            // var userName = context.HttpContext.User.Identity.Name;
            
            // Utilities.QuickLog(string.Format("UserName: {0}", userName), logfile);
            
            // if (userName == "Admin"){
            //     Utilities.QuickLog("Inside If", logfile);

            //     return; //User Authorized. Wihtout setting any result value and just returning is sufficent for authorizing user
            // }
            
            //Not Authorized:
            //     Utilities.QuickLog("Unauthorized Section", logfile);

            // context.Result = new UnauthorizedResult();
            // return;
        }

    }
}