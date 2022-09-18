namespace ClientApp.BLL.Migrations
{
    using ClientApp.BLL.Model;
    using System;
    using System.Data.Entity.Migrations;
    using System.Linq;

    public partial class AddStudent : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Student",
                c => new
                {
                    Id = c.Int(nullable: false, identity: true),
                    NameEn = c.String(nullable: false, maxLength: 255),
                    NameAr = c.String(nullable: false, maxLength: 255),
                    Email = c.String(nullable: false),
                    Birthday = c.DateTime(nullable: false),
                })
                .PrimaryKey(t => t.Id);

        }

        public override void Down()
        {
            DropTable("dbo.Student");
        }
    }
}
