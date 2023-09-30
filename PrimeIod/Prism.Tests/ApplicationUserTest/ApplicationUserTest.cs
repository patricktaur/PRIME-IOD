using System;
using NUnit.Framework;
using DAL;
using DAL.Models;
using Shopify.Tests.Helpers ;
using System.Linq;
using System.Collections.Generic;
using BLL;

namespace Shopify.Tests.ApplicationUserTests
{
    public class ApplicationUserTest
    {
        private IUnitOfWork _unitOfWork;
        private BizLogic _bizLogic;
        
        [SetUp]
        public void Setup()
        {
            var factory = new SQLLiteDBContext();
            var dbContext = factory.CreateContextForSQLLite();

           _unitOfWork = new UnitOfWork(dbContext);
           _bizLogic = new BizLogic(_unitOfWork, null);

        }
    }
}