using BLL.Command;
using BLL.Query;
namespace BLL
{
    public partial class BizLogic
    {

        private CommonQuery _CommonQuery;
        public CommonQuery CommonQuery {
            get {
                if (_CommonQuery == null)
                    _CommonQuery = new CommonQuery (_unitOfWork, _mapper, this);

                return _CommonQuery;
            }
        }

    }
}
