import { useState } from 'react';
import './SwitchButton.css';
type SwitchButtonProps = {
  onToggle?: () => void;
  value?: boolean;
};
const SwitchButton = ({ value, onToggle }: SwitchButtonProps) => {
  const [isChecked, setIsChecked] = useState(value);

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <div className="toggle-button-cover" onClick={handleToggle}>
      <div className="button b2" id="button-13">
        <input type="checkbox" className="checkbox" checked={!isChecked} onChange={() => setIsChecked(!isChecked)} />
        <div className="knobs">
          <span></span>
        </div>
        <div className="layer"></div>
      </div>
    </div>
  );
};

export default SwitchButton;
