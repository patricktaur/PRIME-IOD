using System;
using System.Collections.Generic;
using System.Text;

namespace Helpers.Extensions
{
    public static class DateTimeExtensions
    {
        public static string TimeAgo(this DateTime dateTime)
        {
            string result = string.Empty;
            var timeSpan = DateTime.UtcNow.Subtract(dateTime);

            if (timeSpan <= TimeSpan.FromSeconds(60))
            {
                result = string.Format("{0} seconds ago", timeSpan.Seconds);
            }
            else if (timeSpan <= TimeSpan.FromMinutes(60))
            {
                result = timeSpan.Minutes > 1 ?
                    String.Format("about {0} minutes ago", timeSpan.Minutes) :
                    "about a minute ago";
            }
            else if (timeSpan <= TimeSpan.FromHours(24))
            {
                result = timeSpan.Hours > 1 ?
                    String.Format("about {0} hours ago", timeSpan.Hours) :
                    "about an hour ago";
            }
            else if (timeSpan <= TimeSpan.FromDays(30))
            {
                result = timeSpan.Days > 1 ?
                    String.Format("about {0} days ago", timeSpan.Days) :
                    "yesterday";
            }
            else if (timeSpan <= TimeSpan.FromDays(365))
            {
                result = timeSpan.Days > 30 ?
                    String.Format("about {0} months ago", timeSpan.Days / 30) :
                    "about a month ago";
            }
            else
            {
                result = timeSpan.Days > 365 ?
                    String.Format("about {0} years ago", timeSpan.Days / 365) :
                    "about a year ago";
            }

            return result;
        }



        public static DateTime NextWorkingDay(this DateTime afterDate, int days = 1){
            int workingDaysFound = 0;
            if (days < 1){
                days = 1;
            }
            DateTime testDate = afterDate.AddDays(-1);
            while (workingDaysFound < days) 
            {
                testDate = testDate.AddDays(1);
                if (!(testDate.DayOfWeek == DayOfWeek.Saturday || testDate.DayOfWeek == DayOfWeek.Sunday)){
                    workingDaysFound += 1;
                }
            }
            return testDate;
        }
    }
}
