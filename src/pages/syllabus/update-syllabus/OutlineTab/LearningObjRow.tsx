/* eslint-disable @typescript-eslint/no-explicit-any */
import DeliveryTypes from '@/components/DeliveryTypes';
import OutputStandard from '@/components/OutputStandard';
import { getOutputStandardById } from '@/lib/api/output-standard-api';
import { HTMLAttributes, useEffect, useState } from 'react';
import DeleteContent from './DeleteContent';
import EditContent from './EditContent';
import LearningMaterial from './LearningMaterial';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  content: any;
  unitIndex: number;
  contentIndex: number;
}

const LearningObjRow = ({ content, unitIndex, contentIndex, ...props }: IProps) => {
  if (content?.learningObjModel?.status.toLowerCase() == 'inactive') return null;
  
  const [outputStandard, setOutputStandard] = useState<any>({
    id: 1,
    tags: 'Null',
    description: 'Standard 1 description',
  });

  //check status
  // if (content?.learningObjModel?.status.toLowerCase() == 'inactive') return null;
  console.log(content)

  useEffect(() => {
    if (content?.learningObjModel?.outputStandardId) {
      getOutputStandardById(content?.learningObjModel?.outputStandardId.toString()).then((res) => {
        if (res.error != null) {
          setOutputStandard({});
        } else {
          setOutputStandard(res.data?.result?.outputStandardModel);
        }
      });
    }
  }, [content]);

  return (
    <div {...props}>
      <div className="py-2 bg-slate-200 rounded-sm flex justify-between px-5">
        <div className="text-left font-semibold text-base flex gap-2 items-center">
          <span>{content?.learningObjModel?.name}</span>
        </div>
        <div className="flex justify-right gap-5 items-center">
          <div>
            <OutputStandard outputStandard={outputStandard} />
          </div>
          <div className="font-bold">{content?.learningObjModel?.duration ? content?.learningObjModel?.duration + " mins" : '---'}</div>
          <div>
            {content?.learningObjModel?.method ? (
              <div className="mr-2 bg-green-200 text-green-500 px-3 py-1 rounded-full font-semibold">Online</div>
            ) : (
              <div className="mr-2 bg-orange-200 text-orange-500 px-3 py-1 rounded-full font-semibold">Offline</div>
            )}
          </div>

          {content?.learningObjModel?.deliveryType ? <DeliveryTypes deliveryType={content?.learningObjModel?.deliveryType} /> : '---'}
          <LearningMaterial materials={content?.materialModels || []} unitIndex={unitIndex} contentIndex={contentIndex} />
          <DeleteContent unitIndex={unitIndex} contentIndex={contentIndex} />
          <EditContent unitIndex={unitIndex} contentIndex={contentIndex} content={content?.learningObjModel} />
        </div>
      </div>
    </div>
  );
};

export default LearningObjRow;
