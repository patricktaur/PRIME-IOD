
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using DAL.Repositories.Interfaces;
using DAL.Models;
using DAL;
using AutoMapper;
using AutoMapper.QueryableExtensions;
namespace DAL.Repositories
{
    public class TblUserRepository : Repository<TblUser>, ITblUserRepository
    {
        private IMapper _mapper;
        
        private IConfigurationProvider _config;
        public TblUserRepository(DbContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
            _config = mapper.ConfigurationProvider;
         }

        public List<T> GetList<T>(Expression<Func<TblUser, bool>> predicate){
           return _appContext.TblUser
             .Where(predicate)
            .ProjectTo<T>(_config)
            .ToList()
            ;
        }

        public T GetRecordDto<T>(Expression<Func<TblUser, bool>> predicate){
            return _appContext.TblUser
            .Where(
                predicate
            )
            .ProjectTo<T>(_config).ToList()
            .FirstOrDefault();
        }

        public T GetRecordDto<T>(int id){
            return _appContext.TblUser
            .Where(
                x => x.Id == id
            )
            .ProjectTo<T>(_config).ToList()
            .FirstOrDefault();
        }

        
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
