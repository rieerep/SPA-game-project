using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SPAGame.Data;
using SPAGame.Models;

namespace SPAGame.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScoreboardDailyController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ScoreboardDailyController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<ScoreboardController>
        [HttpGet]
        public IEnumerable<ScoreboardModel> Get()
        {
            var currentDate = DateTime.Today;

            var result = _context.Scoreboards.Where(s => currentDate.Date == s.Date.Date)
            .OrderByDescending(u => u.Score)
            .Select(u => new ScoreboardModel()
            {
                GamerTag = u.GamerTag,

                Score = u.Score
            });

            return result;
        }
    }
}
