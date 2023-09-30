// =============================
// claritytechnologies
// Tallify
// =============================

using System;
using System.Collections.Generic;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Reflection;

namespace Services.EMail
{
    public class EmailTemplates
    {
        // static IWebHostEnvironment _hostingEnvironment;
        static string testEmailTemplate;
        static string plainTextTestEmailTemplate;


        // public static void Initialize(IWebHostEnvironment hostingEnvironment)
        // {
        //     _hostingEnvironment = hostingEnvironment;
        // }
        string _templateFolder;
        public EmailTemplates(string templateFolder){
            _templateFolder = templateFolder;
        }

        
        public string TemplateText(string TemplateName, Dictionary<string, string> TemplateValues){
            var path = _templateFolder + "\\" + TemplateName;
            var templateText = ReadPhysicalFile(path);
            var convertedText = Convert(templateText, TemplateValues);
            return convertedText;
        }
        
        // public string TemplateText<T>(string TemplateName, T Values){
        //     var path = _templateFolder + "\\" + TemplateName;
        //     var templateText = ReadPhysicalFile(path);
        //     var convertedText = Convert<T>(templateText, Values);
            
        //     return convertedText;
        // }
        
        public string Convert(string text,  Dictionary<string, string> TemplateValues){
            var retValue = text;
            foreach(var val in TemplateValues){
                var key = "{" + val.Key + "}";
                retValue = retValue.Replace(key, val.Value);
            }
            return retValue;
        }
        // public string Convert<T>(string text, T Values){
        //     var replacedText = "";
        //     PropertyInfo[] properties = typeof(T).GetProperties();
        //     try
        //     {
        //         foreach (PropertyInfo property in properties)
        //         {
        //             var name = property.Name;
        //             name = "{" + name + "}";
        //             // property.SetValue(record, value);
        //             var value = property.GetValue(Values)?.ToString();
        //             text = text.Replace(name, value);
        //         }
        //     }
        //     catch (System.Exception ex)
        //     {
        //         var xyz = ex.Message;
        //         throw;
        //     }
            
            
                        
        //     return text;
        // }
        
        // public static string GetTestEmail(string recepientName, DateTime testDate)
        // {
        //     if (testEmailTemplate == null)
        //         testEmailTemplate = ReadPhysicalFile("Helpers/Templates/TestEmail.template");


        //     string emailMessage = testEmailTemplate
        //         .Replace("{user}", recepientName)
        //         .Replace("{testDate}", testDate.ToString());

        //     return emailMessage;
        // }



        // public static string GetPlainTextTestEmail(DateTime date)
        // {
        //     if (plainTextTestEmailTemplate == null)
        //         plainTextTestEmailTemplate = ReadPhysicalFile("Helpers/Templates/PlainTextTestEmail.template");


        //     string emailMessage = plainTextTestEmailTemplate
        //         .Replace("{date}", date.ToString());

        //     return emailMessage;
        // }




        private  string ReadPhysicalFile(string path)
        {
            
            // IFileInfo fileInfo = _hostingEnvironment.ContentRootFileProvider.GetFileInfo(path);
            var fileInfo = new FileInfo(path);

            if (!fileInfo.Exists)
                throw new FileNotFoundException($"Template file located at \"{path}\" was not found");
            
            return File.ReadAllText(path);
        }
    }
}
