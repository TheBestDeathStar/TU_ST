﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webAPI.DTOs.Request
{
    public class UserRegisterRequest
    {
        [StringLength(20, MinimumLength = 3, ErrorMessage = "Username must be between 3 and 20 characters.")]
        public string? Username { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public string? Email { get; set; }

        [StringLength(50, MinimumLength = 6, ErrorMessage = "Password must be between 6 and 50 characters.")]
        [Compare("ConfirmPassword", ErrorMessage = "Passwords do not match.")]
        public string? Password { get; set; }

        [NotMapped]
        public string? ConfirmPassword { get; set; }

        [Range(18, 99, ErrorMessage = "Age must be between 19 and 99.")]
        public int Age { get; set; }

        [Range(100, 250, ErrorMessage = "Height must be between 100 and 250.")]
        public int Height { get; set; }
    }
}
