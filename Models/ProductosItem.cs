namespace ApiProductos.Models;

public class ProductosItem
{
    public long Id { get; set; }
    public string? Nombre { get; set; }
    public string? Precio { get; set; }
    public bool EsNuevo { get; set; }
}