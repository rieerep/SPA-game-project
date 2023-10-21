using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SPAGame.Data;
using SPAGame.Models;
using System.Security.Claims;

namespace SPAGame.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
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
            var result = _context.Games.Where(u => u.UserId == userId && u.GameOver == !true).FirstOrDefault();
            if (userId == null)
            {
                throw new ArgumentNullException("userId");
            }

            try
            {
                if (result == null)
                {
                    Console.WriteLine("Game not found");
                    return new CheckGameViewModel() { FoundGame = false };
                }
            }
            catch (Exception e) 
            {

                Console.WriteLine("Error message: " + e);
            }
            Console.WriteLine("Game found!!!");
            Console.WriteLine("GameId is: " + result.PublicId);
            return new CheckGameViewModel { FoundGame = true, GameId = result.PublicId };
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


        // PUT: api/game/{gameId}/{gameState}/{userId}
        [HttpPut("{gameId}/{gameState}/{userId}")]
        public IActionResult Put(string gameId, string gameState, string userId)
        {
            var id = _context.Games.Where(u => u.PublicId == gameId).Select(x => x.Id).FirstOrDefault();
            //var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            //if (userId == null)
            //{
            //    throw new ArgumentNullException("userId");
            //}
            _context.Update(new GameModel() { Id = id, PublicId = gameId, GameProgress = gameState, UserId = userId });
            _context.SaveChanges();

            return Ok();
        }
    }
}
