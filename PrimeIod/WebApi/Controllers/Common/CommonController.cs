using System;
using BLL;
using BLL.Query;
using BLL.Command;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

using BLL.CachedData;
using System.Collections.Generic;
using System.Linq;
using WebApi.ViewModels;
using AutoMapper;
using Helpers.Extensions;


using OpenIddict.Validation;
using Microsoft.AspNetCore.Authorization;
namespace WebApi.Controllers
{
    // [Authorize(AuthenticationSchemes = OpenIddictValidationDefaults.AuthenticationScheme)]
    //[Authorize(Authorization.Policies.ComponentCodeAllPolicy)]
    [Route("api/[controller]")]
    //[Authorize]
    [ApiController]
    public class CommonController: ControllerBase
    {
        private BizLogic _bizLogic;
        private FiltersCache _filterCache;
       
        public CommonController(
            BizLogic bizLogic,
            FiltersCache filtersCache){
            _bizLogic = bizLogic;
            _filterCache = filtersCache;

        }
        [HttpGet("dm-filters")]
        public IActionResult GetFilters()
        {
        //    return Ok(_filterCache.FiltersCached);
           return null;
        }

        // [HttpGet("dm-study-icon-numbers")]
        // public IActionResult GetDmStudyIconNumbers()
        // {var iconNumbers = _bizLogic.TblStudyQuery.GetDmStudyIconNumbers();
        //    return Ok(iconNumbers);
        // }

        // [HttpGet("dm-icon-number-sponsor-filters")]
        // public IActionResult GetDmStudyIconNumbersAndSponsors()
        // {
        //     var iconNumbers = _bizLogic.CommonQuery.GetIconNumberSponsorDropDownFilters();
        //    return Ok(iconNumbers);
        // }


        // [HttpGet("user-study-resources/{userId}")]
        // public IActionResult UserStudyResources(int userId)
        // {
        //     var recs = _bizLogic.CommonQuery.GetUserStudyResources(userId);
        //    return Ok(recs);
        // }

         [HttpGet("user-roles/{userId}")]
        public IActionResult UserRoles(int userId)
        {
            var recs = _bizLogic.CommonQuery.GetUserRoles(userId);
           return Ok(recs);
        }

        
        
        
        

       
    }
}