import { Button } from '@/components/ui/button';
import { CSVLink } from 'react-csv';

interface Props {
  isAccessable?: boolean;
}

export default function ExampleExcelFile({ isAccessable }: Props) {
  // Data to be exported to CSV
  const data = [
    { Name: 'John Doe', Information: 'Some information', 'List Syllabus': 'Syllabus 1' },
    { Name: 'Jane Doe', Information: 'More information', 'List Syllabus': 'Syllabus 2' },
    // Add more rows as needed
  ];

  // CSV headers
  const headers = [
    { label: 'Name', key: 'Name' },
    { label: 'Information', key: 'Information' },
    { label: 'List Syllabus', key: 'List Syllabus' },
  ];

  return (
    <div className={`${isAccessable ? '' : 'hidden'}`}>
      <CSVLink data={data} headers={headers} filename={'example-training-program.csv'}>
        <Button className="bg-white text-blue-500 border-[1px] border-blue-500 hover:bg-blue-200">Example Excel</Button>
      </CSVLink>
    </div>
  );
}
