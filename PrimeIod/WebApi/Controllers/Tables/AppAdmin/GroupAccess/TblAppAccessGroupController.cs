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
using WebApi.Authorization;
namespace WebApi.Controllers
{
    // [Authorize(AuthenticationSchemes = OpenIddictValidationDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class TblAppAccessGroupController : ControllerBase {
        private BizLogic _bizLogic;
        private IMapper _mapper;

        private LoggedInUser _loggedInUser;

        private UserRolePermissionsDTO _loggedInUserDto;

        public TblAppAccessGroupController (
            BizLogic bizLogic, 
            IMapper mapper,
            IHttpContextAccessor httpAccessor,
            LoggedInUser loggedInUser ) {

            _loggedInUser = loggedInUser;
            var enterpriseId = httpAccessor.HttpContext?.User?.Identity?.Name + "";
            _loggedInUserDto = _loggedInUser.GetLoggedInUserDto(enterpriseId);
    
            _bizLogic = bizLogic;
            _mapper = mapper;
        } 
        
        // [Authorize (Authorization.Policies.TblStudyTimelineInterimLocksViewPolicy)]
        
        [HttpGet("records")]
        public IActionResult List () {
             return Ok (_bizLogic.TblAppAccessGroup_Query.GetList());
        }
       
       [HttpGet("new")]
        public IActionResult New (int studyId) {
            
             return Ok (_bizLogic.TblAppAccessGroupCommands.GetRecordNew(studyId));
        }
       
        // [Authorize (Authorization.Policies.TblStudyTimelineInterimLocksViewPolicy)]
       [HttpGet("edit/{recId}")]
        public IActionResult Edit (int recId) {
            
             return Ok (_bizLogic.TblAppAccessGroupCommands.GetRecordForEdit(recId));
        }


        
        // [Authorize (Authorization.Policies.TblStudyTimelineInterimLocksViewPolicy)]
        [HttpGet ("{id}")]
        public IActionResult GetById (int id) {
            
            var record = _bizLogic.TblAppAccessGroup_Query.GetById (id);

            //use Automapper to flatten if required:
            //var tblstudytimelineinterimlocksView = Mapper.Map<TblStudyTimelineInterimLocksViewModel> (tblstudytimelineinterimlocks);

            return Ok (record);

        }

        
        
         [HttpPut ("add-or-update")]
        public IActionResult AddOrUpdate ([FromBody] TblAppAccessGroup tblstudyissuetrackerViewModel) {
            // var tblstudyissuetracker = _mapper.Map<TblAppAccessGroup> (tblstudyissuetrackerViewModel);
            _bizLogic.TblAppAccessGroupCommands.AddOrUpdate(tblstudyissuetrackerViewModel);
            _bizLogic.SaveChanges (_loggedInUserDto.UserId);
            
            return Ok ();
        }

        // [Authorize(Authorization.Policies.TblStudyTimelineInterimLocksModifyPolicy)]
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id) {
            try{
            _bizLogic.TblAppAccessGroupCommands.Delete(id);
            
            _bizLogic.SaveChanges();
            return Ok(true);
            }
            catch(Exception ex)
            {
                return Ok(ex.Message);
            }
        }
        
        
        // [HttpGet("users")]
        // public IActionResult GetUsers () {
        //      return Ok (_bizLogic.TblUserQuery.getAllUsers());
        // }



    }
}