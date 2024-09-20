import DeliveryTypesIcons from '@/components/icons/delivery-types-icons';
import NavigationIcons from '@/components/icons/navigation-icons';
import OutputStandard from '@/components/OutputStandard';
import { HTMLAttributes, useState } from 'react';
import LearningMaterial from './LearningMaterial';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LearningObjRow = ({ learningObjs, ...props }: any & HTMLAttributes<HTMLDivElement>) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <div {...props}>
      <div className="py-2 bg-slate-200 rounded-sm flex justify-between px-5">
        <div className="text-left font-semibold text-base">{learningObjs.name}</div>
        <div className="flex justify-right gap-5 items-center">
          <div>
            <OutputStandard outputStandard={learningObjs.outputStandard} />
          </div>
          <div className="font-bold">{learningObjs.duration ? learningObjs.duration : '---'}</div>
          <div>
            {learningObjs.status === 'Online' ? (
              <div className="mr-2 bg-green-200 text-green-500 px-3 py-1 rounded-full font-semibold">{learningObjs.status ? learningObjs.status : '---'}</div>
            ) : (
              <div className="mr-2 bg-orange-200 text-orange-500 px-3 py-1 rounded-full font-semibold">{learningObjs.status ? learningObjs.status : '---'}</div>
            )}
          </div>
          <div>{learningObjs.deliveryType ? <DeliveryTypesIcons icon={learningObjs.deliveryType} /> : '---'}</div>
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
      {isShow && <LearningMaterial materials={learningObjs.material} />}
    </div>
  );
};

export default LearningObjRow;
