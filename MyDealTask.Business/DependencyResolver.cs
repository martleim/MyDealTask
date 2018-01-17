using MyDealTask.Contracts;
using MyDealTask.DependencyResolver;
using MyDealTask.Model;
using System.Collections.Generic;
using System.ComponentModel.Composition;


namespace MyDealTask.Business
{
    [Export(typeof(IComponent))]
    public class DependencyResolver : IComponent
    {
        public void SetUp(IRegisterComponent registerComponent)
        {
            registerComponent.RegisterType<IPNLProcessor<PNLFile, PassengerRecord, string>, PNLFileProcessor>();
            registerComponent.RegisterType<IPNLFileDataLogic, PNLFileDataLogic>();
        }
    }
}
