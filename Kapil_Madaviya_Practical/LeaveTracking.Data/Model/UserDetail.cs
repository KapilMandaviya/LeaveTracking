using System;
using System.Collections.Generic;

#nullable disable

namespace LeaveTracking.Data.Model
{
    public partial class UserDetail
    {
        //public UserDetail()
        //{
        //    LeaveStatuses = new HashSet<LeaveStatus>();
        //}

        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfJoin { get; set; }
        public string Address { get; set; }
        public decimal PhoneNo { get; set; }
        public string Email { get; set; }
        public decimal LeaveBalance { get; set; }
        public string ExtraDetail { get; set; }
        public string Role { get; set; }
        public string Password { get; set; }

        //public virtual ICollection<LeaveStatus> LeaveStatuses { get; set; }
    }
}
