using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SPAGame.Data;
using SPAGame.Models;

namespace SPAGame.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GameController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        public GameController(ApplicationDbContext context)
        {
            _context = context;
        }

        //[HttpGet]
        //public GameViewModel Get()
        //{
        //    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        //    if (userId == null)
        //    {
        //        throw new ArgumentNullException("userId");
        //    }
        //    var result = _context.Games
        //}


        // Testkommentar

        //POST: api/game/
        [HttpPost]

        public GameViewModel Post()
        {
            var publicId = Guid.NewGuid().ToString();
            _context.Add(new GameModel() { PublicId = publicId, GameProgress = "", GameOver = false });
            _context.SaveChanges();

            return new GameViewModel { GameId = publicId, GameState = "", GameOver = false };
        }
    }
}
