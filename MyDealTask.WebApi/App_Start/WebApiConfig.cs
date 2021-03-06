﻿using MyDealTask.DependencyResolver;
using MyDealTask.WebApi.Helpers;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Unity;

namespace MyDealTask.WebApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            var container = new UnityContainer();
            ComponentLoader.LoadContainer(container, ".\\bin", "MyDealTask.*.dll");
            config.DependencyResolver = new UnityResolver(container);

            //JSON FORMATTER
            config.Formatters.JsonFormatter.SerializerSettings = new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore,
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
                PreserveReferencesHandling = PreserveReferencesHandling.Objects
            };

            //ENABLE CORS
            config.EnableCors();

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            // Error handling
            config.Filters.Add(new CatchAllExceptionFilterAttribute());
        }
    }
}
