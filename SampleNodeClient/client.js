//var PROTO_PATH = __dirname + '/../../protos/helloworld.proto';
var PROTO_PATH = __dirname + '/helloworld.proto';


var parseArgs = require('minimist');
var grpc = require('@grpc/grpc-js');
var grpc_xds = require('@grpc/grpc-js-xds');
grpc_xds.register();

var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).CSharpServerGenerated;

function main() {
  console.log(PROTO_PATH);
  var argv = parseArgs(process.argv.slice(2), {
    string: 'target'
  });
  var target;
  if (argv.target) {
    target = argv.target;
  } else {
    target = 'localhost:50051';
  }
  
  //var client = new hello_proto.GreetingService(target,grpc.credentials.createInsecure());
  var client = new hello_proto.helloAkash(target,grpc.credentials.createInsecure());
  
  

  var myRequest = {name:"Akash"};


  //client.greeting({Name: user}, function(err, response) 
  client.SayHello(myRequest, function(err, response)
  {
    if (err) throw err;
    console.log('Response From Server :', response.message);
    client.close();
  });
}

main();