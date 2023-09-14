using game_queue_front.Business.Maps;
using game_queue_front.Business.Users;
using game_queue_front.Database;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

builder.Services.AddScoped<MapService>();
builder.Services.AddScoped<PasswordHasherService>();

builder.Services.AddDbContext<GameQueueContext>(
    opt => {
        var dbUrl = Environment.GetEnvironmentVariable("DB_GAME_QUEUE_URL");
        opt.UseNpgsql(dbUrl);
    }
);

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment()) {
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.MapRazorPages();

app.Run();