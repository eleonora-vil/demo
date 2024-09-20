import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAppSelector } from '@/hooks/useRedux';
import { Badge } from '@/components/ui/badge';

export default function Sendata() {
  const { data, invalidCount, existedCount, duplicateCount } = useAppSelector((state) => state.createTrainee);
  return (
    <div>
      <div className="w-full">
        <table className="w-full table-auto ">
          <thead className="">
            <tr className=" ">
              <th className="border-2 border-slate-300 px-4 py-2 ">Information</th>
              <th className="border-2 border-slate-300 text-center px-4 py-2">Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-2 border-slate-300 px-4 py-2">Number of trainees</td>
              <td className="border-2 border-slate-300">
                <div className="text-center">{data.length}</div>
              </td>
            </tr>
            <tr>
              <td className="border-2 border-slate-300 px-4 py-2">Number of invalid emails</td>
              <td className="border-2 border-slate-300">
                <div className="text-center">{invalidCount}</div>
              </td>
            </tr>
            <tr>
              <td className="border-2 border-slate-300 px-4 py-2">Number of existed emails</td>
              <td className="border-2 border-slate-300">
                <div className="text-center">{existedCount}</div>
              </td>
            </tr>
            <tr>
              <td className="border-2 border-slate-300 px-4 py-2">Number of duplicated emails</td>
              <td className="border-2 border-slate-300">
                <div className="text-center">{duplicateCount}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
