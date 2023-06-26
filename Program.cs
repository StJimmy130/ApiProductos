using Microsoft.EntityFrameworkCore;
using ApiProductos.Models;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// builder.Services.AddDbContext<ProductosContext>(opt =>
//     opt.UseInMemoryDatabase("ProductosList"));
builder.Services.AddDbContext<ProductosContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("ProductosContext")
    ?? throw new InvalidOperationException("Connection string 'ProductosContext' not found.")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseDefaultFiles();

app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
