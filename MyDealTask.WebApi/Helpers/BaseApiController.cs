﻿using MyDealTask.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;

namespace MyDealTask.WebApi.Helpers
{
    public class BaseApiController : ApiController
    {

        protected override OkNegotiatedContentResult<T> Ok<T>(T content)
        {
            return Ok<T>(content);
        }

        protected OkNegotiatedContentResult<T> Ok<T>(T content, int depthLevel=2)
        {
            return base.Ok<T>((T)DeepCopy.CloneInternal(content, depthLevel));
        }

    }
}