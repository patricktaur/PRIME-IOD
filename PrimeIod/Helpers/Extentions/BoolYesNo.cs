using System;
using System.Collections.Generic;
using System.Text;

namespace Helpers.Extensions
{
    public static class BoolYesNoExtensions
    {

        
        public static string Text(this bool? value){
            if (value.HasValue){
                return value.Value.Text();
            }
            return "";
        }

        public static string Text(this bool value){
            return value ? "Yes" : "No";
        }

        //Todo:
        //Similar to bool text
        public static string ZeroOneYesNo(this int? value){
            if (value.HasValue){
                if (value.Value == 1){
                    return "Yes";
                }
                return "No";
            }
            else
            {
                return " ";
            }
        }
    }
}


