using LibraryApi.Data;
using LibraryApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DocumentsController : ControllerBase
{
    private readonly LibraryDbContext _context;

    public DocumentsController(LibraryDbContext context)
    {
        _context = context;
    }

    // GET: Get all documents
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Document>>> GetAll()
    {
        return await _context.Documents.ToListAsync();
    }

    // GET: Get document by ID
    [HttpGet("{id}")]
    public async Task<ActionResult<Document>> GetById(int id)
    {
        var document = await _context.Documents.FindAsync(id);

        if (document == null)
            return NotFound();

        return Ok(document);
    }

    // POST: Create new document
    [HttpPost]
    public async Task<ActionResult<Document>> Create(Document document)
    {
        document.Id = 0;
        _context.Documents.Add(document);

        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetById),
            new { id = document.Id },
            document
        );
    }

    // PUT: Update document
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Document input)
    {
        var document = await _context.Documents.FindAsync(id);

        if (document == null)
            return NotFound();

        document.Title = input.Title;
        document.Author = input.Author;
        document.PublicationYear = input.PublicationYear;
        document.Description = input.Description;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: Delete document
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var document = await _context.Documents.FindAsync(id);

        if (document == null)
            return NotFound();

        _context.Documents.Remove(document);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}