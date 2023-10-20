using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SPAGame.Models;

#nullable disable

namespace SPAGame.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public DbSet<GameModel> Games { get; set; }
        public DbSet<ScoreboardModel> Scoreboards { get; set; }

        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {

        }
    }
}