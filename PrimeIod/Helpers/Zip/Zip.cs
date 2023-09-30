using System.Collections.Generic;
using System.IO.Compression;
using System.IO;
using System.Threading.Tasks;


namespace Helpers.Zip
{
    public class Zipper
    {
        
        public Zipper(
            
            ){
        }

        

        public async Task<byte[]> GetZipBytes(string fileName, byte[] bytes){
            await Task.CompletedTask;

            using (var memoryStream = new MemoryStream()) {
                // note "leaveOpen" true, to not dispose memoryStream too early
                using (var zipArchive = new ZipArchive(memoryStream, ZipArchiveMode.Create, leaveOpen: true)) {
                    var zipEntry = zipArchive.CreateEntry(fileName);
                    using (Stream entryStream = zipEntry.Open()) {
                        entryStream.Write(bytes, 0, bytes.Length);
                    }                    
                }
                // now, after zipArchive is disposed - all is written to memory stream
                // zipBytes = memoryStream.ToArray();
                return memoryStream.ToArray();

            }

            // return null;
        }
        
        public byte[] GetZipArchive(List<InMemoryFile> files)
        {
            byte[] archiveFile;
            using (var archiveStream = new MemoryStream())
            {
                using (var archive = new ZipArchive(archiveStream, ZipArchiveMode.Create, true))
                {
                    foreach (var file in files)
                    {
                        var zipArchiveEntry = archive.CreateEntry(file.FileName, CompressionLevel.Fastest);

                        using var zipStream = zipArchiveEntry.Open();
                        zipStream.Write(file.Content, 0, file.Content.Length);
                    }
                }

                archiveFile = archiveStream.ToArray();
            }

            return archiveFile;
        }
        
        
        

    }

    
}