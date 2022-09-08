namespace ClientApp.BLL.Migrations
{
    using ClientApp.BLL.Model;
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreateInitial : Bnsights.CoreLib.Migrations.CustomMigration<Model.ClientAppContext>
    {
        public override void Up_Seed(ClientAppContext context)
        {
            var query = @"
UPDATE [bbsf].[User] SET [Discriminator] = 'ClientUser'
UPDATE [bbsf].[LookupItem] SET [Discriminator] = 'ClientLookupItem'";

            context.Database.ExecuteSqlCommand(query);
        }
        public override void Up()
        {
            CreateTable(
                "bbsf._BMigrationHistory",
                c => new
                    {
                        ID = c.Int(nullable: false),
                        BBSF = c.String(),
                        Client = c.String(),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "bbsf.WorkflowActivity",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        SysName = c.String(nullable: false, maxLength: 100),
                        NameEN = c.String(nullable: false, maxLength: 255),
                        NameAR = c.String(nullable: false, maxLength: 255),
                        WorkflowVersionID = c.Int(nullable: false),
                        ActivityTypeItemID = c.Int(nullable: false),
                        TaskCorrelationTypeItemID = c.Int(),
                        TemplateID = c.Int(),
                        StopOnError = c.Boolean(nullable: false),
                        ConditionLHSVariableID = c.Int(),
                        ConditionRHSVariableID = c.Int(),
                        ConditionRHSValue = c.String(maxLength: 512),
                        ConditionRHSTypeItemID = c.Int(),
                        ConditionOperatorTypeItemID = c.Int(),
                        TaskNameEN = c.String(maxLength: 255),
                        TaskNameAR = c.String(maxLength: 255),
                        TaskDescriptionEN = c.String(maxLength: 255),
                        TaskDescriptionAR = c.String(maxLength: 255),
                        TaskURL = c.String(maxLength: 2083),
                        SendMailOnTaskAssignment = c.Boolean(nullable: false),
                        CanCompleteFromTME = c.Boolean(nullable: false),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.LookupItem", t => t.ActivityTypeItemID)
                .ForeignKey("bbsf.LookupItem", t => t.ConditionOperatorTypeItemID)
                .ForeignKey("bbsf.WorkflowVariable", t => t.ConditionLHSVariableID)
                .ForeignKey("bbsf.WorkflowVariable", t => t.ConditionRHSVariableID)
                .ForeignKey("bbsf.Template", t => t.TemplateID)
                .ForeignKey("bbsf.WorkflowVersion", t => t.WorkflowVersionID)
                .Index(t => t.SysName)
                .Index(t => t.WorkflowVersionID)
                .Index(t => t.ActivityTypeItemID)
                .Index(t => t.TemplateID)
                .Index(t => t.ConditionLHSVariableID)
                .Index(t => t.ConditionRHSVariableID)
                .Index(t => t.ConditionOperatorTypeItemID);
            
            CreateTable(
                "bbsf.LookupItem",
                c => new
                    {
                        ID = c.Int(nullable: false),
                        NameEN = c.String(nullable: false, maxLength: 100),
                        NameAR = c.String(nullable: false, maxLength: 100),
                        Manageable = c.Boolean(nullable: false),
                        DisplayOrder = c.Int(nullable: false),
                        Value = c.String(),
                        SysName = c.String(nullable: false, maxLength: 100),
                        LookupID = c.Int(nullable: false),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                        Discriminator = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.Lookup", t => t.LookupID)
                .Index(t => t.SysName, unique: true)
                .Index(t => t.LookupID);
            
            CreateTable(
                "bbsf.Lookup",
                c => new
                    {
                        ID = c.Int(nullable: false),
                        NameEN = c.String(nullable: false, maxLength: 100),
                        NameAR = c.String(nullable: false, maxLength: 100),
                        DescriptionEN = c.String(maxLength: 250),
                        DescriptionAR = c.String(maxLength: 250),
                        Manageable = c.Boolean(nullable: false),
                        LookupGroupID = c.Int(),
                        SysName = c.String(nullable: false, maxLength: 100),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.LookupGroup", t => t.LookupGroupID)
                .Index(t => t.LookupGroupID)
                .Index(t => t.SysName, unique: true);
            
            CreateTable(
                "bbsf.LookupGroup",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        NameEN = c.String(nullable: false, maxLength: 100),
                        NameAR = c.String(nullable: false, maxLength: 100),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "bbsf.Provider",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        ProviderTypeItemID = c.Int(nullable: false),
                        Name = c.String(maxLength: 100),
                        Description = c.String(maxLength: 250),
                        TypeFullName = c.String(nullable: false, maxLength: 256),
                        IsDefault = c.Boolean(nullable: false),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                        RowVersion = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                        OrganizationID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.Organization", t => t.OrganizationID)
                .ForeignKey("bbsf.LookupItem", t => t.ProviderTypeItemID)
                .Index(t => t.ProviderTypeItemID)
                .Index(t => t.Name, unique: true)
                .Index(t => t.OrganizationID);
            
            CreateTable(
                "bbsf.Organization",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        NameEN = c.String(nullable: false, maxLength: 100),
                        NameAR = c.String(nullable: false, maxLength: 100),
                        LogoFileID = c.Int(),
                        DefaultLanguage = c.String(nullable: false, maxLength: 2),
                        DefaultTimeZone = c.String(nullable: false, maxLength: 50),
                        License = c.Binary(),
                        DatabaseConnectionString = c.String(maxLength: 1024),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                        RowVersion = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "bbsf.Permission",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        NameEN = c.String(maxLength: 100),
                        NameAR = c.String(maxLength: 100),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                        SysName = c.String(nullable: false, maxLength: 100),
                        RowVersion = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                        OrganizationID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.Organization", t => t.OrganizationID)
                .Index(t => t.SysName, unique: true)
                .Index(t => t.OrganizationID);
            
            CreateTable(
                "bbsf.PermissionSet",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        NameEN = c.String(maxLength: 100),
                        NameAR = c.String(maxLength: 100),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                        ActiveDirectoryGroup = c.String(maxLength: 64, unicode: false),
                        RowVersion = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                        SysName = c.String(nullable: false, maxLength: 100),
                        OrganizationID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.Organization", t => t.OrganizationID)
                .Index(t => t.SysName, unique: true)
                .Index(t => t.OrganizationID);
            
            CreateTable(
                "bbsf.HelpCenterItem",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        ParentID = c.Int(),
                        TitleEN = c.String(nullable: false, maxLength: 100),
                        TitleAR = c.String(nullable: false, maxLength: 100),
                        DescriptionEN = c.String(maxLength: 1000),
                        DescriptionAR = c.String(maxLength: 1000),
                        LogoFileID = c.Int(),
                        IsHidden = c.Boolean(nullable: false),
                        IsSection = c.Boolean(nullable: false),
                        HtmlEN = c.String(unicode: false),
                        HtmlAR = c.String(),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.File", t => t.LogoFileID)
                .ForeignKey("bbsf.HelpCenterItem", t => t.ParentID)
                .Index(t => t.ParentID)
                .Index(t => t.LogoFileID);
            
            CreateTable(
                "bbsf.File",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        ID_GUID = c.Guid(nullable: false),
                        CorrelationID = c.Guid(),
                        Name = c.String(nullable: false, maxLength: 150),
                        ExtraParams = c.String(maxLength: 500),
                        MimeType = c.String(nullable: false, maxLength: 127),
                        ProviderName = c.String(nullable: false, maxLength: 100),
                        SizeMB = c.Decimal(nullable: false, precision: 6, scale: 3),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                        FolderID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.LibraryFolder", t => t.FolderID)
                .Index(t => t.ID_GUID, unique: true)
                .Index(t => t.FolderID);
            
            CreateTable(
                "bbsf.LibraryFolder",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        NameEN = c.String(maxLength: 256),
                        NameAR = c.String(maxLength: 256),
                        ParentFolderID = c.Int(),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                        FolderPathAr = c.String(),
                        FolderPathEn = c.String(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.LibraryFolder", t => t.ParentFolderID)
                .Index(t => t.ParentFolderID);
            
            CreateTable(
                "bbsf.User",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        OrganizationID = c.Int(nullable: false),
                        Username = c.String(nullable: false, maxLength: 256, unicode: false),
                        SamAccount = c.String(maxLength: 256, unicode: false),
                        LanguageKey = c.String(maxLength: 2, unicode: false),
                        OriginalImageFileID = c.Int(),
                        LargeImageFileID = c.Int(),
                        SmallImageFileID = c.Int(),
                        PermissionSID = c.String(maxLength: 2000, unicode: false),
                        PermissionSetSID = c.String(maxLength: 2000, unicode: false),
                        NameEN = c.String(maxLength: 100),
                        NameAR = c.String(maxLength: 100),
                        TitleEN = c.String(maxLength: 100),
                        TitleAR = c.String(maxLength: 100),
                        GenderItemID = c.Int(),
                        LastUsedPermissionSetID = c.Int(),
                        IsAnonymous = c.Boolean(nullable: false),
                        DepartmentID = c.Int(),
                        ManagerUserID = c.Int(),
                        OTPCode = c.String(maxLength: 6),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                        RowVersion = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                        IsOnline = c.Boolean(nullable: false),
                        License = c.Binary(),
                        Discriminator = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.Department", t => t.DepartmentID)
                .ForeignKey("bbsf.File", t => t.LargeImageFileID)
                .ForeignKey("bbsf.User", t => t.ManagerUserID)
                .ForeignKey("bbsf.Organization", t => t.OrganizationID)
                .ForeignKey("bbsf.File", t => t.OriginalImageFileID)
                .ForeignKey("bbsf.File", t => t.SmallImageFileID)
                .Index(t => t.OrganizationID)
                .Index(t => t.Username, unique: true)
                .Index(t => t.OriginalImageFileID)
                .Index(t => t.LargeImageFileID)
                .Index(t => t.SmallImageFileID)
                .Index(t => t.DepartmentID)
                .Index(t => t.ManagerUserID);
            
            CreateTable(
                "bbsf.ChatRoom",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        TitleEN = c.String(),
                        TitleAR = c.String(),
                        OwnerID = c.Int(nullable: false),
                        RoomTypeItemID = c.Int(nullable: false),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                        Disabled = c.Boolean(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.LookupItem", t => t.RoomTypeItemID)
                .Index(t => t.RoomTypeItemID);
            
            CreateTable(
                "bbsf.ChatMessage",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        MessageText = c.String(maxLength: 1000),
                        RoomID = c.Int(nullable: false),
                        MessageTypeItemID = c.Int(nullable: false),
                        OwnerID = c.Int(nullable: false),
                        ImageID = c.Int(),
                        FileID = c.Int(),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.LookupItem", t => t.MessageTypeItemID)
                .ForeignKey("bbsf.User", t => t.OwnerID)
                .ForeignKey("bbsf.ChatRoom", t => t.RoomID)
                .Index(t => t.RoomID)
                .Index(t => t.MessageTypeItemID)
                .Index(t => t.OwnerID);
            
            CreateTable(
                "bbsf.ChatMessageAttachment",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        AttachmentTypeItemID = c.Int(nullable: false),
                        MessageID = c.Int(nullable: false),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                        ChatMessage_ID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.LookupItem", t => t.AttachmentTypeItemID)
                .ForeignKey("bbsf.ChatMessage", t => t.ChatMessage_ID)
                .Index(t => t.AttachmentTypeItemID)
                .Index(t => t.ChatMessage_ID);
            
            CreateTable(
                "bbsf.ChatMessageSeenBy",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        UserID = c.Int(nullable: false),
                        MessageID = c.Int(nullable: false),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.ChatMessage", t => t.MessageID)
                .ForeignKey("bbsf.User", t => t.UserID)
                .Index(t => t.UserID)
                .Index(t => t.MessageID);
            
            CreateTable(
                "bbsf.ChatUnreadMessage",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        RoomID = c.Int(nullable: false),
                        UserID = c.Int(nullable: false),
                        MessagesCount = c.Int(nullable: false),
                        Archived = c.Boolean(nullable: false),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.ChatRoom", t => t.RoomID)
                .ForeignKey("bbsf.User", t => t.UserID)
                .Index(t => t.RoomID)
                .Index(t => t.UserID);
            
            CreateTable(
                "bbsf.UserConnection",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        UserID = c.Int(nullable: false),
                        ConnectionID = c.String(),
                        Agent = c.String(),
                        IPAddress = c.String(),
                        IsOnline = c.Boolean(nullable: false),
                        Form = c.String(),
                        Identifier = c.String(),
                        URL = c.String(),
                        LastConnected = c.DateTime(),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.User", t => t.UserID)
                .Index(t => t.UserID);
            
            CreateTable(
                "bbsf.Department",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        NameEN = c.String(),
                        NameAR = c.String(),
                        SamAccount = c.String(),
                        SectorID = c.Int(),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                        IsDeleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.Sector", t => t.SectorID)
                .Index(t => t.SectorID);
            
            CreateTable(
                "bbsf.Sector",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        NameEN = c.String(),
                        NameAR = c.String(),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                        IsDeleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "bbsf.TMETask",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        NameEN = c.String(nullable: false),
                        NameAR = c.String(nullable: false),
                        DescriptionEN = c.String(),
                        DescriptionAR = c.String(),
                        TaskURL = c.String(maxLength: 2083),
                        TaskComment = c.String(maxLength: 500),
                        CorrelationID = c.Guid(),
                        IsAlive = c.Boolean(nullable: false),
                        TaskTypeItemID = c.Int(nullable: false),
                        WFInstanceTaskID = c.Int(),
                        TaskStatusItemID = c.Int(nullable: false),
                        TaskOutcomeItemID = c.Int(),
                        AssociatedObjectID = c.String(),
                        AssignedToUserID = c.Int(nullable: false),
                        CompletionDate = c.DateTime(),
                        PercentCompleted = c.Short(),
                        CorrelationTypeItemID = c.Int(nullable: false),
                        ExtraParams = c.String(),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.User", t => t.AssignedToUserID)
                .ForeignKey("bbsf.LookupItem", t => t.CorrelationTypeItemID)
                .ForeignKey("bbsf.WorkflowInstanceTask", t => t.WFInstanceTaskID)
                .ForeignKey("bbsf.WorkflowActivityOutcome", t => t.TaskOutcomeItemID)
                .ForeignKey("bbsf.LookupItem", t => t.TaskStatusItemID)
                .Index(t => t.WFInstanceTaskID)
                .Index(t => t.TaskStatusItemID)
                .Index(t => t.TaskOutcomeItemID)
                .Index(t => t.AssignedToUserID)
                .Index(t => t.CorrelationTypeItemID);
            
            CreateTable(
                "bbsf.WorkflowInstanceTask",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        WorkflowInstanceID = c.Int(nullable: false),
                        ActivityID = c.Int(nullable: false),
                        IsCompleted = c.Boolean(nullable: false),
                        TaskCorrelationID = c.Guid(),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.WorkflowActivity", t => t.ActivityID)
                .ForeignKey("bbsf.WorkflowInstance", t => t.WorkflowInstanceID)
                .Index(t => t.WorkflowInstanceID)
                .Index(t => t.ActivityID);
            
            CreateTable(
                "bbsf.WorkflowInstance",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        SysName = c.String(nullable: false, maxLength: 255),
                        NameEN = c.String(nullable: false, maxLength: 255),
                        NameAR = c.String(nullable: false, maxLength: 255),
                        WorkflowVersionID = c.Int(nullable: false),
                        CurrentActivityID = c.Int(nullable: false),
                        StartedByUserID = c.Int(nullable: false),
                        InstanceStatusItemID = c.Int(nullable: false),
                        AssociatedObjectID = c.String(nullable: false, maxLength: 255),
                        StartDate = c.DateTime(nullable: false),
                        EndDate = c.DateTime(),
                        ExtraParams = c.String(),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.WorkflowActivity", t => t.CurrentActivityID)
                .ForeignKey("bbsf.LookupItem", t => t.InstanceStatusItemID)
                .ForeignKey("bbsf.User", t => t.StartedByUserID)
                .ForeignKey("bbsf.WorkflowVersion", t => t.WorkflowVersionID)
                .Index(t => t.WorkflowVersionID)
                .Index(t => t.CurrentActivityID)
                .Index(t => t.StartedByUserID)
                .Index(t => t.InstanceStatusItemID);
            
            CreateTable(
                "bbsf.WorkflowError",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        InstanceID = c.Int(nullable: false),
                        ActivityID = c.Int(nullable: false),
                        Message = c.String(nullable: false),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.WorkflowActivity", t => t.ActivityID)
                .ForeignKey("bbsf.WorkflowInstance", t => t.InstanceID)
                .Index(t => t.InstanceID)
                .Index(t => t.ActivityID);
            
            CreateTable(
                "bbsf.WorkflowInstanceComment",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        InstanceID = c.Int(nullable: false),
                        ActivityID = c.Int(nullable: false),
                        UserID = c.Int(nullable: false),
                        Comment = c.String(nullable: false),
                        FileCorrelationID = c.Guid(),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.WorkflowActivity", t => t.ActivityID)
                .ForeignKey("bbsf.WorkflowInstance", t => t.InstanceID)
                .ForeignKey("bbsf.User", t => t.UserID)
                .Index(t => t.InstanceID)
                .Index(t => t.ActivityID)
                .Index(t => t.UserID);
            
            CreateTable(
                "bbsf.WorkflowInstanceVariable",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        InstanceID = c.Int(nullable: false),
                        VariableID = c.Int(nullable: false),
                        Value_Text = c.String(maxLength: 2500),
                        Value_Number = c.Double(),
                        Value_Boolean = c.Boolean(),
                        Value_Date = c.DateTime(),
                        Value_Guid = c.Guid(),
                        Value_Identifier = c.String(),
                        Value_VariableLookupID = c.Int(),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.WorkflowInstance", t => t.InstanceID)
                .ForeignKey("bbsf.WorkflowVariable", t => t.VariableID)
                .Index(t => t.InstanceID)
                .Index(t => t.VariableID);
            
            CreateTable(
                "bbsf.WorkflowVariableLookup",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Value = c.String(nullable: false, maxLength: 2000),
                        NameEN = c.String(nullable: false, maxLength: 255),
                        NameAR = c.String(nullable: false, maxLength: 255),
                        VariableID = c.Int(nullable: false),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.WorkflowVariable", t => t.VariableID)
                .Index(t => t.VariableID);
            
            CreateTable(
                "bbsf.WorkflowVariable",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        NameEN = c.String(nullable: false, maxLength: 255),
                        NameAR = c.String(nullable: false, maxLength: 255),
                        SysName = c.String(nullable: false, maxLength: 100),
                        WorkflowVersionID = c.Int(nullable: false),
                        DataTypeItemID = c.Int(nullable: false),
                        VariableTypeItemID = c.Int(nullable: false),
                        IsConstant = c.Boolean(nullable: false),
                        Value_Number = c.Double(),
                        Value_Boolean = c.Boolean(),
                        Value_Date = c.DateTime(),
                        Value_VariableLookupID = c.Int(),
                        Value_Identifier = c.String(maxLength: 100),
                        Value_Text = c.String(maxLength: 2500),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.LookupItem", t => t.DataTypeItemID)
                .ForeignKey("bbsf.LookupItem", t => t.VariableTypeItemID)
                .ForeignKey("bbsf.WorkflowVersion", t => t.WorkflowVersionID)
                .Index(t => t.SysName)
                .Index(t => t.WorkflowVersionID)
                .Index(t => t.DataTypeItemID)
                .Index(t => t.VariableTypeItemID)
                .Index(t => t.Value_Identifier);
            
            CreateTable(
                "bbsf.WorkflowActivityVariable",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        ActivityID = c.Int(nullable: false),
                        VariableID = c.Int(nullable: false),
                        IsMandatory = c.Boolean(nullable: false),
                        IsEnabled = c.Boolean(nullable: false),
                        IsVisible = c.Boolean(nullable: false),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.WorkflowActivity", t => t.ActivityID)
                .ForeignKey("bbsf.WorkflowVariable", t => t.VariableID)
                .Index(t => t.ActivityID)
                .Index(t => t.VariableID);
            
            CreateTable(
                "bbsf.WorkflowVersion",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        WorkflowID = c.Int(nullable: false),
                        ChangeEN = c.String(nullable: false, maxLength: 255),
                        ChangeAR = c.String(nullable: false, maxLength: 255),
                        IsCurrent = c.Boolean(nullable: false),
                        IsPublished = c.Boolean(nullable: false),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.Workflow", t => t.WorkflowID)
                .Index(t => t.WorkflowID);
            
            CreateTable(
                "bbsf.WorkflowLog",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        InstanceID = c.Int(nullable: false),
                        WorkflowVersionID = c.Int(nullable: false),
                        ActivityID = c.Int(nullable: false),
                        ActivityOutcomeID = c.Int(),
                        CorrelationID = c.Guid(),
                        CompletedByUserID = c.Int(),
                        CompletedOn = c.DateTime(nullable: false),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                        ActionNameEN = c.String(maxLength: 2000),
                        ActionNameAR = c.String(maxLength: 2000),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.WorkflowActivity", t => t.ActivityID)
                .ForeignKey("bbsf.WorkflowActivityOutcome", t => t.ActivityOutcomeID)
                .ForeignKey("bbsf.User", t => t.CompletedByUserID)
                .ForeignKey("bbsf.WorkflowInstance", t => t.InstanceID)
                .ForeignKey("bbsf.WorkflowVersion", t => t.WorkflowVersionID)
                .Index(t => t.InstanceID)
                .Index(t => t.WorkflowVersionID)
                .Index(t => t.ActivityID)
                .Index(t => t.ActivityOutcomeID)
                .Index(t => t.CompletedByUserID);
            
            CreateTable(
                "bbsf.WorkflowActivityOutcome",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        NameEN = c.String(nullable: false, maxLength: 255),
                        NameAR = c.String(nullable: false, maxLength: 255),
                        SysName = c.String(nullable: false, maxLength: 100),
                        ActivityID = c.Int(nullable: false),
                        NextActivityID = c.Int(),
                        CanAddComment = c.Boolean(nullable: false),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.WorkflowActivity", t => t.NextActivityID)
                .ForeignKey("bbsf.WorkflowActivity", t => t.ActivityID)
                .Index(t => t.SysName)
                .Index(t => t.ActivityID)
                .Index(t => t.NextActivityID);
            
            CreateTable(
                "bbsf.WorkflowLogVariable",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        LogID = c.Int(nullable: false),
                        InstanceVariableID = c.Int(nullable: false),
                        Value_Text = c.String(maxLength: 2500),
                        Value_Number = c.Double(),
                        Value_Boolean = c.Boolean(),
                        Value_Date = c.DateTime(),
                        Value_Guid = c.Guid(),
                        Value_VariableLookupID = c.Long(),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.WorkflowInstanceVariable", t => t.InstanceVariableID)
                .ForeignKey("bbsf.WorkflowLog", t => t.LogID)
                .Index(t => t.LogID)
                .Index(t => t.InstanceVariableID);
            
            CreateTable(
                "bbsf.Workflow",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        SysName = c.String(nullable: false, maxLength: 100),
                        NameEN = c.String(nullable: false, maxLength: 255),
                        NameAR = c.String(nullable: false, maxLength: 255),
                        DescriptionEN = c.String(maxLength: 1000),
                        DescriptionAR = c.String(maxLength: 1000),
                        IsActive = c.Boolean(nullable: false),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.ID)
                .Index(t => t.SysName, unique: true);
            
            CreateTable(
                "bbsf.TemplateUnsubscribe",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        TemplateID = c.Int(nullable: false),
                        UserID = c.Int(nullable: false),
                        IsEmail = c.Boolean(nullable: false),
                        IsSms = c.Boolean(nullable: false),
                        Reason = c.String(maxLength: 500),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.Template", t => t.TemplateID)
                .ForeignKey("bbsf.User", t => t.UserID)
                .Index(t => t.TemplateID)
                .Index(t => t.UserID);
            
            CreateTable(
                "bbsf.Template",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        CategoryItemID = c.Int(),
                        NameEN = c.String(maxLength: 100),
                        NameAR = c.String(maxLength: 100),
                        DescriptionEN = c.String(maxLength: 250),
                        DescriptionAR = c.String(maxLength: 250),
                        IsEmail = c.Boolean(nullable: false),
                        IsSms = c.Boolean(nullable: false),
                        EnableIntensiveLogging = c.Boolean(nullable: false),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                        SysName = c.String(nullable: false, maxLength: 100),
                        RowVersion = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                        OrganizationID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.LookupItem", t => t.CategoryItemID)
                .ForeignKey("bbsf.Organization", t => t.OrganizationID)
                .Index(t => t.CategoryItemID)
                .Index(t => t.SysName, unique: true)
                .Index(t => t.OrganizationID);
            
            CreateTable(
                "bbsf.TemplateInfo",
                c => new
                    {
                        ID = c.Int(nullable: false),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                        EmailSubjectEN = c.String(maxLength: 70),
                        EmailSubjectAR = c.String(maxLength: 70),
                        EmailHtmlBodyTagAttributesEN = c.String(),
                        EmailHtmlBodyTagAttributesAR = c.String(),
                        EmailHtmlHeadSectionEN = c.String(),
                        EmailHtmlHeadSectionAR = c.String(),
                        IsMoveCssInline = c.Boolean(nullable: false),
                        EmailBodyEN = c.String(),
                        EmailBodyAR = c.String(),
                        LanguageModeItemID = c.Int(nullable: false),
                        SmsEN = c.String(),
                        SmsAR = c.String(),
                        RowVersion = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                        TemplateID = c.Int(nullable: false),
                        EmailHeaderAndFooterTemplateID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.EmailHeaderAndFooterTemplate", t => t.EmailHeaderAndFooterTemplateID)
                .ForeignKey("bbsf.LookupItem", t => t.LanguageModeItemID)
                .ForeignKey("bbsf.Template", t => t.TemplateID)
                .Index(t => t.LanguageModeItemID)
                .Index(t => t.TemplateID)
                .Index(t => t.EmailHeaderAndFooterTemplateID);
            
            CreateTable(
                "bbsf.EmailHeaderAndFooterTemplate",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        NameEN = c.String(nullable: false, maxLength: 100),
                        NameAR = c.String(nullable: false, maxLength: 100),
                        HeaderEN = c.String(),
                        HeaderAR = c.String(),
                        FooterEN = c.String(),
                        FooterAR = c.String(),
                        HeadSectionEN = c.String(),
                        HeadSectionAR = c.String(),
                        HeadTagAttributesEN = c.String(),
                        HeadTagAttributesAR = c.String(),
                        IsMoveCssInline = c.Boolean(nullable: false),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                        RowVersion = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "bbsf.UserInfo",
                c => new
                    {
                        ID = c.Int(nullable: false),
                        UserID = c.Int(nullable: false),
                        Mobile = c.String(maxLength: 255, unicode: false),
                        Email = c.String(nullable: false, maxLength: 256, unicode: false),
                        Password = c.String(nullable: false, maxLength: 75, unicode: false),
                        Token = c.String(nullable: false, maxLength: 256),
                        Token_IsCompleted = c.Boolean(nullable: false),
                        Token_CanExpire = c.Boolean(nullable: false),
                        IsFirstLoggedIn = c.Boolean(),
                        IsActive = c.Boolean(nullable: false),
                        CanLogin = c.Boolean(nullable: false),
                        IsLicensed = c.Boolean(nullable: false),
                        FailedLoginCount = c.Short(nullable: false),
                        FailedLoginAttempt = c.DateTime(),
                        LastLogin = c.DateTime(),
                        LastPasswordChangeDate = c.DateTime(),
                        ActivationDate = c.DateTime(),
                        DeactivationDate = c.DateTime(),
                        RowVersion = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.User", t => t.UserID)
                .Index(t => t.UserID)
                .Index(t => t.Token, unique: true);
            
            CreateTable(
                "bbsf.ProviderAttribute",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        ProviderId = c.Int(nullable: false),
                        Name = c.String(nullable: false, maxLength: 100),
                        IsEncrypted = c.Boolean(nullable: false),
                        Value = c.String(maxLength: 100),
                        ValueEncrypted = c.Binary(),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                        RowVersion = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.Provider", t => t.ProviderId)
                .Index(t => t.ProviderId);
            
            CreateTable(
                "bbsf.Participant",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        DescriptionEN = c.String(),
                        DescriptionAR = c.String(),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                        ParticipantTypeItemID = c.Int(nullable: false),
                        WorkflowActivityID = c.Int(),
                        CorrelationID = c.Guid(),
                        PermissionSetID = c.Int(),
                        UserID = c.Int(),
                        WorkflowVariableID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.WorkflowActivity", t => t.WorkflowActivityID)
                .ForeignKey("bbsf.LookupItem", t => t.ParticipantTypeItemID)
                .ForeignKey("bbsf.PermissionSet", t => t.PermissionSetID)
                .ForeignKey("bbsf.User", t => t.UserID)
                .ForeignKey("bbsf.WorkflowVariable", t => t.WorkflowVariableID)
                .Index(t => t.ParticipantTypeItemID)
                .Index(t => t.WorkflowActivityID)
                .Index(t => t.PermissionSetID)
                .Index(t => t.UserID)
                .Index(t => t.WorkflowVariableID);
            
            CreateTable(
                "bbsf.ADConnection",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 100),
                        PermissionSetID = c.Int(nullable: false),
                        ADConnectionTypeItemID = c.Int(nullable: false),
                        Identifier = c.String(nullable: false, maxLength: 256),
                        Domain = c.String(nullable: false, maxLength: 256),
                        SamAccount = c.String(maxLength: 20),
                        Password = c.String(maxLength: 4000),
                        MarkAsInactive = c.Boolean(nullable: false),
                        AddToDailyJob = c.Boolean(nullable: false),
                        LastRunLog = c.String(),
                        WelcomeTemplateID = c.Int(),
                        LangKey = c.String(nullable: false, maxLength: 2),
                        ImagesFileProviderName = c.String(maxLength: 100),
                        IsRunningNow = c.Boolean(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.LookupItem", t => t.ADConnectionTypeItemID)
                .ForeignKey("bbsf.PermissionSet", t => t.PermissionSetID)
                .ForeignKey("bbsf.Template", t => t.WelcomeTemplateID)
                .Index(t => t.PermissionSetID)
                .Index(t => t.ADConnectionTypeItemID)
                .Index(t => t.WelcomeTemplateID);
            
            CreateTable(
                "bbsf.ADMapping",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        ADConnectionID = c.Int(nullable: false),
                        BBSFPropertyName = c.String(nullable: false, maxLength: 1024),
                        ADPropertyName = c.String(nullable: false, maxLength: 1024),
                        ADMappingTypeItemID = c.Int(nullable: false),
                        IncludeInUpdate = c.Boolean(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.ADConnection", t => t.ADConnectionID)
                .ForeignKey("bbsf.LookupItem", t => t.ADMappingTypeItemID)
                .Index(t => t.ADConnectionID)
                .Index(t => t.ADMappingTypeItemID);
            
            CreateTable(
                "bbsf.BTimeZone",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        NameEN = c.String(nullable: false, maxLength: 100),
                        NameAR = c.String(nullable: false, maxLength: 100),
                        DotNetId = c.String(nullable: false, maxLength: 50),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "bbsf.ClientMachine",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        MachineKey = c.String(nullable: false, maxLength: 255),
                        MachineName = c.String(maxLength: 255),
                        InternalDNSName = c.String(maxLength: 255),
                        OS = c.String(maxLength: 255),
                        LastInitialized = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "bbsf.Configurations",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        Key = c.String(nullable: false, maxLength: 256),
                        Value = c.String(nullable: false),
                        DefaultValue = c.String(),
                        ScopeItemID = c.Int(nullable: false),
                        ValueTypeID = c.Int(),
                        ValueSourceID = c.Int(),
                        SelectedLookupID = c.Int(),
                        SourceFunctionName = c.String(),
                        UserID = c.Int(),
                        PermissionSetID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.LookupItem", t => t.ScopeItemID)
                .ForeignKey("bbsf.PermissionSet", t => t.PermissionSetID)
                .ForeignKey("bbsf.Lookup", t => t.SelectedLookupID)
                .ForeignKey("bbsf.User", t => t.UserID)
                .ForeignKey("bbsf.LookupItem", t => t.ValueSourceID)
                .ForeignKey("bbsf.LookupItem", t => t.ValueTypeID)
                .Index(t => t.ScopeItemID)
                .Index(t => t.ValueTypeID)
                .Index(t => t.ValueSourceID)
                .Index(t => t.SelectedLookupID)
                .Index(t => t.UserID)
                .Index(t => t.PermissionSetID);
            
            CreateTable(
                "bbsf.Country",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        NameEN = c.String(nullable: false, maxLength: 50),
                        NameAR = c.String(nullable: false, maxLength: 50),
                        Code = c.String(nullable: false, maxLength: 2),
                        TelCode = c.String(nullable: false, maxLength: 4),
                        Code3 = c.String(maxLength: 3),
                        Latitude = c.Double(),
                        Longitude = c.Double(),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "bbsf.PublicHoliday",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        SysName = c.String(nullable: false, maxLength: 100),
                        CountryID = c.Int(nullable: false),
                        ImageFileID = c.Int(),
                        Day = c.Int(nullable: false),
                        Month = c.Int(nullable: false),
                        NameEN = c.String(nullable: false, maxLength: 100),
                        NameAR = c.String(nullable: false, maxLength: 100),
                        DescriptionEN = c.String(nullable: false, maxLength: 2000),
                        DescriptionAR = c.String(nullable: false, maxLength: 2000),
                        IsActive = c.Boolean(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.Country", t => t.CountryID)
                .ForeignKey("bbsf.File", t => t.ImageFileID)
                .Index(t => t.SysName, unique: true)
                .Index(t => t.CountryID)
                .Index(t => t.ImageFileID);
            
            CreateTable(
                "bbsf.FormsHubConnection",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        UserId = c.Int(nullable: false),
                        ConnectionId = c.String(maxLength: 256),
                        ObjectId = c.String(maxLength: 256),
                        ObjectName = c.String(maxLength: 256),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.User", t => t.UserId)
                .Index(t => t.UserId);
            
            CreateTable(
                "HangFire.AggregatedCounter",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Key = c.String(nullable: false, maxLength: 100),
                        Value = c.Long(nullable: false),
                        ExpireAt = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "HangFire.Counter",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Key = c.String(nullable: false, maxLength: 100),
                        Value = c.Short(nullable: false),
                        ExpireAt = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "HangFire.Hash",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Key = c.String(nullable: false, maxLength: 100),
                        Field = c.String(nullable: false, maxLength: 100),
                        Value = c.String(),
                        ExpireAt = c.DateTime(precision: 7, storeType: "datetime2"),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "HangFire.JobParameter",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        JobId = c.Int(nullable: false),
                        Name = c.String(nullable: false, maxLength: 40),
                        Value = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("HangFire.Job", t => t.JobId)
                .Index(t => t.JobId);
            
            CreateTable(
                "HangFire.Job",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StateId = c.Int(),
                        StateName = c.String(maxLength: 20),
                        InvocationData = c.String(nullable: false),
                        Arguments = c.String(nullable: false),
                        CreatedAt = c.DateTime(nullable: false),
                        ExpireAt = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "HangFire.State",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        JobId = c.Int(nullable: false),
                        Name = c.String(nullable: false, maxLength: 20),
                        Reason = c.String(maxLength: 100),
                        CreatedAt = c.DateTime(nullable: false),
                        Data = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("HangFire.Job", t => t.JobId)
                .Index(t => t.JobId);
            
            CreateTable(
                "HangFire.JobQueue",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        JobId = c.Int(nullable: false),
                        Queue = c.String(nullable: false, maxLength: 50),
                        FetchedAt = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "HangFire.List",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Key = c.String(nullable: false, maxLength: 100),
                        Value = c.String(),
                        ExpireAt = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "HangFire.Schema",
                c => new
                    {
                        Version = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Version);
            
            CreateTable(
                "HangFire.Server",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 100),
                        Data = c.String(),
                        LastHeartbeat = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "HangFire.Set",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Key = c.String(nullable: false, maxLength: 100),
                        Score = c.Double(nullable: false),
                        Value = c.String(nullable: false, maxLength: 256),
                        ExpireAt = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "bbsf.ImpersonationRule",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        SourceParticipantID = c.Int(nullable: false),
                        DestinationParticipantID = c.Int(nullable: false),
                        ExpiresAt = c.DateTime(),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("bbsf.Participant", t => t.DestinationParticipantID)
                .ForeignKey("bbsf.Participant", t => t.SourceParticipantID)
                .Index(t => t.SourceParticipantID)
                .Index(t => t.DestinationParticipantID);
            
            CreateTable(
                "dbo.Localization",
                c => new
                    {
                        pk = c.Int(nullable: false, identity: true),
                        ResourceId = c.String(nullable: false, maxLength: 1024),
                        Value = c.String(),
                        LocaleId = c.String(maxLength: 10),
                        ResourceSet = c.String(maxLength: 512),
                        Type = c.String(maxLength: 512),
                        BinFile = c.Binary(),
                        TextFile = c.String(),
                        Filename = c.String(maxLength: 128),
                        Comment = c.String(maxLength: 512),
                        ValueType = c.Int(nullable: false),
                        Updated = c.DateTime(nullable: false),
                        IsWentToProduction = c.Boolean(nullable: false),
                        WentToProductionDate = c.DateTime(),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        ModifiedBy = c.String(nullable: false, maxLength: 256),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.pk);
            
            CreateTable(
                "bbsf.PermissionSet_HelpCenterItem",
                c => new
                    {
                        PermissionSetID = c.Int(nullable: false),
                        HelpCenterItemID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.PermissionSetID, t.HelpCenterItemID })
                .ForeignKey("bbsf.PermissionSet", t => t.PermissionSetID)
                .ForeignKey("bbsf.HelpCenterItem", t => t.HelpCenterItemID)
                .Index(t => t.PermissionSetID)
                .Index(t => t.HelpCenterItemID);
            
            CreateTable(
                "bbsf.PermissionSet_Permission",
                c => new
                    {
                        PermissionSetID = c.Int(nullable: false),
                        PermissionID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.PermissionSetID, t.PermissionID })
                .ForeignKey("bbsf.PermissionSet", t => t.PermissionSetID)
                .ForeignKey("bbsf.Permission", t => t.PermissionID)
                .Index(t => t.PermissionSetID)
                .Index(t => t.PermissionID);
            
            CreateTable(
                "bbsf.ChatRoom_User",
                c => new
                    {
                        ChatRoomID = c.Int(nullable: false),
                        UserID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.ChatRoomID, t.UserID })
                .ForeignKey("bbsf.ChatRoom", t => t.ChatRoomID)
                .ForeignKey("bbsf.User", t => t.UserID)
                .Index(t => t.ChatRoomID)
                .Index(t => t.UserID);
            
            CreateTable(
                "bbsf.WorkflowInstanceVariable_VariableLookup",
                c => new
                    {
                        VariableLookupID = c.Int(nullable: false),
                        InstanceVariableID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.VariableLookupID, t.InstanceVariableID })
                .ForeignKey("bbsf.WorkflowInstanceVariable", t => t.VariableLookupID)
                .ForeignKey("bbsf.WorkflowVariableLookup", t => t.InstanceVariableID)
                .Index(t => t.VariableLookupID)
                .Index(t => t.InstanceVariableID);
            
            CreateTable(
                "bbsf.PermissionSet_User",
                c => new
                    {
                        PermissionSetID = c.Int(nullable: false),
                        UserID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.PermissionSetID, t.UserID })
                .ForeignKey("bbsf.PermissionSet", t => t.PermissionSetID)
                .ForeignKey("bbsf.User", t => t.UserID)
                .Index(t => t.PermissionSetID)
                .Index(t => t.UserID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("bbsf.ImpersonationRule", "SourceParticipantID", "bbsf.Participant");
            DropForeignKey("bbsf.ImpersonationRule", "DestinationParticipantID", "bbsf.Participant");
            DropForeignKey("HangFire.State", "JobId", "HangFire.Job");
            DropForeignKey("HangFire.JobParameter", "JobId", "HangFire.Job");
            DropForeignKey("bbsf.FormsHubConnection", "UserId", "bbsf.User");
            DropForeignKey("bbsf.PublicHoliday", "ImageFileID", "bbsf.File");
            DropForeignKey("bbsf.PublicHoliday", "CountryID", "bbsf.Country");
            DropForeignKey("bbsf.Configurations", "ValueTypeID", "bbsf.LookupItem");
            DropForeignKey("bbsf.Configurations", "ValueSourceID", "bbsf.LookupItem");
            DropForeignKey("bbsf.Configurations", "UserID", "bbsf.User");
            DropForeignKey("bbsf.Configurations", "SelectedLookupID", "bbsf.Lookup");
            DropForeignKey("bbsf.Configurations", "PermissionSetID", "bbsf.PermissionSet");
            DropForeignKey("bbsf.Configurations", "ScopeItemID", "bbsf.LookupItem");
            DropForeignKey("bbsf.ADConnection", "WelcomeTemplateID", "bbsf.Template");
            DropForeignKey("bbsf.ADConnection", "PermissionSetID", "bbsf.PermissionSet");
            DropForeignKey("bbsf.ADMapping", "ADMappingTypeItemID", "bbsf.LookupItem");
            DropForeignKey("bbsf.ADMapping", "ADConnectionID", "bbsf.ADConnection");
            DropForeignKey("bbsf.ADConnection", "ADConnectionTypeItemID", "bbsf.LookupItem");
            DropForeignKey("bbsf.WorkflowActivity", "WorkflowVersionID", "bbsf.WorkflowVersion");
            DropForeignKey("bbsf.WorkflowActivity", "TemplateID", "bbsf.Template");
            DropForeignKey("bbsf.WorkflowActivity", "ConditionRHSVariableID", "bbsf.WorkflowVariable");
            DropForeignKey("bbsf.Participant", "WorkflowVariableID", "bbsf.WorkflowVariable");
            DropForeignKey("bbsf.Participant", "UserID", "bbsf.User");
            DropForeignKey("bbsf.Participant", "PermissionSetID", "bbsf.PermissionSet");
            DropForeignKey("bbsf.Participant", "ParticipantTypeItemID", "bbsf.LookupItem");
            DropForeignKey("bbsf.Participant", "WorkflowActivityID", "bbsf.WorkflowActivity");
            DropForeignKey("bbsf.WorkflowActivityOutcome", "ActivityID", "bbsf.WorkflowActivity");
            DropForeignKey("bbsf.WorkflowActivityOutcome", "NextActivityID", "bbsf.WorkflowActivity");
            DropForeignKey("bbsf.WorkflowActivity", "ConditionLHSVariableID", "bbsf.WorkflowVariable");
            DropForeignKey("bbsf.WorkflowActivity", "ConditionOperatorTypeItemID", "bbsf.LookupItem");
            DropForeignKey("bbsf.WorkflowActivity", "ActivityTypeItemID", "bbsf.LookupItem");
            DropForeignKey("bbsf.Provider", "ProviderTypeItemID", "bbsf.LookupItem");
            DropForeignKey("bbsf.ProviderAttribute", "ProviderId", "bbsf.Provider");
            DropForeignKey("bbsf.Provider", "OrganizationID", "bbsf.Organization");
            DropForeignKey("bbsf.PermissionSet_User", "UserID", "bbsf.User");
            DropForeignKey("bbsf.PermissionSet_User", "PermissionSetID", "bbsf.PermissionSet");
            DropForeignKey("bbsf.UserInfo", "UserID", "bbsf.User");
            DropForeignKey("bbsf.TemplateUnsubscribe", "UserID", "bbsf.User");
            DropForeignKey("bbsf.TemplateUnsubscribe", "TemplateID", "bbsf.Template");
            DropForeignKey("bbsf.TemplateInfo", "TemplateID", "bbsf.Template");
            DropForeignKey("bbsf.TemplateInfo", "LanguageModeItemID", "bbsf.LookupItem");
            DropForeignKey("bbsf.TemplateInfo", "EmailHeaderAndFooterTemplateID", "bbsf.EmailHeaderAndFooterTemplate");
            DropForeignKey("bbsf.Template", "OrganizationID", "bbsf.Organization");
            DropForeignKey("bbsf.Template", "CategoryItemID", "bbsf.LookupItem");
            DropForeignKey("bbsf.TMETask", "TaskStatusItemID", "bbsf.LookupItem");
            DropForeignKey("bbsf.TMETask", "TaskOutcomeItemID", "bbsf.WorkflowActivityOutcome");
            DropForeignKey("bbsf.TMETask", "WFInstanceTaskID", "bbsf.WorkflowInstanceTask");
            DropForeignKey("bbsf.WorkflowInstanceTask", "WorkflowInstanceID", "bbsf.WorkflowInstance");
            DropForeignKey("bbsf.WorkflowInstance", "WorkflowVersionID", "bbsf.WorkflowVersion");
            DropForeignKey("bbsf.WorkflowInstance", "StartedByUserID", "bbsf.User");
            DropForeignKey("bbsf.WorkflowInstanceVariable", "VariableID", "bbsf.WorkflowVariable");
            DropForeignKey("bbsf.WorkflowInstanceVariable_VariableLookup", "InstanceVariableID", "bbsf.WorkflowVariableLookup");
            DropForeignKey("bbsf.WorkflowInstanceVariable_VariableLookup", "VariableLookupID", "bbsf.WorkflowInstanceVariable");
            DropForeignKey("bbsf.WorkflowVariableLookup", "VariableID", "bbsf.WorkflowVariable");
            DropForeignKey("bbsf.WorkflowVariable", "WorkflowVersionID", "bbsf.WorkflowVersion");
            DropForeignKey("bbsf.WorkflowVersion", "WorkflowID", "bbsf.Workflow");
            DropForeignKey("bbsf.WorkflowLog", "WorkflowVersionID", "bbsf.WorkflowVersion");
            DropForeignKey("bbsf.WorkflowLogVariable", "LogID", "bbsf.WorkflowLog");
            DropForeignKey("bbsf.WorkflowLogVariable", "InstanceVariableID", "bbsf.WorkflowInstanceVariable");
            DropForeignKey("bbsf.WorkflowLog", "InstanceID", "bbsf.WorkflowInstance");
            DropForeignKey("bbsf.WorkflowLog", "CompletedByUserID", "bbsf.User");
            DropForeignKey("bbsf.WorkflowLog", "ActivityOutcomeID", "bbsf.WorkflowActivityOutcome");
            DropForeignKey("bbsf.WorkflowLog", "ActivityID", "bbsf.WorkflowActivity");
            DropForeignKey("bbsf.WorkflowVariable", "VariableTypeItemID", "bbsf.LookupItem");
            DropForeignKey("bbsf.WorkflowVariable", "DataTypeItemID", "bbsf.LookupItem");
            DropForeignKey("bbsf.WorkflowActivityVariable", "VariableID", "bbsf.WorkflowVariable");
            DropForeignKey("bbsf.WorkflowActivityVariable", "ActivityID", "bbsf.WorkflowActivity");
            DropForeignKey("bbsf.WorkflowInstanceVariable", "InstanceID", "bbsf.WorkflowInstance");
            DropForeignKey("bbsf.WorkflowInstance", "InstanceStatusItemID", "bbsf.LookupItem");
            DropForeignKey("bbsf.WorkflowInstanceComment", "UserID", "bbsf.User");
            DropForeignKey("bbsf.WorkflowInstanceComment", "InstanceID", "bbsf.WorkflowInstance");
            DropForeignKey("bbsf.WorkflowInstanceComment", "ActivityID", "bbsf.WorkflowActivity");
            DropForeignKey("bbsf.WorkflowError", "InstanceID", "bbsf.WorkflowInstance");
            DropForeignKey("bbsf.WorkflowError", "ActivityID", "bbsf.WorkflowActivity");
            DropForeignKey("bbsf.WorkflowInstance", "CurrentActivityID", "bbsf.WorkflowActivity");
            DropForeignKey("bbsf.WorkflowInstanceTask", "ActivityID", "bbsf.WorkflowActivity");
            DropForeignKey("bbsf.TMETask", "CorrelationTypeItemID", "bbsf.LookupItem");
            DropForeignKey("bbsf.TMETask", "AssignedToUserID", "bbsf.User");
            DropForeignKey("bbsf.User", "SmallImageFileID", "bbsf.File");
            DropForeignKey("bbsf.User", "OriginalImageFileID", "bbsf.File");
            DropForeignKey("bbsf.User", "OrganizationID", "bbsf.Organization");
            DropForeignKey("bbsf.User", "ManagerUserID", "bbsf.User");
            DropForeignKey("bbsf.User", "LargeImageFileID", "bbsf.File");
            DropForeignKey("bbsf.User", "DepartmentID", "bbsf.Department");
            DropForeignKey("bbsf.Department", "SectorID", "bbsf.Sector");
            DropForeignKey("bbsf.UserConnection", "UserID", "bbsf.User");
            DropForeignKey("bbsf.ChatRoom_User", "UserID", "bbsf.User");
            DropForeignKey("bbsf.ChatRoom_User", "ChatRoomID", "bbsf.ChatRoom");
            DropForeignKey("bbsf.ChatUnreadMessage", "UserID", "bbsf.User");
            DropForeignKey("bbsf.ChatUnreadMessage", "RoomID", "bbsf.ChatRoom");
            DropForeignKey("bbsf.ChatRoom", "RoomTypeItemID", "bbsf.LookupItem");
            DropForeignKey("bbsf.ChatMessageSeenBy", "UserID", "bbsf.User");
            DropForeignKey("bbsf.ChatMessageSeenBy", "MessageID", "bbsf.ChatMessage");
            DropForeignKey("bbsf.ChatMessage", "RoomID", "bbsf.ChatRoom");
            DropForeignKey("bbsf.ChatMessage", "OwnerID", "bbsf.User");
            DropForeignKey("bbsf.ChatMessage", "MessageTypeItemID", "bbsf.LookupItem");
            DropForeignKey("bbsf.ChatMessageAttachment", "ChatMessage_ID", "bbsf.ChatMessage");
            DropForeignKey("bbsf.ChatMessageAttachment", "AttachmentTypeItemID", "bbsf.LookupItem");
            DropForeignKey("bbsf.PermissionSet_Permission", "PermissionID", "bbsf.Permission");
            DropForeignKey("bbsf.PermissionSet_Permission", "PermissionSetID", "bbsf.PermissionSet");
            DropForeignKey("bbsf.PermissionSet", "OrganizationID", "bbsf.Organization");
            DropForeignKey("bbsf.PermissionSet_HelpCenterItem", "HelpCenterItemID", "bbsf.HelpCenterItem");
            DropForeignKey("bbsf.PermissionSet_HelpCenterItem", "PermissionSetID", "bbsf.PermissionSet");
            DropForeignKey("bbsf.HelpCenterItem", "ParentID", "bbsf.HelpCenterItem");
            DropForeignKey("bbsf.HelpCenterItem", "LogoFileID", "bbsf.File");
            DropForeignKey("bbsf.File", "FolderID", "bbsf.LibraryFolder");
            DropForeignKey("bbsf.LibraryFolder", "ParentFolderID", "bbsf.LibraryFolder");
            DropForeignKey("bbsf.Permission", "OrganizationID", "bbsf.Organization");
            DropForeignKey("bbsf.LookupItem", "LookupID", "bbsf.Lookup");
            DropForeignKey("bbsf.Lookup", "LookupGroupID", "bbsf.LookupGroup");
            DropIndex("bbsf.PermissionSet_User", new[] { "UserID" });
            DropIndex("bbsf.PermissionSet_User", new[] { "PermissionSetID" });
            DropIndex("bbsf.WorkflowInstanceVariable_VariableLookup", new[] { "InstanceVariableID" });
            DropIndex("bbsf.WorkflowInstanceVariable_VariableLookup", new[] { "VariableLookupID" });
            DropIndex("bbsf.ChatRoom_User", new[] { "UserID" });
            DropIndex("bbsf.ChatRoom_User", new[] { "ChatRoomID" });
            DropIndex("bbsf.PermissionSet_Permission", new[] { "PermissionID" });
            DropIndex("bbsf.PermissionSet_Permission", new[] { "PermissionSetID" });
            DropIndex("bbsf.PermissionSet_HelpCenterItem", new[] { "HelpCenterItemID" });
            DropIndex("bbsf.PermissionSet_HelpCenterItem", new[] { "PermissionSetID" });
            DropIndex("bbsf.ImpersonationRule", new[] { "DestinationParticipantID" });
            DropIndex("bbsf.ImpersonationRule", new[] { "SourceParticipantID" });
            DropIndex("HangFire.State", new[] { "JobId" });
            DropIndex("HangFire.JobParameter", new[] { "JobId" });
            DropIndex("bbsf.FormsHubConnection", new[] { "UserId" });
            DropIndex("bbsf.PublicHoliday", new[] { "ImageFileID" });
            DropIndex("bbsf.PublicHoliday", new[] { "CountryID" });
            DropIndex("bbsf.PublicHoliday", new[] { "SysName" });
            DropIndex("bbsf.Configurations", new[] { "PermissionSetID" });
            DropIndex("bbsf.Configurations", new[] { "UserID" });
            DropIndex("bbsf.Configurations", new[] { "SelectedLookupID" });
            DropIndex("bbsf.Configurations", new[] { "ValueSourceID" });
            DropIndex("bbsf.Configurations", new[] { "ValueTypeID" });
            DropIndex("bbsf.Configurations", new[] { "ScopeItemID" });
            DropIndex("bbsf.ADMapping", new[] { "ADMappingTypeItemID" });
            DropIndex("bbsf.ADMapping", new[] { "ADConnectionID" });
            DropIndex("bbsf.ADConnection", new[] { "WelcomeTemplateID" });
            DropIndex("bbsf.ADConnection", new[] { "ADConnectionTypeItemID" });
            DropIndex("bbsf.ADConnection", new[] { "PermissionSetID" });
            DropIndex("bbsf.Participant", new[] { "WorkflowVariableID" });
            DropIndex("bbsf.Participant", new[] { "UserID" });
            DropIndex("bbsf.Participant", new[] { "PermissionSetID" });
            DropIndex("bbsf.Participant", new[] { "WorkflowActivityID" });
            DropIndex("bbsf.Participant", new[] { "ParticipantTypeItemID" });
            DropIndex("bbsf.ProviderAttribute", new[] { "ProviderId" });
            DropIndex("bbsf.UserInfo", new[] { "Token" });
            DropIndex("bbsf.UserInfo", new[] { "UserID" });
            DropIndex("bbsf.TemplateInfo", new[] { "EmailHeaderAndFooterTemplateID" });
            DropIndex("bbsf.TemplateInfo", new[] { "TemplateID" });
            DropIndex("bbsf.TemplateInfo", new[] { "LanguageModeItemID" });
            DropIndex("bbsf.Template", new[] { "OrganizationID" });
            DropIndex("bbsf.Template", new[] { "SysName" });
            DropIndex("bbsf.Template", new[] { "CategoryItemID" });
            DropIndex("bbsf.TemplateUnsubscribe", new[] { "UserID" });
            DropIndex("bbsf.TemplateUnsubscribe", new[] { "TemplateID" });
            DropIndex("bbsf.Workflow", new[] { "SysName" });
            DropIndex("bbsf.WorkflowLogVariable", new[] { "InstanceVariableID" });
            DropIndex("bbsf.WorkflowLogVariable", new[] { "LogID" });
            DropIndex("bbsf.WorkflowActivityOutcome", new[] { "NextActivityID" });
            DropIndex("bbsf.WorkflowActivityOutcome", new[] { "ActivityID" });
            DropIndex("bbsf.WorkflowActivityOutcome", new[] { "SysName" });
            DropIndex("bbsf.WorkflowLog", new[] { "CompletedByUserID" });
            DropIndex("bbsf.WorkflowLog", new[] { "ActivityOutcomeID" });
            DropIndex("bbsf.WorkflowLog", new[] { "ActivityID" });
            DropIndex("bbsf.WorkflowLog", new[] { "WorkflowVersionID" });
            DropIndex("bbsf.WorkflowLog", new[] { "InstanceID" });
            DropIndex("bbsf.WorkflowVersion", new[] { "WorkflowID" });
            DropIndex("bbsf.WorkflowActivityVariable", new[] { "VariableID" });
            DropIndex("bbsf.WorkflowActivityVariable", new[] { "ActivityID" });
            DropIndex("bbsf.WorkflowVariable", new[] { "Value_Identifier" });
            DropIndex("bbsf.WorkflowVariable", new[] { "VariableTypeItemID" });
            DropIndex("bbsf.WorkflowVariable", new[] { "DataTypeItemID" });
            DropIndex("bbsf.WorkflowVariable", new[] { "WorkflowVersionID" });
            DropIndex("bbsf.WorkflowVariable", new[] { "SysName" });
            DropIndex("bbsf.WorkflowVariableLookup", new[] { "VariableID" });
            DropIndex("bbsf.WorkflowInstanceVariable", new[] { "VariableID" });
            DropIndex("bbsf.WorkflowInstanceVariable", new[] { "InstanceID" });
            DropIndex("bbsf.WorkflowInstanceComment", new[] { "UserID" });
            DropIndex("bbsf.WorkflowInstanceComment", new[] { "ActivityID" });
            DropIndex("bbsf.WorkflowInstanceComment", new[] { "InstanceID" });
            DropIndex("bbsf.WorkflowError", new[] { "ActivityID" });
            DropIndex("bbsf.WorkflowError", new[] { "InstanceID" });
            DropIndex("bbsf.WorkflowInstance", new[] { "InstanceStatusItemID" });
            DropIndex("bbsf.WorkflowInstance", new[] { "StartedByUserID" });
            DropIndex("bbsf.WorkflowInstance", new[] { "CurrentActivityID" });
            DropIndex("bbsf.WorkflowInstance", new[] { "WorkflowVersionID" });
            DropIndex("bbsf.WorkflowInstanceTask", new[] { "ActivityID" });
            DropIndex("bbsf.WorkflowInstanceTask", new[] { "WorkflowInstanceID" });
            DropIndex("bbsf.TMETask", new[] { "CorrelationTypeItemID" });
            DropIndex("bbsf.TMETask", new[] { "AssignedToUserID" });
            DropIndex("bbsf.TMETask", new[] { "TaskOutcomeItemID" });
            DropIndex("bbsf.TMETask", new[] { "TaskStatusItemID" });
            DropIndex("bbsf.TMETask", new[] { "WFInstanceTaskID" });
            DropIndex("bbsf.Department", new[] { "SectorID" });
            DropIndex("bbsf.UserConnection", new[] { "UserID" });
            DropIndex("bbsf.ChatUnreadMessage", new[] { "UserID" });
            DropIndex("bbsf.ChatUnreadMessage", new[] { "RoomID" });
            DropIndex("bbsf.ChatMessageSeenBy", new[] { "MessageID" });
            DropIndex("bbsf.ChatMessageSeenBy", new[] { "UserID" });
            DropIndex("bbsf.ChatMessageAttachment", new[] { "ChatMessage_ID" });
            DropIndex("bbsf.ChatMessageAttachment", new[] { "AttachmentTypeItemID" });
            DropIndex("bbsf.ChatMessage", new[] { "OwnerID" });
            DropIndex("bbsf.ChatMessage", new[] { "MessageTypeItemID" });
            DropIndex("bbsf.ChatMessage", new[] { "RoomID" });
            DropIndex("bbsf.ChatRoom", new[] { "RoomTypeItemID" });
            DropIndex("bbsf.User", new[] { "ManagerUserID" });
            DropIndex("bbsf.User", new[] { "DepartmentID" });
            DropIndex("bbsf.User", new[] { "SmallImageFileID" });
            DropIndex("bbsf.User", new[] { "LargeImageFileID" });
            DropIndex("bbsf.User", new[] { "OriginalImageFileID" });
            DropIndex("bbsf.User", new[] { "Username" });
            DropIndex("bbsf.User", new[] { "OrganizationID" });
            DropIndex("bbsf.LibraryFolder", new[] { "ParentFolderID" });
            DropIndex("bbsf.File", new[] { "FolderID" });
            DropIndex("bbsf.File", new[] { "ID_GUID" });
            DropIndex("bbsf.HelpCenterItem", new[] { "LogoFileID" });
            DropIndex("bbsf.HelpCenterItem", new[] { "ParentID" });
            DropIndex("bbsf.PermissionSet", new[] { "OrganizationID" });
            DropIndex("bbsf.PermissionSet", new[] { "SysName" });
            DropIndex("bbsf.Permission", new[] { "OrganizationID" });
            DropIndex("bbsf.Permission", new[] { "SysName" });
            DropIndex("bbsf.Provider", new[] { "OrganizationID" });
            DropIndex("bbsf.Provider", new[] { "Name" });
            DropIndex("bbsf.Provider", new[] { "ProviderTypeItemID" });
            DropIndex("bbsf.Lookup", new[] { "SysName" });
            DropIndex("bbsf.Lookup", new[] { "LookupGroupID" });
            DropIndex("bbsf.LookupItem", new[] { "LookupID" });
            DropIndex("bbsf.LookupItem", new[] { "SysName" });
            DropIndex("bbsf.WorkflowActivity", new[] { "ConditionOperatorTypeItemID" });
            DropIndex("bbsf.WorkflowActivity", new[] { "ConditionRHSVariableID" });
            DropIndex("bbsf.WorkflowActivity", new[] { "ConditionLHSVariableID" });
            DropIndex("bbsf.WorkflowActivity", new[] { "TemplateID" });
            DropIndex("bbsf.WorkflowActivity", new[] { "ActivityTypeItemID" });
            DropIndex("bbsf.WorkflowActivity", new[] { "WorkflowVersionID" });
            DropIndex("bbsf.WorkflowActivity", new[] { "SysName" });
            DropTable("bbsf.PermissionSet_User");
            DropTable("bbsf.WorkflowInstanceVariable_VariableLookup");
            DropTable("bbsf.ChatRoom_User");
            DropTable("bbsf.PermissionSet_Permission");
            DropTable("bbsf.PermissionSet_HelpCenterItem");
            DropTable("dbo.Localization");
            DropTable("bbsf.ImpersonationRule");
            DropTable("HangFire.Set");
            DropTable("HangFire.Server");
            DropTable("HangFire.Schema");
            DropTable("HangFire.List");
            DropTable("HangFire.JobQueue");
            DropTable("HangFire.State");
            DropTable("HangFire.Job");
            DropTable("HangFire.JobParameter");
            DropTable("HangFire.Hash");
            DropTable("HangFire.Counter");
            DropTable("HangFire.AggregatedCounter");
            DropTable("bbsf.FormsHubConnection");
            DropTable("bbsf.PublicHoliday");
            DropTable("bbsf.Country");
            DropTable("bbsf.Configurations");
            DropTable("bbsf.ClientMachine");
            DropTable("bbsf.BTimeZone");
            DropTable("bbsf.ADMapping");
            DropTable("bbsf.ADConnection");
            DropTable("bbsf.Participant");
            DropTable("bbsf.ProviderAttribute");
            DropTable("bbsf.UserInfo");
            DropTable("bbsf.EmailHeaderAndFooterTemplate");
            DropTable("bbsf.TemplateInfo");
            DropTable("bbsf.Template");
            DropTable("bbsf.TemplateUnsubscribe");
            DropTable("bbsf.Workflow");
            DropTable("bbsf.WorkflowLogVariable");
            DropTable("bbsf.WorkflowActivityOutcome");
            DropTable("bbsf.WorkflowLog");
            DropTable("bbsf.WorkflowVersion");
            DropTable("bbsf.WorkflowActivityVariable");
            DropTable("bbsf.WorkflowVariable");
            DropTable("bbsf.WorkflowVariableLookup");
            DropTable("bbsf.WorkflowInstanceVariable");
            DropTable("bbsf.WorkflowInstanceComment");
            DropTable("bbsf.WorkflowError");
            DropTable("bbsf.WorkflowInstance");
            DropTable("bbsf.WorkflowInstanceTask");
            DropTable("bbsf.TMETask");
            DropTable("bbsf.Sector");
            DropTable("bbsf.Department");
            DropTable("bbsf.UserConnection");
            DropTable("bbsf.ChatUnreadMessage");
            DropTable("bbsf.ChatMessageSeenBy");
            DropTable("bbsf.ChatMessageAttachment");
            DropTable("bbsf.ChatMessage");
            DropTable("bbsf.ChatRoom");
            DropTable("bbsf.User");
            DropTable("bbsf.LibraryFolder");
            DropTable("bbsf.File");
            DropTable("bbsf.HelpCenterItem");
            DropTable("bbsf.PermissionSet");
            DropTable("bbsf.Permission");
            DropTable("bbsf.Organization");
            DropTable("bbsf.Provider");
            DropTable("bbsf.LookupGroup");
            DropTable("bbsf.Lookup");
            DropTable("bbsf.LookupItem");
            DropTable("bbsf.WorkflowActivity");
            DropTable("bbsf._BMigrationHistory");
        }
    }
}
