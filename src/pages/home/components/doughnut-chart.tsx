/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from '@/hooks/useRedux';
import { getMana } from '@/lib/api/dashboard-api';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

export const DoughnutChart = () => {
  const [total, setTotal] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isRender = useAppSelector((state) => state.isTableRender.isRender);

  const refreshData = () => {
    getMana()
      .then((res) => {
        if (res.error != null) {
          // handle error
        } else {
          setTotal(res.data?.result?.manaModel);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    refreshData();
  }, [isRender]);

  // Check if total data is available before rendering the chart
  if (!total || isLoading) {
    return <div>Loading...</div>;
  }

  const data = {
    labels: ['SuperAdmin', 'Admin', 'Trainer', 'Trainee'],
    datasets: [
      {
        label: 'Amount',
        data: [total.totalRoleSuperAdmin, total.totalRoleAdmin, total.totalRoleTrainer, total.totalRoleTrainee],
        backgroundColor: ['rgb(239, 60, 60)', 'rgb(238, 148, 30)', 'rgb(15, 104, 34)', 'rgb(8, 126, 205)'],
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    tooltips: {
      callbacks: {
        label: function (tooltipItem: any, data: any) {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          let label = dataset.label || '';
          if (label) {
            label += ': ';
          }
          label += dataset.data[tooltipItem.index];
          return label;
        },
      },
    },
  };
  return (
    <div style={{ width: '300px', height: '300px' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};
