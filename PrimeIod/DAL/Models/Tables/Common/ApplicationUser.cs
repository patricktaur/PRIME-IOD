// ======================================
// Author: Ebenezer Monney
// Email:  info@claritytechnologies.com
// Copyright (c) 2017 www.claritytechnologies.com
// 
// ==> Gun4Hire: contact@claritytechnologies.com
// ======================================

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using DAL.Models.Interfaces;

namespace DAL.Models
{
    public class ApplicationUser : IdentityUser //, IAuditableEntity
    {
        public ApplicationUser(){
            //ICollection<IdentityUserRole<string>>
            Roles = new HashSet<IdentityUserRole<string>>();

            var Defaultrole  = new IdentityUserRole<string>();
            Defaultrole.RoleId = Role_PId.ToString();
            Defaultrole.UserId = Id;
            //= GetPrismRequestRole(Role_PId);
            Roles.Add(Defaultrole);

            
        }
        public virtual string FriendlyName
        {
            get
            {
                string friendlyName = string.IsNullOrWhiteSpace(FullName) ? UserName : FullName;

                if (!string.IsNullOrWhiteSpace(JobTitle))
                    friendlyName = JobTitle + " " + friendlyName;

                return friendlyName;
            }
        }


        public virtual string DefaultRole
        {
            get
            {
                return GetPrismRequestRole(Role_PId);
            }
        }

        
        // public new string UserName
        // {
        // get
        // {
        //     return base.UserName;
        // }
        // set
        // {
        //     base.UserName = EnterpriseId;
            
        // }
        // }

        //public string Id { get; set; }
        public string JobTitle { get; set; }
        public string FullName { get; set; }
        public string Configuration { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsLockedOut => this.LockoutEnabled && this.LockoutEnd >= DateTimeOffset.UtcNow;

        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }

        //Patrick:01May2019:
        public int Role_PId  { get; set; }
        public string EnterpriseId { get; set; }
        /// <summary>
        /// Navigation property for the roles this user belongs to.
        /// </summary>
        public virtual ICollection<IdentityUserRole<string>> Roles { get; set; }

        
        /// <summary>
        /// Navigation property for the claims this user possesses.
        /// </summary>
        public virtual ICollection<IdentityUserClaim<string>> Claims { get; set; }

        /// <summary>
        /// Demo Navigation property for orders this user has processed
        /// </summary>
        

        private string GetPrismRequestRole(int RolePId){
            /*
            if (role.ToLower() == "admin"){  1801
                       critRole = "Admin";
                   }else if((role.ToLower().Contains("manager"))){ //Manager not used
                        critRole = "Manager";
                   }else if((role.ToLower().Contains("clarity team"))){ 1812
                       critRole = "Developer";
                   }else{
                       critRole = "User";
                   }
             */
          var role = ""; 
           if (RolePId == 1801){
               role = "Admin";
           }else if (RolePId == 1812){
               role = "Developer";
           }else{
               role = "User";
           }
             return role;
           
        }
    }
}
