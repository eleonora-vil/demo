import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useAppSelector } from '@/hooks/useRedux';
import { RootState } from '@/lib/redux/store';
import LearningObjRow from './LearningObjRow';
import { ICreateTrainingProgramUnits } from '@/types/SyllabusDetails';

export default function OutlineTab() {
  const createTrainingProgramUnits = useAppSelector((state: RootState) => state.syllabusDetails.createTrainingProgramUnits);
  return (
    <div className="w-full">
      <Accordion type="single" collapsible className="w-full flex flex-col gap-1">
        {createTrainingProgramUnits?.map((createTrainingProgramUnit: ICreateTrainingProgramUnits, index: number) => {
          const { trainingProgramUnitModel, createLearningObjects } = createTrainingProgramUnit;
          // check status = inactive
          console.log(trainingProgramUnitModel)
          if (trainingProgramUnitModel.status?.toLowerCase() == 'inactive') return null;
          

          return (
            <AccordionItem value={index.toString()} key={index}>
              <AccordionTrigger className="bg-primary text px-4 py-2 text-white font-semibold text-xl rounded-lg ">
                <div className="justify-start gap-5 flex">
                  <span>Slot {index + 1}</span>
                  <span>{trainingProgramUnitModel.unitName}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="mb-2 rounded-b-md flex flex-col gap-2 py-2 px-5">
                {createLearningObjects?.map((details: any, index: number) => <LearningObjRow learningObjs={details} key={`learning-objective-${index}`} />)}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
