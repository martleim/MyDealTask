using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Loader;
using System.IO;
using Microsoft.Extensions.DependencyInjection;
using System.Composition.Hosting;
using System.Composition;


namespace GenericAirways.DependencyResolver
{
    public class ComponentLoader
    {
        public static void LoadContainer(/*IUnityContainer container, */string path, string pattern)
        {

            var assemblies = Directory.GetFiles( path, pattern )
                            .Select(  AssemblyLoadContext.Default.LoadFromAssemblyPath );

            var configuration = new ContainerConfiguration().WithAssemblies( assemblies );
            var container = configuration.CreateContainer();

            
            /*var dirCat = new DirectoryCatalog(path, pattern);*/
            var importDef = (IComponent)_host.Value.GetExport( new CompositionContract( typeof( object ), typeof( IComponent ).Name ) );//BuildImportDefinition();*/
            try
            {
                IEnumerable<Export> exports = container.GetExports(importDef);
                IEnumerable<IComponent> modules = exports.Select(export => export.Value as IComponent).Where(m => m != null);

                var registerComponent = new RegisterComponent(container);
                foreach (IComponent module in modules)
                {
                    module.SetUp(registerComponent);
                }
            }
            catch (ReflectionTypeLoadException typeLoadException)
            {
                var builder = new StringBuilder();
                foreach (Exception loaderException in typeLoadException.LoaderExceptions)
                {
                    builder.AppendFormat("{0}\n", loaderException.Message);
                }

                throw new TypeLoadException(builder.ToString(), typeLoadException);
            }
        }

        /*private static ImportDefinition<T> BuildImportDefinition(){
            return (T)_host.Value.GetExport( new CompositionContract( typeof( object ), typeof( T ).Name ) );

            //return new ImportDefinition( def => true, typeof(IComponent).FullName, ImportCardinality.ZeroOrMore, false, false);
        }*/
    }

    internal class RegisterComponent : IRegisterComponent
    {
        private readonly IServiceCollection _services;

        public RegisterComponent(IServiceCollection services)
        {
            this._services = services;
            //Register interception behaviour if any
        }

        public void RegisterType<TFrom, TTo>(bool withInterception = false) where TTo : class, TFrom
                                                                            where TFrom : class
        {
            if (withInterception)
            {
                //register with interception
            }
            else
            {
                this._services.AddTransient<TFrom, TTo>();
            }
        }

        public void RegisterTypeWithControlledLifeTime<TFrom, TTo>(bool withInterception = false) where TTo : class, TFrom
                                                                                                    where TFrom : class
        {
            //this._services.AddTransient<TFrom, TTo>();
            //this._services.RegisterType<TFrom, TTo>(new ContainerControlledLifetimeManager());
        }
    }
}
