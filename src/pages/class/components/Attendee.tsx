import IndicatorIcons from '@/components/icons/indicator-icons';
import Collapse from './Collapse';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
const data = {
  planned: 10,
  accepted: 9,
  actual: 9,
};
const Attendee = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const [focusInput, setFocusInput] = useState('');
  const [planned, setPlanned] = useState<number>(data.planned);
  const [accepted, setAccepted] = useState<number>(data.accepted);
  const [actual, setActual] = useState<number>(data.actual);
  return (
    <Collapse
      icon={<IndicatorIcons icon="grade" />}
      title="Attendee"
      description={
        <Select>
          <SelectTrigger className="text-black w-30">
            <SelectValue placeholder="Choose Admin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Fresher">Fresher</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      }
      {...props}
    >
      <div className="grid grid-cols-3 rounded-xl overflow-hidden">
        <div
          className="bg-primary p-5 border border-white flex flex-col items-center justify-between  gap-3"
          onClick={() => {
            setFocusInput('Planned');
          }}
        >
          <div className="font-bold text-white">Planned</div>
          {focusInput === 'Planned' ? (
            <Input
              className="text-xl text-black"
              value={planned}
              onChange={(e) => {
                setPlanned(+e.target.value);
              }}
            ></Input>
          ) : (
            <div className="text-4xl text-white">{planned}</div>
          )}
        </div>
        <div
          className="bg-blue-800 p-5 border border-white flex flex-col items-center justify-between  gap-3"
          onClick={() => {
            setFocusInput('Accepted');
          }}
        >
          <div className="font-bold text-white ">Accepted</div>
          {focusInput === 'Accepted' ? (
            <Input
              className="text-xl text-black"
              value={accepted}
              onChange={(e) => {
                setAccepted(+e.target.value);
              }}
            ></Input>
          ) : (
            <div className="text-4xl text-white">{accepted}</div>
          )}
        </div>
        <div
          className="bg-secondary p-5 border-white flex flex-col items-center justify-between gap-3"
          onClick={() => {
            setFocusInput('Actual');
          }}
        >
          <div className="font-bold">Actual</div>
          {focusInput === 'Actual' ? (
            <Input
              className="text-xl text-black"
              value={actual}
              onChange={(e) => {
                setActual(+e.target.value);
              }}
            ></Input>
          ) : (
            <div className="text-4xl">{actual}</div>
          )}
        </div>
      </div>
    </Collapse>
  );
};

export default Attendee;
