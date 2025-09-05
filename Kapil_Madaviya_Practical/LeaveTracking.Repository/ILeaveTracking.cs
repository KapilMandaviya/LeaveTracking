using LeaveTracking.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeaveTracking.Repository
{
    public interface ILeaveTracking
    {
        Task<List<LeaveStatus>> GetLeaveStatusList();
        Task<List<LeaveStatus>> GetLeaveStatussListByUser(int userId);
        Task<bool> submitRegister(UserDetail user);
        Task<bool> leaveRequestInsert(LeaveStatus leave);
        Task<bool> approvedOrRejectLeaveupdate(LeaveStatus leave);

        string checkPasswordstrength(string password);
        Task<bool> checkUsernameExistvalidation(string username);
        Task<UserDetail> checkUserLogin(UserDetail user);

        



    }
}
