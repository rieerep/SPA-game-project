﻿using Microsoft.AspNetCore.Identity;

#nullable disable

namespace SPAGame.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string GamerTag { get; set; }

        public int Wins { get; set; }

        public int Draws { get; set; }

        public int Losses { get; set; }

        public int GamesPlayed { get; set; }
        public virtual GameModel Game { get; set; }

        //En sträng med X, O eller tomt
    }
}