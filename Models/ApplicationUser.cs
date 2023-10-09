using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace spa_project.Models
{
    public class ApplicationUser : IdentityUser
    {
        public int Wins { get; set; }

        public int Draws { get; set; }

        public int losses { get; set; }
        public int GamesPlayed { get; set; }
        public virtual GameModel? Game { get; set; }

    }
}