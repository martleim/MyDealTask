using MyDealTask.Contracts;
using MyDealTask.Model;
using MyDealTask.WebApi.Helpers;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace MyDealTask.WebApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PassengerListController : ApiController
    {

        private IPNLProcessor<PNLFile, PassengerRecord, string> Processor;
        private IPNLFileDataLogic PNLFileDataLogic;

        public PassengerListController(IPNLProcessor<PNLFile, PassengerRecord, string> processor,
            IPNLFileDataLogic pNLFileDataLogic) {

            Processor = processor;
            PNLFileDataLogic = pNLFileDataLogic;
        }

        public IHttpActionResult Get()
        {
            return Ok(PNLFileDataLogic.GetAll());
        }

        // GET api/values/5
        public IHttpActionResult Get(int id)
        {
            return Ok(PNLFileDataLogic.GetAll().First(pnlf=>pnlf.Id==id));
        }

        // PUT api/values/5
        public IHttpActionResult Put(int id, PNLFile value)
        {
            value.Id = id;
            PNLFileDataLogic.Update(value);
            return Ok();
        }

        // DELETE api/values/5
        public IHttpActionResult Delete(int id)
        {
            PNLFileDataLogic.Remove(new PNLFile() { Id = id });
            return Ok();
        }

        // POST api/values

        [ImportFileParamType.SwaggerFormAttribute("TXT", "Upload pdf file")]
        public IHttpActionResult Post()
        {
            var files = GetFiles();
            if (files != null && files.Count > 0)
            {
                StringReader sr = new StringReader(new StreamReader(files.Get(0).InputStream).ReadToEnd());
                var processed = Processor.ProcessPNL(sr);
                PNLFileDataLogic.SavePnlFile(processed);
                processed.File = new BinaryReader(files.Get(0).InputStream).ReadBytes(files.Get(0).ContentLength);
                return Ok(processed.RecordLocator.GroupBy(rl=>rl.Code).Select(g=> new {
                    Code = g.Key,
                    PassengerRecords = g.SelectMany(g2=>g2.PassengerRecord)
                }));
            }
            return Ok();
        }

        private HttpFileCollection GetFiles()
        {

            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count < 1)
            {
                return null;
            }

            return httpRequest.Files;
        }
        
    }
}
