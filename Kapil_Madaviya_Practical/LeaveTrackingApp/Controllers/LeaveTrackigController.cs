using LeaveTracking.Data.Model;
using LeaveTracking.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace LeaveTrackingApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveTrackigController : ControllerBase
    {
        private readonly ILeaveTracking tracking;
        public LeaveTrackigController(ILeaveTracking tracking)
        {
            this.tracking = tracking;
        }

        [HttpPost("authenticateLogin")]
        public async Task<IActionResult> authenticateLogin(UserDetail user)
        {
            try
            {
                if (user == null)
                    return BadRequest(new { message = "Please Enter valid Username" });

                var Userlogin = await tracking.checkUserLogin(user);
                
                

                string? message;
                string? Token="";
                if (Userlogin.Email!="")
                {
                     Token = CreatejwtToken(Userlogin);

                    message = "Login SuccessFully";
                    
                }
                
                else message = "Username or Password is wrong";

                return Ok(new
                {
                    message = message,
                    UserDetail = Userlogin,
                    Token = Token

                }) ;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        [HttpPost("SubmitUser")]
        public async Task<IActionResult> submitUser(UserDetail user)
        {

            var pass = tracking.checkPasswordstrength(user.Password);
            
            if (!string.IsNullOrEmpty(pass))
            {
                return BadRequest(new { Message = pass });
            }

            
            var result = await tracking.submitRegister(user);
            string? message;
            if (result) message = "inserted";
            else message = "email already Exist";

            return Ok(new
            {
                message = message

            });
        }
        [HttpPost("LeaveRequestInsert")]
        public async Task<IActionResult> LeaveRequestInsert(LeaveStatus leave)
        {

            if (leave == null)
            {
                return BadRequest("Data Not propered");
            }

            var result = await tracking.leaveRequestInsert(leave);
            string? message;
            if (result) message = "inserted";
            else message = "some error are fired";

            return Ok(new
            {
                message = message

            });
        }
        [HttpGet("getLeveStatusList")]
        public IActionResult getLeveStatusList()
        {
            var leaveStatuses = tracking.GetLeaveStatusList();
            
            return Ok(leaveStatuses.Result);
        }
        [HttpGet("getLeveStatusListByUser/{userId}")]
        public IActionResult getLeveStatusListByUser(int userId)
        {
            var leaveStatuses= tracking.GetLeaveStatussListByUser(userId);

            return Ok(leaveStatuses.Result);
        }
        [HttpPost("LeaveApproveOrRejectUpdate")]
        public async Task<IActionResult> LeaveApproveOrRejectUpdate(LeaveStatus leave)
        {
            
           
            var result = await tracking.approvedOrRejectLeaveupdate(leave);
            string? message;
            if (result) message = "Record "+leave.Status;
            else message = "some error are fired";

            return Ok(new
            {
                message = message

            });
        }
        private string CreatejwtToken(UserDetail employee)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("JaiShreeKrishna..");
            var identity = new ClaimsIdentity(new Claim[] {
                new Claim(ClaimTypes.Role,employee.Role),
                new Claim(ClaimTypes.Name,$"{employee.Email}")
            });
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var tokenDescripter = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddMinutes(10),
                SigningCredentials = credentials

            };
            var token = jwtTokenHandler.CreateToken(tokenDescripter);

            return jwtTokenHandler.WriteToken(token);
        }

    }
}
