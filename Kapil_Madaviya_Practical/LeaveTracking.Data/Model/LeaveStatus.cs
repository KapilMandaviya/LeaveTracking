using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace LeaveTracking.Data.Model
{
    public partial class LeaveStatus
    {
        public int LeaveId { get; set; }
        public int UserId { get; set; }
        public string LeaveType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime DateOfReq { get; set; }
        public string LeaveReason { get; set; }
        public string Status { get; set; }

        [NotMapped]
        public string? Name { get; set; }

        public virtual UserDetail User { get; set; }
    }
}
