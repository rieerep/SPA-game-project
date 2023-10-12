using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SPAGame.Data;
using SPAGame.Models;
using System.Security.Claims;

namespace SPAGame.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProfileController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/profile/{id}
        [HttpGet("profile/{userId}")]
        public ApplicationUser Get (string id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = _context.Users
                .Where(u => u.Id == userId)
                .Select(u => new ApplicationUser
                {
                    GamerTag = u.GamerTag,

                })
                .Single();
            return user;
        }
    }
}
