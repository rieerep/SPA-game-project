using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SPAGame.Data;
using SPAGame.Models;
using System.Security.Claims;

namespace SPAGame.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProfileController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProfileController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/profile/
        [HttpGet]
        public ProfileViewModel Get()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                throw new ArgumentNullException("userId");
            }

            var result = _context.Users
                .Where(u => u.Id == userId)
                .Select(u => new ProfileViewModel()
                {
                    GamerTag = u.GamerTag,
                    Wins = u.Wins,
                    GamesPlayed = u.GamesPlayed,
                    Draws = u.Draws,
                    Losses = u.Losses
                })
                .Single();

            //var result = "Helloooo";

            //Console.WriteLine(result);

            return result;

        }

        //public GameViewModel Get() 
        //{
        //    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        //    if (userId == null)
        //    {
        //        throw new ArgumentNullException("userId");
        //    }
        //    var result = _context.Games.Where(u => u.UserId == userId, u.wins == true)
        //        .Select(u => new GameViewModel()
        //        {
        //            GamerTag = u.GamerTag,
        //            Wins = u.Wins,
        //            Draws = u.Draws,
        //            Losses = u.Losses
        //        });
        //}
        //[HttpPost]
        //public ProfileViewModel Post()
        //{
        //    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        //    if (userId == null)
        //    {
        //        throw new ArgumentNullException("userId");
        //    }


        //}
    }
}
