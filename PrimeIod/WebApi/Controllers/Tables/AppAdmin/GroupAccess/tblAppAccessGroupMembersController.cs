using System;
using System.Collections.Generic;
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
    public class tblAppAccessGroupMembersController : ControllerBase {
        private BizLogic _bizLogic;
        private IMapper _mapper;

        private LoggedInUser _loggedInUser;

        private UserNRolesDTO _loggedInUserDto;

        public tblAppAccessGroupMembersController (
            BizLogic bizLogic, IMapper mapper,
            IHttpContextAccessor httpAccessor,
            LoggedInUser loggedInUser ) {

              _loggedInUser = loggedInUser;
            var enterpriseId = httpAccessor.HttpContext?.User?.Identity?.Name + "";
            _loggedInUserDto = _loggedInUser.GetLoggedInUserDto(enterpriseId);
       
            _bizLogic = bizLogic;
            _mapper = mapper;
        }
        // [Authorize (Authorization.Policies.TblStudyTimelineInterimLocksViewPolicy)]
        
        [HttpGet("records/{studyId}")]
        public IActionResult List (int studyId) {
             return Ok (_bizLogic.tblAppAccessGroupMembers_Query.GetList(studyId));
        }
       
       [HttpGet("new/{studyId}")]
        public IActionResult New (int studyId) {
            
             return Ok (_bizLogic.tblAppAccessGroupMembersCommands.GetRecordNew(studyId));
        }
       
        // [Authorize (Authorization.Policies.TblStudyTimelineInterimLocksViewPolicy)]
       [HttpGet("get-group-members/{groupId}")]
        public IActionResult GetGroupMembers (int groupId) {
            
             return Ok (_bizLogic.tblAppAccessGroupMembersCommands.GetGroupMembers(groupId));
        }


        
        // [Authorize (Authorization.Policies.TblStudyTimelineInterimLocksViewPolicy)]
        [HttpGet ("{id}")]
        public IActionResult GetById (int id) {
            
            var record = _bizLogic.tblAppAccessGroupMembers_Query.GetById (id);

            //use Automapper to flatten if required:
            //var tblstudytimelineinterimlocksView = Mapper.Map<TblStudyTimelineInterimLocksViewModel> (tblstudytimelineinterimlocks);

            return Ok (record);

        }

        
        
         [HttpPut ("update-group-members/{groupId}")]
        public IActionResult UpdateGroupMembers ([FromBody] List<FilterItem>  groupMembers, int groupId) {
            // var tblstudyissuetracker = _mapper.Map<tblAppAccessGroupMembers> (tblstudyissuetrackerViewModel);
            _bizLogic.tblAppAccessGroupMembersCommands.GroupMembersUpdate(_loggedInUserDto.UserId, groupId, groupMembers);
            _bizLogic.SaveChanges ();
            return Ok ();
        }

        // [Authorize(Authorization.Policies.TblStudyTimelineInterimLocksModifyPolicy)]
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id) {
            try{
            _bizLogic.tblAppAccessGroupMembersCommands.Delete(id);
            
            _bizLogic.SaveChanges();
            return Ok(true);
            }
            catch(Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [HttpGet("users")]
        public IActionResult GetUsers () {
            //  return Ok (_bizLogic.TblUserQuery.getAllUsers());
             return Ok();
        }

    }
}