using System.ComponentModel.DataAnnotations;

namespace DataDisplayAPI.DTOs
{
    public class UserForLoginDto
    {
        [Required]
        public string Login { get; set; }
        [Required]
        [StringLength(64, MinimumLength = 6, ErrorMessage = "Password needs to be between 6 and 64 characters")]
        public string Password { get; set; }
    }
}