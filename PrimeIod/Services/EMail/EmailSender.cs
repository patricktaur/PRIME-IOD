// =============================
// claritytechnologies
// Tallify
// =============================

using MailKit.Net.Smtp;
using MimeKit;
using System;
using System.IO;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.Security.Cryptography.X509Certificates;
using System.Net.Security;
using Microsoft.Extensions.Options;
using System.Linq;


namespace Services.EMail
{
    public interface IEmailSender
    {
         Task<(bool success, string errorMsg)> SendEmailAsync(MailboxAddress sender, MailboxAddress[] recepients, MailboxAddress[] ccs, string subject, string body, SmtpConfig config = null, bool isHtml = true);
         Task<(bool success, string errorMsg)> SendEmailAsync(string recepientName, string recepientEmail, string ccName, string ccEmail, string subject, string body, SmtpConfig config = null, bool isHtml = true);
         Task<(bool success, string errorMsg)> SendEmailAsync(string senderName, string senderEmail, string recepientName, string recepientEmail, string ccName, string ccEmail, string subject, string body, SmtpConfig config = null, bool isHtml = true);
         Task<(bool success, string errorMsg)> EmailsSendAsync(string rootPath, List<EmailItem> emails);
        EmailItem BuildEMail(List<MailboxAddress> recepients, List<MailboxAddress> ccs, string templateFolder, string templateName, Dictionary<string, string> templateValues);
        
        EmailItem BuildEMail(List<MailboxAddress> recepients, string templateFolder, string templateName, Dictionary<string, string> templateValues);

        
       
        
    // 
    
    }



    public class EmailSender : IEmailSender
    {
        readonly SmtpConfig _smtpConfig;

        readonly EmailConfig _emailConfig;
        readonly ILogger _logger;

        readonly EmailTemplates _emailTemplates;


        public EmailSender(IOptions<AppSettings> config, ILogger<EmailSender> logger, EmailTemplates emailTemplates)
        {
            _smtpConfig = config.Value.SmtpConfig;
            _emailConfig = config.Value.EMailConfig;
            _logger = logger;
            _emailTemplates = emailTemplates;
        }

        public async Task<(bool success, string errorMsg)> EmailsSendAsync(string rootPath, List<EmailItem> emails)
        {
            if (emails.Count == 0){
                return (false, "Emails count is 0");
            }
            
            var errorMsg = "";
            var redirectedTo = "";
            var mailSuccessCount = 0;
            var from = new MailboxAddress(_smtpConfig.Name, _smtpConfig.EmailAddress);
            //Validation:
            var redirectMailBoxAddresses = new List<MailboxAddress>();
            if (_emailConfig.EMailEnabled){
                if (_emailConfig.Redirect){
                    var redirectEMailIds = _emailConfig.RedirectEMailIds;
                    if (redirectEMailIds.Length == 0){
                        return (false, "EMail redirect failed. Config does not contain email ids");
                    }
                    redirectMailBoxAddresses = ConvertEMailIdsToMailBoxAddesses(redirectEMailIds);
                        // email.MailboxAddresses = new  MailboxAddress[] {new MailboxAddress("Redirected", _emailConfig.RedirectEMailIds) };
                    if (redirectMailBoxAddresses.Count == 0){
                        return (false, "EMail redirect failed. Config does not contain valid email ids");
                    }
                    var plusX = redirectMailBoxAddresses.Count > 1 ? String.Format(" + {0}", redirectMailBoxAddresses.Count-1) : "";
                    redirectedTo = redirectMailBoxAddresses[0].Address +  plusX + ". ";
                }   
            }


            foreach(EmailItem email in emails){

                if ( _emailConfig.EMailEnabled){
                    //SaveEMail called before altering the email ids for redirct.
                    if (_emailConfig.WriteToFile){
                        var fileToSave = rootPath + "\\" + _emailConfig.WriteToFileName;
                        //{Date}
                        fileToSave = fileToSave.Replace("{Date}", DateTime.Now.ToString("ddMMMyyyy"));
                        SaveEMail(fileToSave, email);
                    }

                    if (_emailConfig.Redirect){
                        email.MailboxAddresses = redirectMailBoxAddresses.ToArray();
                        email.CCmailboxAddresses = new MailboxAddress[0]; //clear cc addresses from email
                        // Array.Clear(email.CCmailboxAddresses, 0, email.CCmailboxAddresses.Length);
                    } 
                    
                    try
                    {
                        await SendEmailAsync(from, email.MailboxAddresses, email.CCmailboxAddresses, email.Subject, email.Body);
                        mailSuccessCount +=1;
                    }
                    catch (System.Exception ex)
                    {
                        _logger.LogCritical(ex.Message);
                        throw;
                    }
                }

                
            
            }
            //_emailConfig.EMailEnabled){
                    // if (_emailConfig.Redirect)
             var plural = emails.Count > 1 ? "s" : "";
             if (_emailConfig.EMailEnabled == false && emails.Count > 0){
                errorMsg = !_emailConfig.EMailEnabled ? String.Format("Emails disabled. {0} email{1} not sent.",emails.Count, plural) : "";
             }else{
                if (_emailConfig.Redirect == true){
                    errorMsg = _emailConfig.EMailEnabled ? "Emails redirected to " + redirectedTo : ". ";
                }
                
                if (emails.Count == mailSuccessCount){
                    errorMsg = errorMsg + String.Format("{0} email{1} sent. ", emails.Count, plural);
                }else{
                    errorMsg = errorMsg + String.Format("{0}/{1} email{2} sent. ", mailSuccessCount, emails.Count, plural);
                }
             }
            

             return (true, errorMsg);  

        }
        public async Task<(bool success, string errorMsg)> SendEmailAsync(
            string recepientName,
            string recepientEmail,
            string ccName,
            string ccEmail,
            string subject,
            string body,
            SmtpConfig config = null,
            bool isHtml = true)
        {
            var from = new MailboxAddress(_smtpConfig.Name, _smtpConfig.EmailAddress);
            var to = new MailboxAddress(recepientName, recepientEmail);
            var cc = new MailboxAddress(ccName, ccEmail);
            return await SendEmailAsync(from, new MailboxAddress[] { to },  new MailboxAddress[] { cc },subject, body, config, isHtml);
        }



        public async Task<(bool success, string errorMsg)> SendEmailAsync(
            string senderName,
            string senderEmail,
            string recepientName,
            string recepientEmail,
            string ccName,
            string cctEmail,
            string subject,
            string body,
            SmtpConfig config = null,
            bool isHtml = true)
        {
            var from = new MailboxAddress(senderName, senderEmail);
            var to = new MailboxAddress(recepientName, recepientEmail);
            var cc = new MailboxAddress(ccName, cctEmail);

            return await SendEmailAsync(from, new MailboxAddress[] { to }, new MailboxAddress[] { cc }, subject, body, config, isHtml);
        }



        public async Task<(bool success, string errorMsg)> SendEmailAsync(
            MailboxAddress sender,
            MailboxAddress[] recepients,
            MailboxAddress[] cc,
            string subject,
            string body,
            SmtpConfig config = null,
            bool isHtml = true)
        {
            MimeMessage message = new MimeMessage();

            message.From.Add(sender);
            message.To.AddRange(recepients);
            if (cc != null && cc.Length > 0){
                message.Cc.AddRange(cc);
            }
            
            message.Subject = subject;
            message.Body = isHtml ? new BodyBuilder { HtmlBody = body }.ToMessageBody() : new TextPart("plain") { Text = body };

            try
            {
                if (config == null)
                    config = _smtpConfig;

                using (var client = new SmtpClient())
                {
                    
                    //Not required for Icon:
                    // if (!config.UseSSL)
                    //     client.ServerCertificateValidationCallback = (object sender2, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors) => true;

                    await client.ConnectAsync(config.Host, config.Port, config.UseSSL);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    
                  
                    if (!string.IsNullOrWhiteSpace(config.Username) && config.Authenticate)
                        await client.AuthenticateAsync(config.Username, config.Password);

                    await client.SendAsync(message);

                    await client.DisconnectAsync(true);

                }

                return (true, null);
            }
            catch (Exception ex)
            {
                _logger.LogError(LoggingEvents.SEND_EMAIL, ex, "An error occurred whilst sending email");
                return (false, ex.Message);
            }
        }


        

        public EmailItem BuildEMail(List<MailboxAddress> recepients, string templateFolder, string templateName, Dictionary<string, string> templateValues){
            var email = new EmailItem();
            email.MailboxAddresses = recepients.ToArray();
            var templatePathAndName = templateFolder + "\\" + templateName;
            var templateText = _emailTemplates.TemplateText(templatePathAndName, templateValues);            
            var subject =  templateText.Split(new [] { '\r', '\n' }).FirstOrDefault();

            var body = templateText.Replace(subject, "");
            email.Subject = subject.Replace("Subject:", "").Trim();
            email.Body = body;

            email.TemplateFolder = templateFolder;
            email.TemplateName = templateName;
           
            return email;

        }

        public EmailItem BuildEMail(List<MailboxAddress> recepients, List<MailboxAddress> ccs, string templateFolder, string templateName, Dictionary<string, string> templateValues){
            var email = new EmailItem();
            email.MailboxAddresses = recepients.ToArray();
            email.CCmailboxAddresses = ccs.ToArray();
            var templatePathAndName = templateFolder + "\\" + templateName;
            var templateText = _emailTemplates.TemplateText(templatePathAndName, templateValues);            
            var subject =  templateText.Split(new [] { '\r', '\n' }).FirstOrDefault();

            var body = templateText.Replace(subject, "");
            email.Subject = subject.Replace("Subject:", "").Trim();
            email.Body = body;

            email.TemplateFolder = templateFolder;
            email.TemplateName = templateName;

           
            return email;

        }

        

        public void SaveEMail(string fileName, EmailItem email){
            var emailAddresses = String.Join(" / ", email.MailboxAddresses.Select(x => String.Format("{0} ({1})", x.Name, x.Address))); 
            var ccAddressess = "";
            if (email.CCmailboxAddresses != null){
                ccAddressess = String.Join(" / ", email.CCmailboxAddresses.Select(x => String.Format("{0} ({1})", x.Name, x.Address))); 
            }
            var redirectEMailIds = "";
            if (_emailConfig.RedirectEMailIds != null){
                redirectEMailIds = String.Join(" / ", _emailConfig.RedirectEMailIds.Select(x => String.Format("{0}", x))); 
            }

            var lineBreak = "</br>";
            var emailContent = "";
            emailContent += "EMail Generated on " + DateTime.Now + lineBreak;
            emailContent += "=====================================" + lineBreak;
             emailContent += "EMail Config"  + lineBreak;
            emailContent += "EMail Enabled:"  + _emailConfig.EMailEnabled  + lineBreak;
            emailContent += "Redirect:"  + _emailConfig.Redirect  + lineBreak;
            emailContent += "Redirect EMail Ids:"  + redirectEMailIds  + lineBreak;
            emailContent += "Template Folder Root:"  + _emailConfig.TemplateFolder  + lineBreak;
            emailContent += "Template Folder:"  + email.TemplateFolder  + lineBreak;
            emailContent += "Template:"  + email.TemplateName  + lineBreak;

            emailContent += "--------------------------------------" + lineBreak;
            emailContent += "To:"  + lineBreak;
            emailContent += emailAddresses + lineBreak;
            emailContent += lineBreak;

            emailContent += "cc:"  + lineBreak;
            emailContent += ccAddressess  + lineBreak;
            emailContent += lineBreak;

            emailContent += String.Format("Subject:{0}" , email.Subject) + lineBreak;
            emailContent += lineBreak;
            emailContent +="Content:" + lineBreak ;
            emailContent += email.Body;
            emailContent += lineBreak; 
            emailContent += lineBreak; //last line
            string dirPath = Path.GetDirectoryName(fileName);

            if (!Directory.Exists(dirPath))
                Directory.CreateDirectory(dirPath);

            using (StreamWriter writer = File.AppendText(fileName))
            {
                writer.WriteLine(emailContent);
            }
        } 

        public List<MailboxAddress> ConvertEMailIdsToMailBoxAddesses(string[] emailIds){
            var retList  = new List<MailboxAddress>();
            foreach(var emailId in emailIds){
                if (IsEMailValid(emailId)){
                    retList.Add(new MailboxAddress(emailId));
                }
            }
            return retList;
        }

        
        public bool IsEMailValid(string emailaddress)
        {
            try
            {
                MailboxAddress m = new MailboxAddress(emailaddress);

                return true;
            }
            catch (FormatException)
            {
                return false;
            }
}

    }
}
