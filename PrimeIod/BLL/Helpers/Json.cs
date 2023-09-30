//http://www.albahari.com/nutshell/predicatebuilder.aspx
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text.Json;
namespace BLL.Helpers {
    public class Json {
        public string ToJson<T>(T t){
            
            return "";
        }

        public T FromJson<T>(string jsonText){
            
            if (jsonText == null || jsonText.Length == 0){
                return default(T); // equivalent to null
            }
           
            try
            {
                 return JsonSerializer.Deserialize<T>(jsonText);
            }
            catch (System.Exception )
            {
                // var message = ex.Message;
                // var inner = ex.InnerException.Message;
                return default(T); // equivalent to null
                // throw new Exception("Error:" + message + "-" + inner);
            }
            
           
        }
    }
}