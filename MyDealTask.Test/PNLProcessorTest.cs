using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MyDealTask.Business;
using System.IO;
using System.Collections.Generic;
using MyDealTask.Model;

namespace MyDealTask.Test
{
    [TestClass]
    public class PNLProcessorTest
    {
        #region testCases
        const string validList = @"1ATKINSON/KARENMRS-M2 .L/LVKBTB
.R/TKNE HK1 9244501227666/1
1BALL/LINDAANNMRS-E2 .L/LVHZDG
.R/TKNE HK1 9249745692287/1
1BALL/STEPHENJOHNMR-E2 .L/LVHZDG
.R/TKNE HK1 9249745692286/1
1CLARKE/MICHAELMR-K2 .L/LVK6HA
.R/TKNE HK1 9244501213584/1
1CLARKE/TRACEYMRS-K2 .L/LVK6HA
.R/TKNE HK1 9244501213586/1
1TAYLOR/HAYLEYMRS-B2 .L/LVGVUP
.R/TKNE HK1 9244501028080/1";

        const string inValidList = @"1ATKINSON/KARENMRS-M2 .L/LVKBTB
.R/TKNE HK1 9244501227666/1
1BALL/LINDAANNMRS-E2 .L/LVHZDG
.R/TKNE HK1 9249745692287/1
1BALL/STEPHENJOHNMR-E2 .L/LVHZDG
.R/TKNE HK1 9249745692286/1
1CLARKE/MICHAELMR-K2 .L/LVK6HA
.R/TKNE HK1 9244501213584/1
1CLARKE/TRACEYMRS-K2 .L/LVK6HA
.R/TKNE HK1 9244501213586/1
1CLIFFORD/DAVIDMR .L/LVKBCB
.R/TKNE HK1 9244501226608/1
1TAYLOR/HAYLEYMRS-B2 .L/LVGVUP
.R/TKNE HK1 9244501028080/1";

        const string validNameLine = "1ATKINSON/KARENMRS-M2 .L/LVKBTB";
        const string validCodeLine = ".R/TKNE HK1 9244501227666/1";

        #endregion

        [TestMethod]
        public void NameLine_Valid_Validates()
        {
            var logic = new PNLFileProcessor();
            var result = logic.CheckNameLine(validNameLine);
            Assert.IsFalse(!result);
        }

        [TestMethod]
        public void CodeLine_Valid_Validates()
        {
            var logic = new PNLFileProcessor();
            var result = logic.CheckCodeLine(validCodeLine);
            Assert.IsFalse(!result);
        }

        [TestMethod]
        public void NameLine_Valid_IsProcessed()
        {
            var logic = new PNLFileProcessor();
            var result = logic.ProcessNameLine(validNameLine);
            Assert.AreEqual(result.FirstName, "KARENMRS");
            Assert.AreEqual(result.LastName, "ATKINSON");
            Assert.AreEqual(result.RecordLocator?.Code, "LVKBTB");
        }

        [TestMethod]
        public void CodeLine_Valid_IsProcessed()
        {
            var logic = new PNLFileProcessor();
            var result = logic.ProcessCodeLine(validCodeLine);
            Assert.AreEqual(result, validCodeLine);
        }

        [TestMethod]
        public void PNL_InValid_IsProcessedCorrectly()
        {
            var logic = new PNLFileProcessor();
            List<PassengerRecord> result=null;
            try
            {
                result = logic.ProcessPNL(new StringReader(inValidList));
            }
            catch (Exception) { }
            Assert.AreEqual(result, null);
        }
        [TestMethod]
        public void PNL_Valid_IsProcessedCorrectly()
        {
            var logic = new PNLFileProcessor();
            var result = logic.ProcessPNL(new StringReader(validList));
            Assert.AreEqual(result.Count, 6);
        }
    }
}
