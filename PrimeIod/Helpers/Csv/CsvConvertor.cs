using System;
using System.Data;
using System.Threading.Tasks;
using System.Collections.Generic;

using System.IO;

using CsvHelper;
using CsvHelper.Configuration;
using CsvHelper.TypeConversion;
using Helpers.UIGrid;
namespace Helpers.Csv
{
    public class CsvConvertor
    {
        
        public CsvConvertor(
            
            ){
        }

        

        public  async Task<byte[]> ConvertRecordsToBytesAsync<T,  M>(IEnumerable<T> records) where M : ClassMap<T>
        {
            await Task.CompletedTask;
            return ConvertRecordsToBytes<T, M>(records);
        }
        
        public byte[] ConvertRecordsToBytes<T,  M>(IEnumerable<T> records) where M : ClassMap<T>
        {
            using (var memoryStream = new MemoryStream())
            using (var streamWriter = new StreamWriter(memoryStream))
            using (var csvWriter = new CsvWriter(streamWriter, System.Globalization.CultureInfo.CurrentCulture))
            {
                var options = new TypeConverterOptions { Formats = new[] { "dd-MMM-yyyy" } };
                csvWriter.Context.TypeConverterOptionsCache.AddOptions<DateTime>(options);
                csvWriter.Context.TypeConverterOptionsCache.AddOptions<DateTime?>(options);
                csvWriter.Context.RegisterClassMap<M>();
                
                csvWriter.WriteRecords(records);
                streamWriter.Flush();
                return memoryStream.ToArray();
            }
        }
        

        public byte[]  WriteDataTableToBlob(DataTable dataTable,  bool writeHeaders, UIGridProperties colProperties)
        {
            using (var writer = new MemoryStream())
            using (var streamWriter = new StreamWriter(writer))
            using (var csvWriter = new CsvWriter(streamWriter, System.Globalization.CultureInfo.CurrentCulture))
            {
                
                if (writeHeaders)
                {
                    foreach (var col in colProperties.Columns)
                    {
                        csvWriter.WriteField(col.header);
                    }
                    csvWriter.NextRecord();
                }

                foreach (DataRow row in dataTable.Rows)
                {
                    for (var i = 0; i < dataTable.Columns.Count; i++)
                    {
                        // csvWriter.WriteField(row[i]);
                        // csvWriter.WriteComment(row[i].ToString());
                         csvWriter.WriteField(row[i].ToString());
                    }
                    csvWriter.NextRecord();
                }
                streamWriter.Flush();
                return writer.ToArray();
            }
        }

    }

    
}