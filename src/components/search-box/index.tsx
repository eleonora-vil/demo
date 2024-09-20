import React, { ReactElement, useState } from 'react';
import ActionIcons from '../icons/action-icons';

type SearchBoxProps = {
  icon?: ReactElement;
  iconRight?: ReactElement;
  chips?: string[];
  error?: string;
  large?: boolean;
  visibleIcon?: boolean;
};

const SearchBox: React.FC<SearchBoxProps> = ({ icon, iconRight, chips, error, large, visibleIcon }) => {
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [chipsState, setChipsState] = useState<string[]>(chips || []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleToggleVisibility = () => {
    setVisible((prevVisibility) => !prevVisibility);
  };

  const handleRemoveChip = (index: number) => {
    const newChipsState = [...chipsState];
    newChipsState.splice(index, 0);
    setChipsState(newChipsState);
  };

  return (
    <div className={`relative ${error ? 'mb-4' : ''}`}>
      <div
        className={`flex items-center bg-white-100 rounded-lg p-2 w-72 border border-gray-400 ${large ? ' h-16 bg-gray-200 text-sm border-none ' : ''} relative`}
        style={{ maxWidth: '100%' }}
      >
        {icon && <div className="mr-2 cursor-pointer">{icon}</div>}
        <div className="flex items-center flex-wrap">
          {chipsState.map((chip, index) => (
            <div key={index} className="bg-slate-700 text-white rounded-full px-2 py-1 text-xs relative mr-2 flex items-center">
              <div className="mr-1">{chip}</div>
              <span className="cursor-pointer bg-slate-700 text-white  rounded-full " onClick={() => handleRemoveChip(index)}>
                <ActionIcons icon="cancel" />
              </span>
            </div>
          ))}
        </div>
        <div className="flex-1">
          <input
            type={visible ? 'password' : 'text'}
            value={value}
            onChange={handleChange}
            className={`w-full bg-transparent focus:outline-none ${large ? 'text-lg placeholder:text-sm' : 'text-base'} placeholder:text-black italic text-xs font-medium`}
            placeholder="Search by..."
          />
        </div>
        {iconRight && <div className="ml-2">{iconRight}</div>}
        {visibleIcon && (
          <div className={`mr-2 ${visibleIcon ? 'text-gray-600' : 'text-green-500'} transition-all duration-300`} onClick={handleToggleVisibility}>
            {visible ? <ActionIcons icon="visibility-off" /> : <ActionIcons icon="visibility" />}
          </div>
        )}
        {error && <div className="text-red-500 text-xs font-medium italic absolute top-full left-0 mt-1">{error}</div>}
      </div>
    </div>
  );
};

export default SearchBox;
