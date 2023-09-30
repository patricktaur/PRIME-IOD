// =============================
// claritytechnologies
// Tallify
// =============================

using FluentValidation;
using WebApi.Helpers;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;


namespace WebApi.ViewModels
{
    public class UserViewModel : UserBaseViewModel
    {
        public bool IsLockedOut { get; set; }

        [MinimumCount(1, ErrorMessage = "Roles cannot be empty")]
        public string[] Roles { get; set; }
        public List<UserRoleViewModel> AllRoles { get; set; }

    }



    public class UserEditViewModel : UserBaseViewModel
    {
        public string CurrentPassword { get; set; }

        [MinLength(6, ErrorMessage = "New Password must be at least 6 characters")]
        public string NewPassword { get; set; }

        [MinimumCount(1, ErrorMessage = "Roles cannot be empty")]
        public string[] Roles { get; set; }
        // public List<UserRoleViewModel> AllRoles { get; set; }

    }

    public class PrismUserEditViewModel : UserBaseViewModel
    {
        // public string CurrentPassword { get; set; }

        // [MinLength(6, ErrorMessage = "New Password must be at least 6 characters")]
        // public string NewPassword { get; set; }

        [MinimumCount(1, ErrorMessage = "Roles cannot be empty")]
        public string[] Roles { get; set; }
        
        // public List<UserRoleViewModel> AllRoles { get; set; }
        // public string EnterpriseId { get; set; }

    }

    public class UserPatchViewModel
    {
        //public string FullName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string JobTitle { get; set; }

        public string PhoneNumber { get; set; }

        public string Configuration { get; set; }
    }



    public abstract class UserBaseViewModel
    {
        public string Id { get; set; }

        // [Required(ErrorMessage = "Username is required"), StringLength(200, MinimumLength = 2, ErrorMessage = "Username must be between 2 and 200 characters")]
        public string UserName { get; set; }

        public string FullName { get; set; }
        // public string FirstName { get; set; }
        // public string LastName { get; set; }


        [Required(ErrorMessage = "Email is required"), StringLength(200, ErrorMessage = "Email must be at most 200 characters"), EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; }

        public string JobTitle { get; set; }

        public string PhoneNumber { get; set; }

        public string Configuration { get; set; }
        public string EnterpriseId { get; set; }
        public string EmployeeId { get; set; }

        public bool IsEnabled { get; set; }

        public bool? CanLogin {get;set;}
        public bool? Active {get;set;}

        public DateTime Joiningdate {get;set;}

        public DateTime? Leavingdate {get;set;}

        public int RolePid {get;set;}

        public int OperatingDivisionPid {get;set;}

        public int OfficeRegionPid {get;set;}

        public int OfficeCountryPid {get;set;}

       // public DateTime? Month {get;set;}

        public string TimeZoneId {get;set;}

    }




    //public class UserViewModelValidator : AbstractValidator<UserViewModel>
    //{
    //    public UserViewModelValidator()
    //    {
    //        //Validation logic here
    //        RuleFor(user => user.UserName).NotEmpty().WithMessage("Username cannot be empty");
    //        RuleFor(user => user.Email).EmailAddress().NotEmpty();
    //        RuleFor(user => user.Password).NotEmpty().WithMessage("Password cannot be empty").Length(4, 20);
    //    }
    //}
}
