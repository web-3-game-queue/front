using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace game_queue_front.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "maps",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    width = table.Column<int>(type: "integer", nullable: false),
                    height = table.Column<int>(type: "integer", nullable: false),
                    max_players_count = table.Column<int>(type: "integer", nullable: false),
                    cover_image_url = table.Column<string>(type: "text", nullable: false),
                    entry_price = table.Column<decimal>(type: "numeric", nullable: false),
                    status = table.Column<string>(type: "text", nullable: false, defaultValue: "Available")
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_maps", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    hashed_password = table.Column<string>(type: "text", nullable: false),
                    level = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "map_search_request",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    creator_user_id = table.Column<int>(type: "integer", nullable: false),
                    status = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_map_search_request", x => x.id);
                    table.ForeignKey(
                        name: "fk_map_search_request_users_creator_user_id",
                        column: x => x.creator_user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "request_map",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    search_request_id = table.Column<int>(type: "integer", nullable: false),
                    map_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_request_map", x => x.id);
                    table.ForeignKey(
                        name: "fk_request_map_map_search_request_search_request_id",
                        column: x => x.search_request_id,
                        principalTable: "map_search_request",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_request_map_maps_map_id",
                        column: x => x.map_id,
                        principalTable: "maps",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_map_search_request_creator_user_id",
                table: "map_search_request",
                column: "creator_user_id");

            migrationBuilder.CreateIndex(
                name: "ix_request_map_map_id",
                table: "request_map",
                column: "map_id");

            migrationBuilder.CreateIndex(
                name: "ix_request_map_search_request_id",
                table: "request_map",
                column: "search_request_id");

            migrationBuilder.CreateIndex(
                name: "ix_users_name",
                table: "users",
                column: "name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "request_map");

            migrationBuilder.DropTable(
                name: "map_search_request");

            migrationBuilder.DropTable(
                name: "maps");

            migrationBuilder.DropTable(
                name: "users");
        }
    }
}
