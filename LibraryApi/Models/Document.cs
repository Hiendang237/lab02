using System.ComponentModel.DataAnnotations;

namespace LibraryApi.Models;

public class Document
{
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Author { get; set; } = string.Empty;

    public int PublicationYear { get; set; }

    public string Description { get; set; } = string.Empty;
}