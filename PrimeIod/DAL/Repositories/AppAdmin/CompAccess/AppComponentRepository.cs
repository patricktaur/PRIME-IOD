
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DAL.Repositories.Interfaces;
using DAL.Models;
using DAL;

namespace DAL.Repositories
{
    public class AppComponentRepository : Repository<AppComponent>, IAppComponentRepository
    {

        private IMapper _mapper;
        private IConfigurationProvider _config;

        public AppComponentRepository(DbContext context, IMapper mapper) : base(context)
        { 

            _mapper = mapper;
            _config = mapper.ConfigurationProvider;

        }

        public List<AppComponent> GetPaginatedSearchResults(Expression<Func<AppComponent, bool>> predicate, int pageNumber, int pageSize)
        {
            return _appContext.AppComponent
            .Where(predicate)
            //.OrderBy(x => x.DeliverableDate)
            .Skip((pageNumber-1) * pageSize).Take(pageSize)
            .Select(x => new AppComponent() //todo : Replace TblStudyTimelineInterimLocks with ViewModel
            {
                RecId = x.RecId
                // DeliverableDate = x.DeliverableDate
            })
            .ToList();
        }

        public List<AppComponent> GetList(int studyId){
           return _appContext.AppComponent
           //.Include(x => x.DeliverableTypeP)
            //.Include(x => x.OutcomeP)
            .ToList();
        }


        public List<T> GetList<T>(Expression<Func<AppComponentRoles, bool>> predicate){
           return _appContext.AppComponentRoles
             .Where(predicate)
            .ProjectTo<T>(_config)
            .ToList()
            ;
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
