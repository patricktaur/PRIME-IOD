using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Caching.Memory;
using DAL.Models;
 using DAL.DTOs;
using AutoMapper;
using Computations.Enumerators;
using Helpers.Extensions;

namespace BLL.CachedData
{
    public class FiltersCache
    {
        private const string _key = "filters";
        private readonly IMemoryCache _memoryCache;
        private readonly BizLogic _bizLogic;
        private IMapper _mapper;
        // private FiltersDTO _filterDTO;
        
        public FiltersCache(
            BizLogic bizLogic,
            IMemoryCache memoryCache,
            IMapper mapper
        ){
            _bizLogic = bizLogic;
            _memoryCache = memoryCache;
            _mapper = mapper;
            // _filterDTO = new FiltersDTO();
        }
        
    //     private void LoadParamRecs(){
    //         _ParamRecords = _bizLogic.TblParamQuery.GetParams()
    //         .Where(x => !x.DeletedOn.HasValue).ToList();
    //     }

    //     private List<TblParam> _ParamRecords = new List<TblParam>();
    //     public List<TblParam> ParamRecords { 
    //         get {
    //             return _ParamRecords;
    //         }
    //     }
        
    //     public FiltersDTO FiltersCached{
    //          get{
    //             if (_memoryCache.TryGetValue(_key, out FiltersDTO filtersDTOCache))
    //             {
    //                 if (filtersDTOCache.LoadedAt.Date != DateTime.Now.Date){
    //                     //reload If loaded on previous day.
    //                    LoadAndSetMemoryCache();
    //                 }else{
    //                     _filterDTO = filtersDTOCache;
    //                 }
    //             }else{
    //                 LoadAndSetMemoryCache();
    //             }
    //             return _filterDTO;
    //         }
    //     }
    //     public void LoadAndSetMemoryCache(){
    //             LoadParamRecs();
    //             loadFilterDTO();
    //             _memoryCache.Set(_key, _filterDTO);
    //     }
       
       
    //    public string ParamValue(int ParId){
    //        var rec = ParamRecords.Where(x => x.ParId == ParId).FirstOrDefault();
    //        return rec?.Description ?? ""; 
    //    }
        
        
    //     public void loadFilterDTO(){
            
            
    //         _filterDTO.Region.Clear();
    //         _filterDTO.Region = getParams(ParamRecords, EnumParent.region_PID);
            
            
            
    //         _filterDTO.AllUsers.Clear();
    //          _filterDTO.AllUsers = getAllUsers();

            
            
         
    //       _filterDTO.LoadedAt = DateTime.Now;
        
    //     }

    //     public List<FilterItem> getParams(List<TblParam> parRecords, EnumParent enuPar){
    //         return _mapper.Map<List<FilterItem>>(parRecords.Where(x => x.ParId == (int)enuPar)
    //         .OrderBy(x => x.Description)
    //         .ToList());
    //     }

    //     public List<FilterItem> getParamsExpanded(List<TblParam> parRecords, EnumParent enuPar){
            
    //         var paramRecords =  _mapper.Map<List<FilterItem>>(parRecords.Where(x => x.ParId == (int)enuPar)
    //         .OrderBy(x => x.Description)
    //         .ToList());
    //         foreach(FilterItem item in paramRecords){
    //             Enum.TryParse(item.Value, out PrmStudyStatusPID studyStatusPID);
    //             if (studyStatusPID > 0){
    //                 item.Value = studyStatusPID.ExpandName(studyStatusPID);
    //             }
                
    //         }
    //         return paramRecords;
    //     }

    //     public List<FilterItem> getParams(List<TblParam> parRecords, PrmFrequency enuPar){
    //         return _mapper.Map<List<FilterItem>>(parRecords.Where(x => x.ParId == (int)enuPar)
    //         .OrderBy(x => x.Description)
    //         .ToList());
    //     }

    //     public List<FilterItem> getParamsOrderByOrderNo(List<TblParam> parRecords, PrmFrequency enuPar){
            
    //         return _mapper.Map<List<FilterItem>>(parRecords.Where(x => x.ParId == (int)enuPar)
    //         .OrderBy(x => x.OrderNumber)
    //         .ToList());
    //     }
        
        
    //     //---
    //     public List<FilterItem> getParamsByParamIds(List<TblParam> parRecords, int[] RecIds){
    //         var records = parRecords.Where(i => RecIds.Contains(i.RecId));
    //         return _mapper.Map<List<FilterItem>>(records);
    //     }


    //     public List<FilterItem> getAllUsers(){
    //         //Distinct 
    //         return _bizLogic.TblUserQuery.getAllUsers();
    //     }

        


        
        
        
    }
}


