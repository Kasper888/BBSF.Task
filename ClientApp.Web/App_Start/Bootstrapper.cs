using Autofac;
using Autofac.Integration.Mvc;
using Bnsights.CoreLib.Utils;
using ClientApp.BLL.Migrations;
using ClientApp.BLL.Model;
using ClientApp.BLL;
using FluentValidation;
using FluentValidation.Mvc;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ClientApp.Web.App_Start
{
    public sealed class Bootstrapper
    {
        public static IContainer Container { get; private set; }
        public static T ResolveWeb<T>()
        {
            return Container.Resolve<T>();
        }
        public static object ResolveWeb(Type t)
        {
            return System.Web.Mvc.DependencyResolver.Current.GetService(t);
        }
        public static void Load()
        {
            var builder = new Autofac.ContainerBuilder();

            builder.RegisterModule<Bnsights.CoreLib.BootstrapModule>();

            System.Data.Entity.Database.SetInitializer(new Bnsights.CoreLib.Migrations.CustomDatabaseInitializer<ClientAppContext, BLL.Migrations.ClientConfiguration>());

            builder.RegisterType<BLL.DevelopmentMerger>().As<Bnsights.CoreLib.Globalization.IDbResMerger>();
            builder.RegisterType<ClientAppContext>().As<DbContext>().As<ClientAppContext>().InstancePerLifetimeScope();
            builder.RegisterType<ClientAppContext>().Keyed<DbContext>("unfiltered").As<Bnsights.CoreLib.DAL.IUnfilteredContext>().InstancePerLifetimeScope();


            builder.RegisterType<AppConfig>().AsSelf().As<BaseConfig>().SingleInstance();
            var clientAppAssembly = typeof(ClientAppContext).Assembly;
            builder.RegisterAssemblyTypes(clientAppAssembly).Where(t => t.Name.EndsWith("Exporter")).AsSelf().InstancePerLifetimeScope();
            builder.RegisterAssemblyTypes(clientAppAssembly).Where(t => t.Name.EndsWith("Logic")).AsSelf().InstancePerLifetimeScope();
            builder.RegisterAssemblyTypes(clientAppAssembly).Where(t => t.Name.EndsWith("Validator")).AsImplementedInterfaces().InstancePerLifetimeScope();

            builder.RegisterType<BLL.Logic.ClientLookupItemLogic>().As<Bnsights.CoreLib.BLL.ILookupItemLogic>();
            builder.RegisterType<BLL.Logic.ClientBBSFUserLogic>().As<Bnsights.CoreLib.BLL.IBBSFUserLogic>();
            builder.RegisterType<BLL.Logic.ClientFolderAutorization>().As<Bnsights.CoreLib.BLL.IFolderAuthorization>();
            builder.RegisterType<BLL.Logic.ClientLayoutResolver>().As<Bnsights.CoreLib.BLL.ILayoutResolver>();
            builder.RegisterType<BLL.Logic.ClientLookupLogic>().As<Bnsights.CoreLib.BLL.ILookupLogic>();
            builder.RegisterType<BLL.Logic.Client_AccountManagementLogic>().As<Bnsights.CoreLib.BLL.IAccountManagementLogic>();
            
            // Used when not using CustomUserIdentity
            //Func<IComponentContext, Bnsights.CoreLib.Identity.UserIdentity> userDelegate = (c) =>
            //{
            //    if (HttpContext.Current == null)
            //        return new Bnsights.CoreLib.Identity.UserIdentity();

            //    var identity = HttpContext.Current.User as Bnsights.CoreLib.Identity.UserIdentity;

            //    if (identity == null || identity.IsAnonymous)
            //        return new Bnsights.CoreLib.Identity.UserIdentity();

            //    return identity;
            //};
            //builder.Register(userDelegate).As<Bnsights.CoreLib.Identity.UserIdentity>();

            Func<IComponentContext, CustomUserIdentity> userDelegate = (c) =>
            {
                if (HttpContext.Current == null)
                    return new CustomUserIdentity();

                var identity = HttpContext.Current.User as CustomUserIdentity;

                if (identity == null || identity.IsAnonymous)
                    return new CustomUserIdentity();

                return identity;
            };
            builder.Register(userDelegate).As<CustomUserIdentity>().As<Bnsights.CoreLib.Identity.UserIdentity>();

            builder.RegisterControllers(typeof(MvcApplication).Assembly).InstancePerDependency();
            builder.RegisterControllers(typeof(Bnsights.Mvc.BaseController).Assembly).InstancePerDependency();
            //builder.RegisterFilterProvider();
            //builder.RegisterAssemblyModules(typeof(MvcApplication).Assembly);
            builder.RegisterModule<AutofacWebTypesModule>();


            Container = builder.Build();

            // FluentValidation wire up to MVC
            var fluentValidationModelValidatorProvider = new FluentValidationModelValidatorProvider()
            {
                AddImplicitRequiredValidator = false,
                ValidatorFactory = new AutofacValidatorFactory()
            };
            //fluentValidationModelValidatorProvider.AddImplicitRequiredValidator = false;
            System.Web.Mvc.DataAnnotationsModelValidatorProvider.AddImplicitRequiredAttributeForValueTypes = false;
            System.Web.Mvc.ModelValidatorProviders.Providers.Add(fluentValidationModelValidatorProvider);
            // MVC - Get your HttpConfiguration.
            //GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(Container);


            // Finalize Autofac
            var AutofacDependencyResolver = new AutofacDependencyResolver(Container);
            System.Web.Mvc.DependencyResolver.SetResolver(AutofacDependencyResolver);
            Bnsights.CoreLib.BLL.ProviderLogic.LoadProviders(Container);
        }
    }

}