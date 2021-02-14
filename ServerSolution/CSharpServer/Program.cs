using CSharpServerGenerated;
using Grpc.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSharpServer
{
    class Program
    {
        const string Host = "localhost";
        const int Port = 50051;
        static void Main(string[] args)
        {
            // Build a server
            var server = new Server
            {
                Services = { helloAkash.BindService(new HelloServiceImpl()) },
                Ports = { new ServerPort(Host, Port, ServerCredentials.Insecure) }
            };

            // Start server
            server.Start();

            Console.WriteLine("HelloServer listening on port " + Port);
            Console.WriteLine("Press any key to stop the server...");
            Console.ReadKey();

            server.ShutdownAsync().Wait();
        }
    }
}
