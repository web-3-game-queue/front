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
    opt => opt.UseNpgsql(builder.Configuration.GetConnectionString(nameof(GameQueueContext)))
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