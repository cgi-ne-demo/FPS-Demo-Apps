using DemoApp.AppHost;

var builder = DistributedApplication.CreateBuilder(args);

builder.AddForwardedHeaders();

// Integrations
// To use a dynamically created, conteinerized instance of PostgreSQL, uncomment lines below. Note that this DB will need to be seeded manually.
// When the below lines are commented-out, the connection string from appsettings.json file will be used, which could be a local or cloud instance.
//var postgres = builder.AddPostgres("postgres");
//var contactsDb = postgres.AddDatabase("contactsdb");

// Services
var familyApi = builder.AddProject<Projects.Family_API>("family-api")
    .WithExternalHttpEndpoints();

// Apps
builder.AddNpmApp("webfrontend", "../WebApp")
    .WithReference(familyApi)
    .WithHttpEndpoint(port: 4200, env: "PORT")
    .WithExternalHttpEndpoints()
    .PublishAsDockerFile();

builder.Build().Run();
