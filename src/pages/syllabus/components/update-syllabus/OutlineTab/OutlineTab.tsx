/* eslint-disable @typescript-eslint/no-explicit-any */
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useAppSelector } from '@/hooks/useRedux';
import { RootState } from '@/lib/redux/store';
import LearningObjRow from './LearningObjRow';

export default function OutlineTab() {
  const {  createTrainingProgramUnits } = useAppSelector((state: RootState) => state.syllabusDetails);

  return (
    <div className="w-full">
      <Accordion type="single" collapsible className="w-full flex flex-col gap-1">
        {createTrainingProgramUnits?.map((slot: any, index: number) => {
          return (
            <AccordionItem value={index.toString()} key={index}>
              <AccordionTrigger className="bg-primary text px-4 py-2 text-white font-semibold text-xl rounded-lg ">
                <div className="justify-start gap-5 flex">
                  <span>Slot {slot?.trainingProgramUnitModel?.index + 1}</span>
                  <span>{slot?.trainingProgramUnitModel?.unitName}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="mb-2 rounded-b-md flex flex-col gap-2 py-2 px-5">
                {slot?.learningObjs.map((details: any, index: number) => <LearningObjRow learningObjs={details} key={`learning-objective-${index}`} />)}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
