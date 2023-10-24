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

        // GET: api/<ScoreboardDailyController>
        [HttpGet]
        public IEnumerable<DailyHighscoreViewModel> Get()
        {
            var currentDate = DateTime.Today;

            //var query = _context.Games
            //.Where(u => u.Win == true && u.Date.Date == DateTime.Today)
            //.Join(_context.Users,
            //    game => game.UserId,
            //    user => user.Id,
            //    (game, user) => new { Game = game, User = user })
            //    .Select(result => new DailyHighscoreViewModel(){ 
            //        GamerTag = result.User.GamerTag, Win = (bool)result.Game.Win
            //    })
            //    .ToList();

            //for (var i = 0; i < query.Count; i++)
            //{

            //    Console.WriteLine(query[i].GamerTag);
            //    for (var j = 0; j < query[i].Count; j++)
            //    {

            //    }
            //}

            //var countWins = query.Count();

            var query = _context.Games
            .Where(u => u.Win == true && u.Date.Date == DateTime.Today)
            .Join(_context.Users,
            game => game.UserId,
            user => user.Id,
            (game, user) => new { Game = game, User = user })
            .GroupBy(result => result.User.GamerTag)
            .Select(group => new { GamerTag = group.Key, WinCount = group.Count() })
            .ToList();

            List<DailyHighscoreViewModel> DailyHighscoreList = new List<DailyHighscoreViewModel>();

            foreach (var result in query)
            {
                DailyHighscoreList.Add(new DailyHighscoreViewModel
                {
                    GamerTag = result.GamerTag,
                    Win = result.WinCount
                });
                Console.WriteLine($"GamerTag: {result.GamerTag}, Win Count: {result.WinCount}");
            }

            return DailyHighscoreList;
        }
    }
}
