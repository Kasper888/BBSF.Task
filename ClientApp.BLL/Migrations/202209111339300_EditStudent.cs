namespace ClientApp.BLL.Migrations
{
    using ClientApp.BLL.Model;
    using System;
    using System.Data.Entity.Migrations;
    using System.Linq;

    public partial class EditStudent : Bnsights.CoreLib.Migrations.CustomMigration<Model.ClientAppContext>
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
            AddColumn("dbo.Student", "CreatedBy", c => c.String(nullable: false, maxLength: 256));
            AddColumn("dbo.Student", "ModifiedBy", c => c.String(nullable: false, maxLength: 256));
            AddColumn("dbo.Student", "Created", c => c.DateTime(nullable: false));
            AddColumn("dbo.Student", "Modified", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Student", "Modified");
            DropColumn("dbo.Student", "Created");
            DropColumn("dbo.Student", "ModifiedBy");
            DropColumn("dbo.Student", "CreatedBy");
        }
    }
}
