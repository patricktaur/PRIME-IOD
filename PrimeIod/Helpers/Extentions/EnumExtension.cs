using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace Helpers.Extensions
{
    public static class EnumExtensions
    {
        public static Dictionary<int, string> ToDict(this Enum theEnum)
        {
            var enumDict = new Dictionary<int, string>();
            foreach (int enumValue in Enum.GetValues(theEnum.GetType()))
            {
                enumDict.Add(enumValue, enumValue.ToString());
            }

            return enumDict;
        }

        public static List<string> ExpandedList(this Enum theEnum)
        {
            var list = new List<string>();
           foreach (Enum enumValue in Enum.GetValues(theEnum.GetType()))
            {
                list.Add(ExpandName(theEnum, enumValue));
                
            }

            return list;
        }
        public static string ExpandName(this Enum theEnum, Enum Value){
            //var enumText = Enum.GetValues(theEnum.GetType());
            //var x =  Enum.GetName(typeof(theEnum), Value);
            var preserveAcronyms = true;
            var text = Value.ToString();
            if (string.IsNullOrWhiteSpace(text))
           return string.Empty;
            StringBuilder newText = new StringBuilder(text.Length * 2);
            newText.Append(text[0]);
            for (int i = 1; i < text.Length; i++)
            {
                if (char.IsUpper(text[i]))
                    if ((text[i - 1] != ' ' && !char.IsUpper(text[i - 1])) ||
                        (preserveAcronyms && char.IsUpper(text[i - 1]) && 
                        i < text.Length - 1 && !char.IsUpper(text[i + 1])))
                        newText.Append(' ');
                newText.Append(text[i]);
            }
            return newText.ToString();
            
        }

        public static string ExpandName(Enum Value){
            //var enumText = Enum.GetValues(theEnum.GetType());
            //var x =  Enum.GetName(typeof(theEnum), Value);
            var preserveAcronyms = true;
            var text = Value.ToString();
            if (string.IsNullOrWhiteSpace(text))
           return string.Empty;
            StringBuilder newText = new StringBuilder(text.Length * 2);
            newText.Append(text[0]);
            for (int i = 1; i < text.Length; i++)
            {
                if (char.IsUpper(text[i]))
                    if ((text[i - 1] != ' ' && !char.IsUpper(text[i - 1])) ||
                        (preserveAcronyms && char.IsUpper(text[i - 1]) && 
                        i < text.Length - 1 && !char.IsUpper(text[i + 1])))
                        newText.Append(' ');
                newText.Append(text[i]);
            }
            return newText.ToString();            
        }

        public static string GetEnumValues<T>( string commaSeparatedIds){
            commaSeparatedIds = commaSeparatedIds + "";
            if (commaSeparatedIds.Length == 0){
                return "";
            }
            var retValue = "";
            var ids = commaSeparatedIds.Split(',').Select(int.Parse).ToList();
            foreach(int id in ids){
                var enumObj =  (T)(object)id;
                retValue = string.Join(", ",  enumObj.ToString()); 
            }
            
            return retValue;

        }


    /*
    var c = Enum.ParseWithDefault<Example>("D"); (c = Example.A)
    */
        public static T ParseWithDefault<T>(this Enum self, string value, T defaultValue = default(T)) where T : struct
        {
            T res;
            var done = Enum.TryParse(value, true, out res);

            return done ? res : defaultValue;
        }

        //
        //
        //TestEnum? result = test.ToEnum<TestEnum>();
        public static T? ToEnum<T>(this string value)where T : struct
        {
            if (string.IsNullOrEmpty(value)) return default(T);
            T result;
            return Enum.TryParse<T>(value, true, out result) ? result : default(T);
        }    

        //YourEnum foo = (YourEnum)Enum.ToObject(typeof(YourEnum) , yourInt);

         public static T? ToEnum<T>(this int value)where T : struct
        {
            return (T)Enum.ToObject(typeof(T) , value);

        }     

        public static T ToEnum<T>(this int? value, T defaultValue = default(T))where T : struct
        {
            int nonInt = 0;
            if (value.HasValue){
                nonInt = (int) value.Value;
            }else{
                return defaultValue;
            }

            return (T)Enum.ToObject(typeof(T) , nonInt);

        }  

        



    }
}