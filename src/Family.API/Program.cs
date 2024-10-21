var builder = WebApplication.CreateBuilder(args);

// Add service defaults & Aspire components.
builder.AddServiceDefaults();
builder.AddNpgsqlDbContext<FpsDemoContext>("demodb");

// Add services to the container.
builder.Services.AddControllers();
// -- Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// -- Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularClientOrigin",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200", "https://fps.cgi-ne-demo.com", "https://d32htyq0jmc867.cloudfront.net/")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});
// -- Add Okta auth services
builder.Services.Configure<DemoApp.AuthLibrary.OktaJwtVerificationOptions>(builder.Configuration.GetSection("OktaAuth"));
builder.Services.AddTransient<DemoApp.AuthLibrary.IJwtValidator, DemoApp.AuthLibrary.OktaJwtValidation>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Apply our CORS policy to this app
app.UseCors("AllowAngularClientOrigin");

app.UseAuthorization();

app.MapDefaultEndpoints();

app.MapControllers();

app.Run();
