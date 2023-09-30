// =============================
// claritytechnologies
// Tallify
// =============================

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DAL.Core;
using Microsoft.AspNetCore.Http;
using AutoMapper;
namespace DAL
{
    public class HttpUnitOfWork : UnitOfWork
    {
        public HttpUnitOfWork(ApplicationDbContext context, 
        IHttpContextAccessor httpAccessor,
        IMapper mapper
        ) : base(context, mapper)
        {
            context.CurrentUserId = httpAccessor.HttpContext?.User.FindFirst(ClaimConstants.Subject)?.Value?.Trim();
        }
    }
}
