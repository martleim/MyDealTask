using MyDealTask.Contracts;
using MyDealTask.DependencyResolver;
using MyDealTask.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyDealTask.Business
{
        [Export(typeof(IComponent))]
        public class DependencyResolver : IComponent
        {
            public void SetUp(IRegisterComponent registerComponent)
            {
            registerComponent.RegisterType<Contracts.IPNLProcessor<List<PassengerRecord>, PassengerRecord>, PNLFileProcessor>();
            }
        }
}
