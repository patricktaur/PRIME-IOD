//new
using System;
namespace Helpers.Extensions
{
    public static class KeyWordExtension
    {
        public static string[] GetWords(this string value)
        {
            string[] keywords = value.Split(new[] { ',', ' ' },
                            StringSplitOptions.RemoveEmptyEntries);
            return keywords;                
        }

    }

    
}