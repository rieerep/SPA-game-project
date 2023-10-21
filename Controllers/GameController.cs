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
    public class GameController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        public GameController(ApplicationDbContext context)
        {
            _context = context;
        }


        // GET: api/game/
        [HttpGet]
        public CheckGameViewModel Get()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                throw new ArgumentNullException("userId");
            }
            try
            {
                var result = _context.Games.Where(u => u.UserId == userId  && u.GameOver == !true).FirstOrDefault();
                if (result == null)
                {
                    Console.WriteLine("Null null null");
                    return new CheckGameViewModel() { FoundGame = false };
                }
            }
            catch (Exception e) 
            {

                Console.WriteLine("Error message: " + e);
                return new CheckGameViewModel() { FoundGame = false };
            }

            return new CheckGameViewModel { FoundGame = true };
        }



        // POST: api/game/
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
