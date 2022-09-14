namespace ClientApp.BLL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EditStudent : DbMigration
    {
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
