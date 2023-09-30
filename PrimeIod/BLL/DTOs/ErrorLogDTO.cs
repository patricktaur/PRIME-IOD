using System;
using System.Collections.Generic;
namespace BLL.DTOs {
    public class ErrorLogDTO {
        public DateTime Date { get; set; }
        public int NumberOfLogs { get; set; }
        public string FileName { get; set; }
    }
}