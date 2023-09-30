
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
    public class tblAppAccessGroupMembersRepository : Repository<TblAppAccessGroupMembers>, ItblAppAccessGroupMembersRepository
    {
        private IMapper _mapper;
        private IConfigurationProvider _config;
        public tblAppAccessGroupMembersRepository(DbContext context, IMapper mapper) : base(context)
        { 

            _mapper = mapper;
            _config = mapper.ConfigurationProvider;
        }

        public List<TblAppAccessGroupMembers> GetPaginatedSearchResults(Expression<Func<TblAppAccessGroupMembers, bool>> predicate, int pageNumber, int pageSize)
        {
            return _appContext.tblAppAccessGroupMembers
            .Where(predicate)
            //.OrderBy(x => x.DeliverableDate)
            .Skip((pageNumber-1) * pageSize).Take(pageSize)
            .Select(x => new TblAppAccessGroupMembers() //todo : Replace TblStudyTimelineInterimLocks with ViewModel
            {
                RecId = x.RecId
                // DeliverableDate = x.DeliverableDate
            })
            .ToList();
        }

        public List<TblAppAccessGroupMembers> GetList(int studyId){
           return _appContext.tblAppAccessGroupMembers
           //.Include(x => x.DeliverableTypeP)
            //.Include(x => x.OutcomeP)
            .Where(
                x => 
                
                !x.DeletedOn.HasValue
            ).ToList();
        }

        public List<T> GetList<T>(Expression<Func<TblAppAccessGroupMembers, bool>> predicate){
           return _appContext.tblAppAccessGroupMembers
            .Where(
                x => !x.DeletedOn.HasValue
            )
             .Where(predicate)
            .ProjectTo<T>(_config)
            .ToList()
            ;
        }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
