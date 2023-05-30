using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NavUdayArchitecture.Authorization;
using NavUdayArchitecture.Database;
using NavUdayArchitecture.Database.Models;
using NavUdayArchitecture.Helpers;
using NavUdayArchitecture.Services.Interface;
using NavUdayArchitecture.Services.Services;
using System.Configuration;
using System.Text.Json.Serialization;
using BCryptNet = BCrypt.Net.BCrypt;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DataContext>();
builder.Services.AddCors();
builder.Services.AddControllers().AddJsonOptions(x =>
{
    // serialize enums as strings in api responses (e.g. Role)
    x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

// configure strongly typed settings object
builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

// configure DI for application services
builder.Services.AddScoped<IJwtUtils, JwtUtils>();
builder.Services.AddScoped<IUserService, UserService>();

var app = builder.Build();
Configure(app);


void Configure(WebApplication app)
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseHttpsRedirection();

    // Configure the HTTP request pipeline.
    if (!app.Environment.IsDevelopment())
    {

    }

    //configure services here
    using (var scope = app.Services.CreateScope())
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<DataContext>();
        createTestUsers(dbContext);
    }
    app.UseStaticFiles();
    app.UseRouting();

    // global cors policy
    app.UseCors(x => x
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());

    // global error handler
    app.UseMiddleware<ErrorHandlerMiddleware>();
    // custom jwt auth middleware
    app.UseMiddleware<JwtMiddleware>();

    //app.UseEndpoints(x => x.MapControllers());


    app.MapControllerRoute(
        name: "default",
        pattern: "{controller}/{action=Index}/{id?}");

    app.MapFallbackToFile("index.html"); ;

    app.Run();

}

void createTestUsers(DataContext context)
{
    // add hardcoded test users to db on startup
    var testUsers = new List<User>
            {
                new User { Id = 1, FirstName = "Admin", LastName = "User", Username = "admin", PasswordHash = BCryptNet.HashPassword("admin"), Role = Role.Admin },
                new User { Id = 2, FirstName = "Normal", LastName = "User", Username = "user", PasswordHash = BCryptNet.HashPassword("user"), Role = Role.User }
            };
    context.Users.AddRange(testUsers);
    context.SaveChanges();
}
