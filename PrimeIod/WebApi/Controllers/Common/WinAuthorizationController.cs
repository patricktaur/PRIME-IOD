using System;
using BLL;
using BLL.Query;
using BLL.Command;
using DAL;
using DAL.Models;
using DAL.DTOs;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

using BLL.CachedData;
using System.Collections.Generic;
using System.Linq;
using WebApi.ViewModels;
using AutoMapper;


using OpenIddict.Validation;
using Microsoft.AspNetCore.Authorization;
using WebApi.Authorization;
using WebApi.Helpers;


namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    //[Authorize]
    [ApiController]
    public class WinAuthorizationController: ControllerBase
    {
       private readonly IUnitOfWork _unitOfWork;
       UserRolesPermissionsCache _userRolesPermissionsCache;
       IConfiguration _config;

        private readonly ILogger _logger;
        private BizLogic _bizLogic;
       public WinAuthorizationController(
           IUnitOfWork unitOfFork,
           UserRolesPermissionsCache userRolesPermissionsCache,
            IConfiguration config,
           ILogger<WinAuthorizationController> logger,
           BizLogic bizLogic
       ){
           _unitOfWork = unitOfFork;
           _userRolesPermissionsCache = userRolesPermissionsCache;
            _logger = logger;
            _config = config;
            _bizLogic = bizLogic;
       }
        [HttpGet("user-n-permissions")]
        // [Authorize(Authorization.Policies.ViewAllRolesPolicy)]
        // [ProducesResponseType(200, Type = typeof(List<PermissionViewModel>))]
        public IActionResult GetUserNPermissions()
        {
            
            var errorMessage = "";
            var logConfig =  _config["LogAuthentication"];
            var logRequired = false;
            if (logConfig.ToLower() == "true"){
                logRequired = true;
            }


            var groupAccess = _config.GetValue<bool>("GroupAccess");
            
            
            string enterpriseId = null;
            
            enterpriseId =  HttpContext.User.Identity.Name;

            
            // var logfile = "logs/win-authLog.txt";
            // Utilities.QuickLog(string.Format("_context.HttpContext.User.Identity.Name : {0}", userName), logfile);
            
            var site = _config["Site"] + "";
            if (site.ToLower() == "devp"){
                
                 enterpriseId = _config["test-enterpriseId"] + "";
                 // userName = "Laptop5\\admin";
                
                   //userName = "Laptop5\\TestCRITUser";
                 //userName = "ent-dmpm";
                  //userName = "LAPTOP5\\Leo"; //dmpm tara hampton
                  
            }

            // if (enterpriseId == null){
            //     enterpriseId = "User name not found";
            // }

            if (enterpriseId == null)
            {
                errorMessage = "Logging Attempt Failed: User Name could not be read";
                  _logger.LogInformation(errorMessage);

                AddLoginDetails(enterpriseId, enterpriseId, false);
                return BadRequest(new 
                {
                    ErrorDescription = errorMessage
                });
            }

            var userRolePermissions = _userRolesPermissionsCache.GetUserRolesPermissions(enterpriseId);
            if (userRolePermissions.CanLogin == true){
                return Ok(userRolePermissions);
            }else{
                return BadRequest(new 
                {
                    ErrorDescription = userRolePermissions.Message
                });
            }
            
            // var prismUser =  _unitOfWork.TblUser_Repo.Find(x => x.EnterpriseId == "admin").FirstOrDefault();
            
            // var prismUser = _unitOfWork.TblUser_Repo
            // .Find(x => 
            //     x.EnterpriseId == enterpriseId
            //     ).FirstOrDefault();

            //  var user = _bizLogic.TblUser_Query.GetUserNRoles(enterpriseId);   
     
            // if (prismUser == null)
            // {
            //     errorMessage = String.Format("{0} / is not registered in PRIME", enterpriseId);
            //     if (logRequired){
            //     _logger.LogInformation(errorMessage);
            //     }
                
            //     return BadRequest(new 
            //     {
                   
            //         ErrorDescription = errorMessage
            //     });
            // }

            
            
            // AddLoginDetails(prismUser.EnterpriseId, prismUser.DisplayName, false);
            // //Group Access:
            // if (groupAccess == true){
            //     //check if user belongs to an active group
            //     var userIsInActiveGroup = _bizLogic.tblAppAccessGroupMembers_Query.UserIsInActiveGroup(prismUser.RecId);
            //     if (!userIsInActiveGroup){
            //         errorMessage = String.Format("Access Denied: User {0} is temporarily unable to access the application as it is currently operating in a limited access mode.", userName);
                    
                    
            //         if (logRequired){
            //         _logger.LogInformation(errorMessage);
            //      }

            //     AddLoginDetails(prismUser.EnterpriseId, prismUser.DisplayName, false);
            //     return BadRequest(new 
            //     {
            //         ErrorDescription = errorMessage
            //     });
            //     }
            // }

           
            // _userRolesPermissionsCache.RemoveUserRolesPermissions(enterpriseId);
            // var prismUserWithPermissions = _userRolesPermissionsCache.GetUserRolesPermissions(enterpriseId);
            // if (prismUserWithPermissions.Permissions.Count == 0 
            //     ){
            //     errorMessage = String.Format("{0} does not have permissions to use PRISM", enterpriseId);
            //     if (logRequired){
            //         _logger.LogInformation(errorMessage);
            //      }

            //     AddLoginDetails(prismUserWithPermissions.EnterpriseId, prismUserWithPermissions.DisplayName, false);

            //     return BadRequest(new 
            //     {
            //         ErrorDescription = errorMessage
            //     });

            // }
            
            
            //login success:
            // if (logRequired){
            //     _logger.LogInformation(String.Format("{0} logged in", enterpriseId));
            // }

            
            
            // return Ok(prismUser
            //     );
            
            // AddLoginDetails(prismUserWithPermissions.EnterpriseId, prismUserWithPermissions.DisplayName, true);

            //  return Ok(prismUserWithPermissions);
            // return Ok();
        }

        
        public tblLoginDetailsV2 AddLoginDetails(string enterpriseId, string userName, bool isSuccessfull) {
            var requestMethod = HttpContext.Request.Method;
    
            // Get the server port
            var serverPort = HttpContext.Connection.LocalPort;
            
            // Check if HTTPS is being used
            var host = HttpContext.Request.Host;
            
            // Get the local IP address
            var localAddress = HttpContext.Connection.LocalIpAddress;
            
            // Get the remote IP address (i.e. the client's IP address)
            var hostAddress = HttpContext.Connection.RemoteIpAddress;
            
            // Get the User-Agent header from the request
            // var userAgent = HttpContext.Request.Headers["User-Agent"].ToString();
            
            // Get the URL of the request
            var url = HttpContext.Request.Headers["Host"].ToString();
            
            // Get a value set by the user in a custom header
            // var ignoreSetByUserId = HttpContext.Request.Headers["IgnoreSetByUserId"].ToString();

            
            var tblLoginDetails = new tblLoginDetailsV2();
            tblLoginDetails.RecId = 0;
            tblLoginDetails.UserName = userName;
            tblLoginDetails.CreatedOn = DateTime.Now;
            tblLoginDetails.BlnSuccessfull = isSuccessfull;
            tblLoginDetails.RequestMethod = requestMethod;
            tblLoginDetails.ServerPort = serverPort;
            // tblLoginDetails.Https = host.ToString();
            tblLoginDetails.LocalAddr = localAddress.ToString();
            tblLoginDetails.HostAddress = hostAddress.ToString();
            // tblLoginDetails.UserAgent = userAgent;
            tblLoginDetails.Url = url;
            tblLoginDetails.EnterpriseId = enterpriseId;

            // _bizLogic.tblLoginDetailsV2Commands.Add(tblLoginDetails);
            _bizLogic.SaveChanges();
            return tblLoginDetails;
        }

       
    }
}