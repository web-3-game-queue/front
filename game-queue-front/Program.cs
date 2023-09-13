using game_queue_front.Business;

var builder = WebApplication.CreateBuilder(args);

// builder.Services.AddDbContext<DbContext>(options =>
// 	options.UsePos
// );

// Add services to the container.
builder.Services.AddRazorPages();

builder.Services.AddScoped<MapService>();

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