import React, { useState } from 'react';
import CourseStatusButton from '@/components/status/course-status';
import ActionIcons from '../icons/action-icons';
import SearchBox from '../search-box';
import DocumentManageIcons from '../icons/document-manage-icons';
import { Input } from '../ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState<string>('');
  const [outputStandard, setOutputStandard] = useState<string>('');
  const [trainingTime, setTrainingTime] = useState<number>(0);
  const [deliveryType, setDeliveryType] = useState<string>('');
  const [method, setMethod] = useState<string>('');
  const mockTags = ['HS4D'];

  const handleSubmit = () => {
    // Handle form submission logic here
    // You can access the form values using the state variables (name, outputStandard, etc.)
    // For simplicity, let's log the values to the console for now
    console.log('Name:', name);
    console.log('Output Standard:', outputStandard);
    console.log('Training Time:', trainingTime);
    console.log('Delivery Type:', deliveryType);
    console.log('Method:', method);

    // Close the modal after submission
    onClose();
  };

  return (
    <div className={`modal fixed w-full h-full top-0 left-0 ${isOpen ? '' : 'hidden'}`}>
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="modal-container fixed w-full h-full flex items-center justify-center">
        <div className="modal-content bg-white w-4/12 rounded-2xl shadow-lg">
          <span className="close absolute p-3 cursor-pointer text-white" onClick={onClose}>
            <ActionIcons icon="cancel" />
          </span>

          <div>
            <h2 className="text-2xl mb-4 p-2 text-center rounded-2xl rounded-bl-[0] rounded-br-[0] bg-cyan-900 text-white">New Content</h2>
          </div>

          {/* Form fields */}
          <div className="flex justify-between mb-4 ml-5">
            <label htmlFor="name" className="block text-base font-medium text-gray-700 mt-2">
              Name
            </label>
            <Input
              type="text"
              id="name"
              placeholder="Name of content..."
              className="p-2 border-gray-400 w-72 rounded-lg focus:outline-none mr-10"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex justify-between mb-4 ml-5">
            <label htmlFor="outputStandard" className="block text-base font-medium text-gray-700 mt-2">
              Output Standard
            </label>
            <div className="mr-10">
              <SearchBox icon={<DocumentManageIcons icon="search" />} chips={mockTags} />
            </div>
          </div>

          <div className="flex justify-between mb-4 ml-5">
            <label htmlFor="trainingTime" className="block text-base font-medium text-gray-700 mt-2">
              Training Time
            </label>
            <Input
              type="number"
              id="trainingTime"
              placeholder="Minutes"
              className="mt-1 p-2 border-gray-400 rounded-lg w-72 mr-10"
              value={trainingTime}
              onChange={(e) => setTrainingTime(parseInt(e.target.value, 10))}
            />
          </div>

          <div className="flex justify-between mb-4 ml-5">
            <label htmlFor="deliveryType" className="block text-base font-medium text-gray-700">
              Delivery Type
            </label>
            <div className="mt-1 p-2 border rounded-lg w-72 mr-10">
              <DropdownMenu>
                <DropdownMenuTrigger>Select one</DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex mb-4 ml-5">
            <label htmlFor="method" className="block text-base font-medium text-gray-700">
              Method
            </label>
            <div className="block ml-20">
              <CourseStatusButton status={'offline'} />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="mt-1 text-center">
              <a href="/" className="text-red-500 hover:underline mr-4">
                <b>Cancel</b>
              </a>
            </div>

            {/* Submit button */}
            <button className="bg-cyan-900 text-white px-7 py-1.5 mb-4 rounded-lg hover:bg-cyan-800" onClick={handleSubmit}>
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
