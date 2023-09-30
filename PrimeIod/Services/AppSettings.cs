// =============================
// claritytechnologies
// Tallify
// =============================

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class AppSettings
    {
        public SmtpConfig SmtpConfig { get; set; }
        public EmailConfig EMailConfig { get; set; }
    }



    public class SmtpConfig
    {
        public string Host { get; set; }
        public int Port { get; set; }
        public bool UseSSL { get; set; }

        public bool Authenticate { get; set; }
        
        public string Name { get; set; }
        public string Username { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
    }

    public class EmailConfig
    {
        public bool EMailEnabled { get; set; }
        public bool WriteToFile { get; set; }
        public string WriteToFileName { get; set; }
        public bool Redirect { get; set; }
        public string[]  RedirectEMailIds { get; set; }
        public string TemplateFolder { get; set; }
  

    }
}

