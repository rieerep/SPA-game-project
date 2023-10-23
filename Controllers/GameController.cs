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
            var result = _context.Games
                .Where(u => u.UserId == userId && u.GameOver == !true)
                .FirstOrDefault(); 

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
            Console.WriteLine("Game state is: " + result.GameProgress);
            return new CheckGameViewModel { FoundGame = true, GameId = result.PublicId, GameState = result.GameProgress };

        }



        // POST: api/game/
        [HttpPost]
        public GameViewModel Post()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var publicId = Guid.NewGuid().ToString();
            _context.Add(new GameModel() { PublicId = publicId, GameProgress = "", GameOver = false, UserId = userId });
            _context.SaveChanges();

            return new GameViewModel { GameId = publicId, GameState = "", GameOver = false };
        }


        // PUT: api/game/{gameId}/{gameState}/{gameover}/{win/{lose}/{draw}}
        [HttpPut("{gameId}/{gameState}/{gameOver}/{win}/{lose}/{draw}")]
        public UpdateGameViewModel Put(string gameId, string gameState, bool gameOver, bool win, bool lose, bool draw)
        {
            
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                throw new ArgumentNullException("userId");
            }

            
            var id = _context.Games
                .Where(u => u.PublicId == gameId && u.UserId == userId)
                .OrderBy(u => u.Id)
                .Select(u => u.Id).FirstOrDefault();
            _context.Update(new GameModel()
            {
                Id = id,
                PublicId = gameId,
                GameProgress = gameState,
                UserId = userId,
                GameOver = gameOver,
                Win = win,
                Lose = lose,
                Draw = draw,
                Date = DateTime.Now
            });

            Console.WriteLine("Datetime NOW: " + DateTime.Now);

            _context.SaveChanges();

            

            if (gameOver == true)
            {
                var user = _context.Users.FirstOrDefault(e => e.Id == userId);
                Console.WriteLine(user.GamerTag);
                var countWins = _context.Games
                    .Where(u => u.UserId == userId && u.Win == true).Select(u => u.Win).ToList().Count();
                
                var countDraws = _context.Games
                    .Where(u => u.UserId == userId && u.Draw == true).Select(u => u.Draw).ToList().Count();
                
                var countLose = _context.Games
                    .Where(u => u.UserId == userId && u.Lose == true).Select(u => u.Lose).ToList().Count();

                var gamesPlayed = _context.Games
                    .Where(u => u.UserId == userId && u.GameOver == true).Select(u => u.GameOver).ToList().Count();

                user.Wins = countWins;
                user.Draws = countDraws;
                user.Losses = countLose;
                user.GamesPlayed = gamesPlayed;

                _context.Users.Update(user);
                Console.WriteLine("Count wins " + countWins);
                _context.SaveChanges();
            }


            Console.WriteLine("GameState is: " + gameState);
            Console.WriteLine("Gameover: " + gameOver);
            return new UpdateGameViewModel() { GameState = gameState };
        }
    }
}
