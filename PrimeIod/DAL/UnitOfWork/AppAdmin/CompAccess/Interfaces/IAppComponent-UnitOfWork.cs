// =============================
// claritytechnologies
// Tallify
// =============================

using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial interface IUnitOfWork
    {

         IAppComponentRepository AppComponent_Repo { get; }  //pluraize if required.
        
    }
}
