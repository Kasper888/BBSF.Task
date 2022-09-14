namespace ClientApp.BLL.Migrations
{
    using ClientApp.BLL.Model;
    using System;
    using System.Data.Entity.Migrations;
    using System.Linq;

    public partial class AddStudent : Bnsights.CoreLib.Migrations.CustomMigration<Model.ClientAppContext>
    {
        public override void Up_Seed(ClientAppContext context)
        {
            var rnd = new Random();
            var namesEn = new string[] { "Ramy", "Ahmed", "Aya", "Mahmoud", "Eslam", "Mena" };
            var namesAr = new string[] { "رامي", "أحمد", "أية", "محمود", "إسلام", "مينا" };

            var randomStudents = Enumerable.Range(1, 55).Select(i =>
            {
                var randomIndex = rnd.Next(6);
                return new Student
                {
                    NameAr = namesAr[randomIndex],
                    NameEn = namesEn[randomIndex],
                    Email = namesEn[randomIndex] + "@bnsights.com",
                    Birthday = DateTime.Now.AddYears(-rnd.Next(21, 100))
                };
            });
            context.Students.AddRange(randomStudents);
            context.SaveChanges();
        }
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
