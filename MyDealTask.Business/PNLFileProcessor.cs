using MyDealTask.Contracts;
using MyDealTask.Model;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Text.RegularExpressions;

namespace MyDealTask.Business
{

    public class PNLFileProcessor : IPNLProcessor<List<PassengerRecord>, PassengerRecord>
    {

        const string NameRegEx = @"1([A-Z])\w+\/([A-Z])\w+-([A-Z])\w+ .([L])/([A-Z])\w+";
        const string CodeRegEx = @".R\/(\w{4}) (\w{3}) (\w{13})\/1";

        const string NameSeparatorRegEx = @"(1)|(\/)|(-)|(.[L]\/)";

        public bool CheckCodeLine(string line)
        {
            return (new Regex(CodeRegEx, RegexOptions.IgnoreCase)).IsMatch(line);
        }

        public bool CheckNameLine(string line)
        {
            return (new Regex(NameRegEx, RegexOptions.IgnoreCase)).IsMatch(line);
        }

        public string ProcessCodeLine(string line)
        {
            return line;
        }

        public PassengerRecord ProcessNameLine(string line)
        {
            var processed = (new Regex(NameSeparatorRegEx, RegexOptions.IgnoreCase)).Split(line);
            return new PassengerRecord() { FirstName = processed[4], LastName = processed[2], RecordLocator = new RecordLocator() { Code = processed[8] } };
        }

        public List<PassengerRecord> ProcessPNL(StringReader list)
        {
            List<PassengerRecord> PRList = new List<PassengerRecord>();
            int lineNumber = 1;
            string line = string.Empty;
            line = list.ReadLine();
            while (line != null)
            {
                if (!string.Empty.Equals(line))
                {
                    if (CheckNameLine(line))
                    {
                        PRList.Add( ProcessNameLine(line));
                    }else if (CheckCodeLine(line))
                    {
                        PRList.Last().LineData = ProcessCodeLine(line);
                    }else
                    {
                        throw new Exception(string.Format("The file has an error on line {0}:{1}", lineNumber, line));
                    }
                }
                line = list.ReadLine();
                lineNumber++;
            }
            return PRList;
        }
        
    }
}
