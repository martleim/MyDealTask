//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MyDealTask.Model
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Serialization;
    using System.ComponentModel.DataAnnotations;
    
    [DataContract]
    public partial class C__RefactorLog
    {
        
    	[Key()]
    	[Required(ErrorMessage = "OperationKey is required.")]
    	[DataMember(Name = "OperationKey", IsRequired = true)]
    	public System.Guid OperationKey { get; set; }
    }
}
