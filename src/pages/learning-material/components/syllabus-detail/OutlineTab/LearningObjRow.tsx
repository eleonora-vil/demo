import DeliveryTypesIcons from '@/components/icons/delivery-types-icons';
import NavigationIcons from '@/components/icons/navigation-icons';
import React, { HTMLAttributes, useEffect, useState } from 'react';
import LearningMaterial from './LearningMaterial';
import OutputStandard from '@/components/OutputStandard';
import { getOutputStandardById } from '@/lib/api/output-standard-api';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LearningObjRow = ({ learningObjs, ...props }: any & HTMLAttributes<HTMLDivElement>) => {
  console.log(learningObjs)
  const [isShow, setIsShow] = useState(false);
  const { learningObjModel } = learningObjs;
  const [outputStandard, setOutputStandard] = useState({
    outputStandardId: 0,
    tags: 'Null',
    description: 'Null',
  });

  if (learningObjModel?.status.toLowerCase() == 'inactive') return null;

  useEffect(() => {
    getOutputStandardById(learningObjModel?.outputStandardId)
      .then((res) => {
        if (res.data) {
          // console.log(res.data.result?.outputStandardModel)
          setOutputStandard(res.data?.result?.outputStandardModel);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [learningObjModel.outputStandardId]);
  return (
    <div {...props}>
      <div className="py-2 bg-slate-200 rounded-sm flex justify-between px-5">
        <div className="text-left font-semibold text-base">{learningObjModel.name}</div>
        <div className="flex justify-right gap-5 items-center">
          <div>
            <OutputStandard outputStandard={outputStandard} />
          </div>
          <div className="font-bold">{learningObjModel.duration ? learningObjModel.duration : '---'}</div>
          <div>
            {learningObjModel.method ? (
              <div className="mr-2 bg-green-200 text-green-500 px-3 py-1 rounded-full font-semibold">Online</div>
            ) : (
              <div className="mr-2 bg-orange-200 text-orange-500 px-3 py-1 rounded-full font-semibold">Offline</div>
            )}
          </div>
          <div>{learningObjModel.deliveryType ? <DeliveryTypesIcons icon={learningObjModel.deliveryType} /> : '---'}</div>
          <div>
            <NavigationIcons
              icon="folder"
              className="hover:cursor-pointer"
              onClick={() => {
                setIsShow(!isShow);
              }}
            />
          </div>
        </div>
      </div>
      {isShow && <LearningMaterial materials={learningObjs?.materialModels || []} />}
    </div>
  );
};

export default LearningObjRow;
