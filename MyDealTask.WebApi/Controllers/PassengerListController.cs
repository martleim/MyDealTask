using MyDealTask.Contracts;
using MyDealTask.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MyDealTask.WebApi.Controllers
{
    public class PassengerListController : ApiController
    {
        private IPNLProcessor<System.Collections.Generic.List<PassengerRecord>, PassengerRecord> Processor;
        public PassengerListController(IPNLProcessor<System.Collections.Generic.List<PassengerRecord>, PassengerRecord> processor) {
            Processor = processor;
        }

        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
            var waky=0;
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
