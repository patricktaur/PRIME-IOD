using System;
using System.Collections.Generic;
using MailKit.Net.Smtp;
using MailKit;
using MimeKit;


namespace Services.EMail
{
    
    public class EmailItem 
    {
       public MailboxAddress[] MailboxAddresses { get; set; }

       public MailboxAddress[] CCmailboxAddresses { get; set; }
       public string Subject { get; set; }
       public string Body { get; set; }

       public string TemplateFolder { get; set; }
       public string TemplateName { get; set; }

    }
}
