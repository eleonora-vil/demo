import { OutlineTabCircularData, SyllabusDay } from '@/types/syllabus';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

interface TimeAllocationProps {
  initialData: any;
  position: 'horizontal' | 'vertical';
}

export function convertToOutlineTabCircularData(data: SyllabusDay[]): OutlineTabCircularData[] {
  const result: OutlineTabCircularData[] = [];
  // console.log(data?.map((item: any) => item?.units?.map()))

  data.forEach((day) => {
    day.units.forEach((unit) => {
      unit.lessions.forEach((lession) => {
        const existingEntry = result.find((entry) => entry.delivery_type === lession.delivery_type);
        if (existingEntry) {
          existingEntry.count += 1;
        } else {
          result.push({ delivery_type: lession.delivery_type, count: 1 });
        }
      });
    });
  });

  return result;
}
export default function TimeAllocation({ initialData, position }: TimeAllocationProps) {
  const circularData = convertToOutlineTabCircularData(initialData);
  const labels = circularData.map((entry) => entry.delivery_type);
  const dataValues = circularData.map((entry) => entry.count);
  const countPercentage = (index: number) => {
    return ((dataValues[index] / dataValues.reduce((a, b) => a + b, 0)) * 100).toFixed(2);
  };
  const data = {
    labels: labels,
    datasets: [
      {
        label: '# of Votes',
        data: dataValues,
        backgroundColor: ['#5388d8', '#f4be37', '#ff9f40', '#0d2535', '#2f903f'],
        borderColor: ['#5388d8', '#f4be37', '#ff9f40', '#0d2535', '#2f903f'],
        borderWidth: 0,
      },
    ],
  };
  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const labelIndex = context.dataIndex;
            const percentage = ((dataValues[labelIndex] / dataValues.reduce((a, b) => a + b, 0)) * 100).toFixed(2);
            return `${labels[labelIndex]}: ${percentage}%`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };
  return (
    <div>
      <div className={`${position === 'vertical' ? 'w-full' : 'grid grid-cols-2'}`}>
        <div className={`box-border h-48 flex justify-center ${position === 'vertical' ? 'col-span-1' : ''}`}>
          <Pie data={data} options={options} />
        </div>
        <div className={`${position === 'vertical' ? 'col-span-1' : ''} mt-4 flex flex-col items-center pl-4`}>
          {labels.map((label, index) => (
            <div key={index} className="flex items-center gap-2 py-1 w-full">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}></div>
              <div className="flex-shrink-0">
                {label}: {countPercentage(index)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
