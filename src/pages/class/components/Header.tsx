// import DeliveryTypes from "@/components/DeliveryTypes";
import DeliveryTypes from '@/components/DeliveryTypes';
import ActionIcons from '@/components/icons/action-icons';
import DocumentManageIcons from '@/components/icons/document-manage-icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="bg-primary text-white py-3 px-10 border-t-white border-t">
      <h4 className="text-h4">Class</h4>
      <div className="flex justify-between">
        <div className="border-b-white border-b pb-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-h3">Fresher Develop Operation</h2>
            </div>
          </div>
          <h4 className="font-semibold">HCM22_FR_DevOps_01</h4>
        </div>
        <div className="flex flex-col p-3">
          <span className="bg-slate-400  px-4 rounded-xl border border-white">Planning</span>
        </div>
        <div className="flex-1 flex justify-end">
          <div className="flex items-center">
            <Popover>
              <PopoverTrigger>
                <button className="w-10 h-10 rounded-full">
                  <ActionIcons icon="more-horizontal" className="w-10 h-10" />
                </button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col">
                  <h3 className="font-bold text-lg border-b border-b-slate-300 pb-1">Manage</h3>
                  <Link to="/class/edit">
                    <button className="p-3 hover:bg-slate-300 text-left flex gap-2 w-full">
                      <DocumentManageIcons icon="create" className="text-blue-600" />
                      Edit class
                    </button>
                  </Link>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div className="flex py-2 gap-3 items-center">
        <div className="border-r border-r-white pr-6">
          <span className="text-h4">31</span> days <span className="ml-1 italic">(97 hours)</span>
        </div>
        <DeliveryTypes deliveryType="lab" />
        <DeliveryTypes deliveryType="lecture" />
        <DeliveryTypes deliveryType="exam" />
        <DeliveryTypes deliveryType="workshop" />
        <DeliveryTypes deliveryType="review" />
      </div>
    </div>
  );
};

export default Header;
