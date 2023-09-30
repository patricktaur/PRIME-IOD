
using Microsoft.Extensions.Logging;
using DAL;
using Microsoft.Extensions.Caching.Memory;
using AutoMapper;

using BLL.CachedData;
using Services.EMail;
namespace BLL
{
    public partial class BizLogic
    {
        private IUnitOfWork _unitOfWork;
        
        private IMapper _mapper;

        private IMemoryCache _memoryCache;

        private readonly ILogger _logger;
        // private FiltersCache _filterCache;
        private IEmailSender _emailSender;
        
        public BizLogic (
            IUnitOfWork unitOfWork,
            
            IMapper mapper,
            IMemoryCache memoryCache,
            // ILogger<BizLogic> logger,
            IEmailSender emailSender
            // FiltersCache filtersCache
        ) {
            _unitOfWork = unitOfWork;
            
            _mapper = mapper;
             _memoryCache = memoryCache;
            //   _logger = logger;
            //   _filterCache = filtersCache;
            _emailSender = emailSender;
        }
 
        public int SaveChanges () {
            return _unitOfWork.SaveChanges ();
        }

        public int SaveChanges (int userId) {
            return _unitOfWork.SaveChanges (userId);
        }

    }
}
