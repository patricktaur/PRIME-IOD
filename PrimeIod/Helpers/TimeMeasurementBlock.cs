using System;
using System.Diagnostics;
namespace Helpers
{
    public class TimeMeasurementBlock : IDisposable
    {

    public Stopwatch Stopwatch { get; private set; }

    public TimeMeasurementBlock(Stopwatch stopwatch)
    {
        Stopwatch = stopwatch;
        if (Stopwatch != null)
            Stopwatch.Start();
    }

    public void Dispose()
    {
        if (Stopwatch != null)
            Stopwatch.Stop();
    } 
    }
}

/* Usage:
        Stopwatch stopwatch = new Stopwatch();
        using (new TimeMeasurementBlock(stopwatch)) {
            var sut = new  VwStudyReportSummary_Query(views);
            var recs = sut.ReportOne();
        }
        var elapsedTime = stopwatch.ElapsedMilliseconds;
*/