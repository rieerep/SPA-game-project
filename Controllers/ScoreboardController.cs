using Microsoft.AspNetCore.Mvc;
using SPAGame.Data;
using SPAGame.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SPAGame.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScoreboardController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ScoreboardController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<ScoreboardController>
        [HttpGet]
        public IEnumerable<ProfileViewModel> Get()
        {
            var result = _context.Users
                .OrderByDescending(u => u.Wins)
                .Select(u => new ProfileViewModel()
                {
                    GamerTag = u.GamerTag,
                    Wins = u.Wins
                });

            return result;
            //return new string[] { "value1", "value2" };
        }
    }
}
