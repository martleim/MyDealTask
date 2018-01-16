using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyDealTask.Contracts
{
    public interface IPNLProcessor<L, NL> where L:List<NL>
    {
        L ProcessPNL(StringReader list);
        NL ProcessNameLine(string line);
        string ProcessCodeLine(string line);
        bool CheckNameLine(string line);
        bool CheckCodeLine(string line);

    }

}
