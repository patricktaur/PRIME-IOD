using System;
using System.IO;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using BLL;
using System.Linq;

namespace WebApi.Controllers
{
    // [Authorize(AuthenticationSchemes = OpenIddictValidationDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class ErrorLogsController : ControllerBase {
        private BizLogic _bizLogic;
        public ErrorLogsController (BizLogic bizLogic) {
            _bizLogic = bizLogic;
        }
        // [Authorize (Authorization.Policies.TblStudyTimelineInterimLocksViewPolicy)]
        
        [HttpGet("records")]
        public IActionResult GetRecords () {
            string folderPath = "Logs";
            DateTime fromDate = DateTime.Now.AddDays(-5); // Calculate the date 5 days ago

            try
            {
                string[] logFiles = Directory.GetFiles(folderPath, "ex_*.log")
                    // .Where(file => new FileInfo(file).CreationTime >= fromDate)
                    .OrderByDescending(file => new FileInfo(file).CreationTime)
                    .Take(100)
                    .ToArray();

                var fileContents = _bizLogic.errorLogs_Query.GetList(logFiles);

                return Ok(fileContents);
            }
            catch (Exception e)
            {
                Console.WriteLine("An error occurred while reading the log files: " + e.Message);
                return Ok();
            }
        }

        [HttpGet("file")]
        public IActionResult GetLogFile(string name)
        {
            var fileName = "ex_" + name + ".log";

            var folder = "Logs";
            var filePath = System.IO.Path.Combine(folder, fileName);
            string tempDownloadPath = System.IO.Path.Combine(folder, fileName);

            if(!System.IO.File.Exists(filePath)){
              return BadRequest("File Not Found");
            }

            if(DateTime.Now.ToString("yyyyMMdd") == name) {
                tempDownloadPath = System.IO.Path.Combine(folder, "ex_" + name + "-temp.log");
                System.IO.File.Copy(filePath, tempDownloadPath, true);
            }

            byte[] fileBytes = System.IO.File.ReadAllBytes(tempDownloadPath);

            // response.Content.Headers.ContentRead += (sender, e) =>
            // {
            if(DateTime.Now.ToString("yyyyMMdd") == name) {
                System.IO.File.Delete(tempDownloadPath);
            }

            return File(fileBytes, "text/log", fileName);
        }
    }
}
