using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class List
    {
    [Key]
    public long Id { get; set; }

    [Required]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    [Required]
    [DefaultValue(false)]
    public bool IsCompleted { get; set; } = false;

    [Required]
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}