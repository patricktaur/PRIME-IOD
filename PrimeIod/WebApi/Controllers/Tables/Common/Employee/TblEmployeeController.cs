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

namespace WebApi.Controllers
{
    // [Authorize(AuthenticationSchemes = OpenIddictValidationDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class TblEmployeeController : ControllerBase {
        private BizLogic _bizLogic;
        private IMapper _mapper;
        public TblEmployeeController (BizLogic bizLogic, IMapper mapper ) {
            _bizLogic = bizLogic;
            _mapper = mapper;
        }
        // [Authorize (Authorization.Policies.TblStudyTimelineInterimLocksViewPolicy)]
        
        [HttpGet("records")]
        public IActionResult List (int studyId) {
             return Ok (_bizLogic.TblEmployee_Query.GetList());
        }
       
       [HttpGet("new")]
        public IActionResult New (int studyId) {
            
             return Ok (_bizLogic.TblEmployeeCommands.GetRecordNew());
        }
       
        // [Authorize (Authorization.Policies.TblStudyTimelineInterimLocksViewPolicy)]
       [HttpGet("edit/{recId}")]
        public IActionResult Edit (int recId) {
            
             return Ok (_bizLogic.TblEmployeeCommands.GetRecordForEdit(recId));
        }


        
        // [Authorize (Authorization.Policies.TblStudyTimelineInterimLocksViewPolicy)]
        [HttpGet ("{id}")]
        public IActionResult GetById (int id) {
            
            var record = _bizLogic.TblEmployee_Query.GetById (id);

            //use Automapper to flatten if required:
            //var tblstudytimelineinterimlocksView = Mapper.Map<TblStudyTimelineInterimLocksViewModel> (tblstudytimelineinterimlocks);

            return Ok (record);

        }

        
        
         [HttpPut ("add-or-update")]
        public IActionResult AddOrUpdate ([FromBody] TblEmployee tblstudyissuetrackerViewModel) {
            // var tblstudyissuetracker = _mapper.Map<TblEmployee> (tblstudyissuetrackerViewModel);
            _bizLogic.TblEmployeeCommands.AddOrUpdate(tblstudyissuetrackerViewModel);
            _bizLogic.SaveChanges ();
            return Ok ();
        }

        // [Authorize(Authorization.Policies.TblStudyTimelineInterimLocksModifyPolicy)]
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id) {
            try{
            _bizLogic.TblEmployeeCommands.Delete(id);
            
            _bizLogic.SaveChanges();
            return Ok(true);
            }
            catch(Exception ex)
            {
                return Ok(ex.Message);
            }
        }
    }
}