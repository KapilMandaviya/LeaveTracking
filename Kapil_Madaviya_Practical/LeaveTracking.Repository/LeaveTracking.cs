using LeaveTracking.Data.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LeaveTracking.Repository.EncryptPass;
using System.Text.RegularExpressions;
using Microsoft.Data.SqlClient;

namespace LeaveTracking.Repository
{
    public class LeaveTracking : ILeaveTracking
    {
        private readonly LeaveTrackingContext _context;
        public LeaveTracking(LeaveTrackingContext leaveTrackingContext)
        {
            _context = leaveTrackingContext;
        }
        public async Task<UserDetail> checkUserLogin(UserDetail user)
        {
            var userdetail = await _context.UserDetails.FirstOrDefaultAsync(x => x.Email== user.Email);
            if (userdetail == null)
            {
                user.Email = "";
                user.Password = "";

                return user;
            }
            var deconde = Enncryption.DecodeFrom64(userdetail.Password);
            if (!(Enncryption.DecodeFrom64(userdetail.Password) == user.Password))
            {
                user.Email = "";
                user.Password= "";

                return user;
            }

            return userdetail;
        }

        public async Task<bool> submitRegister(UserDetail user)
        {
            if (await checkUsernameExistvalidation(user.Email))
            {
                return false;
            }
            user.Password = EncryptPass.Enncryption.EncodePasswordToBase64(user.Password);
            _context.UserDetails.Add(user);
            await _context.SaveChangesAsync();

            return true;

        }
        public string checkPasswordstrength(string password)
        {
            StringBuilder builder = new StringBuilder();
            if (password.Length < 8)
            {
                builder.Append("Minimum Password Length Shuold be 8 !" + Environment.NewLine);
            }
            if (!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]")))
            {
                builder.Append("Password Shuold be Alphanumeric !" + Environment.NewLine);
            }
            if (!(Regex.IsMatch(password, "[<,>,@,!,#,$,%,^,&,*,(,),_,+,\\[,\\],{,},?,:,;,|,',\\,.,/,~,`,-,=]")))
            {
                builder.Append("Password Shuold be contain Specail Characters!" + Environment.NewLine);
            }
            return builder.ToString();
        }

        public Task<bool> checkUsernameExistvalidation(string username)
      => _context.UserDetails.AnyAsync(x => x.Email == username);

        public async Task<bool> leaveRequestInsert(LeaveStatus leave)
        {

            leave.Status = "Applied";
            leave.DateOfReq = DateTime.Now.Date;
            _context.LeaveStatuses.Add(leave);
            await _context.SaveChangesAsync();

            return true;

        }

        public async Task<List<LeaveStatus>> GetLeaveStatussListByUser(int userId)
        {
            var leaveStatus = new List<LeaveStatus>();


            leaveStatus = await _context.LeaveStatuses.FromSqlRaw("exec SP_GetLeaveStatussListByUser @userId", new SqlParameter ("@userId", userId)).ToListAsync();
     
            return leaveStatus;
        }

        public async Task<List<LeaveStatus>> GetLeaveStatusList()
        {
            var query = from LS in _context.LeaveStatuses
                        join UD in _context.UserDetails on LS.UserId equals UD.UserId
                        select new
                        {
                            leaveId = LS.LeaveId,
                            leaveType = LS.LeaveType,
                            leaveBalance = UD.LeaveBalance,
                            leaveReason = LS.LeaveReason,
                            startDate = LS.StartDate,
                            endDate = LS.EndDate,
                            dateOfReq = LS.DateOfReq,
                            status = LS.Status,
                            userId = LS.UserId,
                            Name = UD.FirstName + " " + UD.LastName
                        };


            var leaveStatus1 = new List<LeaveStatus>();
            // leaveStatus = await _context.LeaveStatuses.FromSqlRaw("exec SP_GetLeaveStatussList").ToListAsync();
            var leaveStatus =query.ToList();

            leaveStatus1=leaveStatus.Select(p => new LeaveStatus
            {
                DateOfReq = p.dateOfReq,
                EndDate = p.endDate,
                LeaveId = p.leaveId,
                LeaveReason = p.leaveReason,
                LeaveType = p.leaveType,
                Name = p.Name,
                StartDate = p.startDate,
                Status = p.status,
                UserId = p.userId



            }).ToList();
            return leaveStatus1;

        }

        public async Task<bool> approvedOrRejectLeaveupdate(LeaveStatus leave)
        {

            string sqlQur = "exec SP_approvedOrRejectLeaveupdate " +
            "@userId=" + leave.UserId+ "," +
            "@status='" + leave.Status + "'," +
            "@leaveId =" + leave.LeaveId + "";
            
            
            await _context.Database.ExecuteSqlRawAsync(sqlQur);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
