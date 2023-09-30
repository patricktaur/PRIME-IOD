using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Validation;
using AutoMapper;
using DAL;
using DAL.Models;
using DAL.DTOs;
using BLL;
using WebApi.ViewModels;
using BLL.MenuAccess;

namespace WebApi.Controllers
{
    // [Authorize(AuthenticationSchemes = OpenIddictValidationDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class AppComponentController : ControllerBase {
        // private BizLogic _bizLogic;
        // private IMapper _mapper;

        // private MenuAccessGenerator _menuAccessGenerator;
        private AppComponentMenuPermissions _appComponentMenuPermissions;
        public AppComponentController (
            AppComponentMenuPermissions appComponentMenuPermissions
             ) {
                _appComponentMenuPermissions = appComponentMenuPermissions;
            // _bizLogic = bizLogic;
            // _mapper = mapper;
            // _menuAccessGenerator = menuAccessGenerator;
        }
      

        [HttpGet("app-comp-menu-permissions/{userId}")]
        public IActionResult GetAppMenuPermissions (int userId) {
            // return Ok();
           return Ok (_appComponentMenuPermissions.GetMenuComponentPermissions(userId));
        }

        [HttpGet("app-component-permissions/{userId}")]
        public IActionResult GetComponentPermissions(int userId)
        {
           return Ok(_appComponentMenuPermissions.GetComponentPermissionsView(userId));
        }

    }
}