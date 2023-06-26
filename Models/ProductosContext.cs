using Microsoft.EntityFrameworkCore;

namespace ApiProductos.Models;

public class ProductosContext : DbContext
{
    public ProductosContext(DbContextOptions<ProductosContext> options)
        : base(options)
    {
    }

    public DbSet<ProductosItem> ProductosItem { get; set; } = null!;
}