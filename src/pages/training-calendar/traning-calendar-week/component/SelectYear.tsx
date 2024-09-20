import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import React from 'react';

const SelectYear = ({ data, defaultValue, method }: any) => {
  return (
    <Select defaultValue={defaultValue} onValueChange={(value: any) => method(value)}>
      <SelectTrigger>
        <SelectValue></SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data.map((item: any, index: number) => (
            <SelectItem value={item} key={index}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectYear;
