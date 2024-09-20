import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
const SelectMonth = ({ method, defaultValue,value }: any) => {
  return (
    <Select onValueChange={(value: any) => method(value)} defaultValue={`${defaultValue}`} value={new Date(value).getMonth()+""}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="0">
            <div>January</div>
          </SelectItem>
          <SelectItem value="1">
            <div>February</div>
          </SelectItem>
          <SelectItem value="2">
            <div>March</div>
          </SelectItem>
          <SelectItem value="3">
            <div>April</div>
          </SelectItem>
          <SelectItem value="4">
            <div>May</div>
          </SelectItem>
          <SelectItem value="5">
            <div>June</div>
          </SelectItem>
          <SelectItem value="6">
            <div>July</div>
          </SelectItem>
          <SelectItem value="7">
            <div>August</div>
          </SelectItem>
          <SelectItem value="8">
            <div>September</div>
          </SelectItem>
          <SelectItem value="9">
            <div>October</div>
          </SelectItem>
          <SelectItem value="10">
            <div>November</div>
          </SelectItem>
          <SelectItem value="11">
            <div>December</div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectMonth;
