using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SPAGame.Models
{
    public class ScoreboardModel
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Score { get; set; }
        public string GamerTag { get; set; }
        public DateTime Date { get; set; }

    }
}
