using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace SPAGame.Models
{
    public class GameModel
    {
        [Key]
        public int Id { get; set; }
        public string PublicId { get; set; }

        //[ForeignKey("ApplicationUser")]    //Try if this is even necessary
        //public Guid UserId { get; set; }

        public bool Win { get; set; }

        public bool Draw { get; set; }

        public bool Lose { get; set; }

        //[DisplayName("Games played")]
        //public int GamesPlayed { get; set; }

        //public virtual IEnumerable<ApplicationUser> User { get; set; }

    }
}
