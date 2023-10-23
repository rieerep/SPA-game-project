using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SPAGame.Data;
using SPAGame.Models;

namespace SPAGame.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HighscoreController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        public HighscoreController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]

        public IEnumerable<ProfileViewModel> Get()
        {
            var result = _context.Users.OrderByDescending(u => u.Wins)
                .Select(u => new ProfileViewModel
                {
                    GamerTag = u.GamerTag,
                    Wins = u.Wins
                });

            return result;
        }

    }
}
