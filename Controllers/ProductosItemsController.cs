using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiProductos.Models;

namespace ApiProductos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosItemsController : ControllerBase
    {
        private readonly ProductosContext _context;

        public ProductosItemsController(ProductosContext context)
        {
            _context = context;
        }

        // GET: api/ProductosItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductosItem>>> GetProductosItem()
        {
          if (_context.ProductosItem == null)
          {
              return NotFound();
          }
            return await _context.ProductosItem.ToListAsync();
        }

        // GET: api/ProductosItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductosItem>> GetProductosItem(long id)
        {
          if (_context.ProductosItem == null)
          {
              return NotFound();
          }
            var productosItem = await _context.ProductosItem.FindAsync(id);

            if (productosItem == null)
            {
                return NotFound();
            }

            return productosItem;
        }

        // PUT: api/ProductosItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductosItem(long id, ProductosItem productosItem)
        {
            if (id != productosItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(productosItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductosItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ProductosItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductosItem>> PostProductosItem(ProductosItem productosItem)
        {
          if (_context.ProductosItem == null)
          {
              return Problem("Entity set 'ProductosContext.ProductosItem'  is null.");
          }
            _context.ProductosItem.Add(productosItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductosItem", new { id = productosItem.Id }, productosItem);
        }

        // DELETE: api/ProductosItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductosItem(long id)
        {
            if (_context.ProductosItem == null)
            {
                return NotFound();
            }
            var productosItem = await _context.ProductosItem.FindAsync(id);
            if (productosItem == null)
            {
                return NotFound();
            }

            _context.ProductosItem.Remove(productosItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductosItemExists(long id)
        {
            return (_context.ProductosItem?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
