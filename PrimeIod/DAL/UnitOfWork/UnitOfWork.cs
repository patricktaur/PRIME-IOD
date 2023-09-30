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
using DAL.Repositories;
using DAL.Repositories.Interfaces;
using AutoMapper;
namespace DAL
{
    public partial class UnitOfWork : IUnitOfWork
    {
        readonly ApplicationDbContext _context;
        readonly IMapper _mapper;


    #region Base
        public UnitOfWork(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        public int SaveChanges()
        {
            return _context.SaveChanges();
        }

        public int SaveChanges(int userId)
        {
            ///CurrentUserId is of type string 
            // -- not modified to maintina compatablity with other calls to AppDbContext
            _context.CurrentUserId = userId.ToString();
            return _context.SaveChanges();
        }

    #endregion
    }
}
