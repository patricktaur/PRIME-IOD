
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
    public class TblFteDemandRepository : Repository<TblFteDemand>, ITblFteDemandRepository
    {
        private IMapper _mapper;
        
        private IConfigurationProvider _config;

        public TblFteDemandRepository(DbContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
            _config = mapper.ConfigurationProvider;

         }

        public List<TblFteDemand> GetList(){
           return _appContext.TblFteDemand
           //.Include(x => x.DeliverableTypeP)
            //.Include(x => x.OutcomeP)
            // .Where(
            //     // x => x.StudyId == studyId
            //     // && !x.DeletedOn.HasValue
            // )
            .ToList();
        }

        public List<TblFteDemand> GetList(int studyId){
           return _appContext.TblFteDemand
           //.Include(x => x.DeliverableTypeP)
            //.Include(x => x.OutcomeP)
            // .Where(
            //     // x => x.StudyId == studyId
            //     // && !x.DeletedOn.HasValue
            // )
            .ToList();
        }
       
       
       public List<T> GetList<T>(Expression<Func<TblFteDemand, bool>> predicate){
           return _appContext.TblFteDemand
            // .Where(
            //     x => !x.DeletedOn.HasValue
            // )
             .Where(predicate)
            .ProjectTo<T>(_config)
            .ToList()
            ;
        }

         public List<T> GetList<T>(int studyId){
           return _appContext.TblFteDemand
            .Where(
                x => x.StudyId == studyId
                // && !x.DeletedOn.HasValue
            )
            .ProjectTo<T>(_config)
            .ToList()
            ;
        }

        public T GetRecordDto<T>(int id){
            return _appContext.TblFteDemand
            .Where(
                x => x.Id == id
            )
            .ProjectTo<T>(_config).ToList()
            .FirstOrDefault();
        }


       
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
