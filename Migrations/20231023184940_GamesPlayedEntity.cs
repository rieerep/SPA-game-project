using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SPAGame.Migrations
{
    public partial class GamesPlayedEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GamesPlayed",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GamesPlayed",
                table: "AspNetUsers");
        }
    }
}
