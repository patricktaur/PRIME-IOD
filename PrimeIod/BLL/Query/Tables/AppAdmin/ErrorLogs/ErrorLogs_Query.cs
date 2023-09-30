using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Linq;
using System.Linq.Expressions;
using System.IO;
using BLL.DTOs;

namespace BLL.Query {
    public class ErrorLogs_Query {
        public ErrorLogs_Query () {}

        public List<ErrorLogDTO> GetList(string[] logFiles) {
            // var fileContents = new List<string>();
            var errorLogs = new List<ErrorLogDTO>();

            foreach (string filePath in logFiles)
            {
                // Console.WriteLine("Log File: " + filePath);
                var file = ReadLogFile(filePath);
                var fileContent = file.fileContent;

                if(file.hasError) {
                    continue;
                } else {
                    Regex regex = new Regex(@"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.{0,10}[+-]\d{2}:\d{2} \[ERR]");
                    var matches = regex.Matches(file.fileContent);
                    
                    var dateValue = filePath.Replace("Logs\\ex_", "").Replace(".log", "");
                    // var exceptions = new List<ExceptionDTO>();
                    Console.WriteLine("file contents length = " + fileContent.Count());

                    DateTime result;

                    if (DateTime.TryParseExact(dateValue, "yyyyMMdd", null, System.Globalization.DateTimeStyles.None, out result))
                    {
                        Console.WriteLine("Converted to DateTime: " + result);
                    }
                    else
                    {
                        Console.WriteLine("Invalid date format.");
                    }

                    errorLogs.Add(new ErrorLogDTO{
                        Date = Convert.ToDateTime(result),
                        NumberOfLogs = matches.Count(),
                        FileName = dateValue              
                    });
                }  
            }

            return errorLogs.OrderByDescending(x => x.Date).ToList();
        }

        static (bool hasError, string fileContent) ReadLogFile(string filePath)
        {
            try
            {
                FileStream fileStream = System.IO.File.OpenRead(filePath);
                string fileContent;
                using (StreamReader reader = new StreamReader(fileStream))
                {
                    fileContent = reader.ReadToEnd();
                }

                return (false, fileContent);
            }
            catch (IOException e)
            {
                Console.WriteLine("An error occurred while reading the log file: " + e.Message);
                return (false, "");
            }
        }
    }
}