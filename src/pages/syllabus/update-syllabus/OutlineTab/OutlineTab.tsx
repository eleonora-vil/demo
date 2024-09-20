import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { RootState } from '@/lib/redux/store';
import LearningObjRow from './LearningObjRow';
import { useState } from 'react';
import AddSlot from './AddSlot';
import EditSlot from './EditSlot';
import AddContent from './AddContent';
import DeleteSlot from './DeleteSlot';
import { deleteSlotByIndex } from '@/lib/redux/syllabusDetailsSlice';

export default function OutlineTab() {
  const { data, assessmentSchemeSyllabusModels, createTrainingProgramUnits } = useAppSelector((state: RootState) => state.syllabusDetails);
  const dispatch = useAppDispatch();
  return (
    <div className="w-full">
      <Accordion type="single" collapsible className="w-full flex flex-col gap-1">
        {createTrainingProgramUnits?.map((createTrainingProgramUnit: any, unitIndex: number) => {


          if (createTrainingProgramUnit?.trainingProgramUnitModel?.status?.toLowerCase() == 'inactive') return null;

          console.log(createTrainingProgramUnit?.createLearningObjects)

          return (
            <AccordionItem value={unitIndex.toString()} key={unitIndex}>
              <AccordionTrigger className="bg-primary text px-4 py-2 text-white font-semibold text-xl rounded-lg">
                <div className="justify-start gap-5 flex">
                  <span>Slot {unitIndex + 1}</span>
                  <span>{createTrainingProgramUnit?.trainingProgramUnitModel?.unitName}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="mb-2 rounded-b-md flex flex-col gap-2 py-2 px-5">
                {createTrainingProgramUnit?.createLearningObjects?.map(
                  (
                    content: {
                      learningObjModel: {
                        name: string;
                        trainingTime: string;
                        method: boolean;
                        status: string;
                        deliveryType: string;
                        outputStandardId: number;
                        duration: string;
                      };

                    },
                    contentIndex: number,
                  ) => <LearningObjRow content={content} unitIndex={unitIndex} contentIndex={contentIndex} key={`learning-objective-${contentIndex}`} />,
                )}
                <div className="flex items-center gap-2 mt-2">
                  <AddContent unitIndex={unitIndex} />
                  <EditSlot index={unitIndex} />
                  <DeleteSlot onClick={() => dispatch(deleteSlotByIndex(unitIndex))} />
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
      <div>
        <AddSlot />
      </div>
    </div>
  );
}
