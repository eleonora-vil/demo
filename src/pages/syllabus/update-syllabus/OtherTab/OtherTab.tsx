import DeliveryTypesIcons from '@/components/icons/delivery-types-icons';
import IndicatorIcons from '@/components/icons/indicator-icons';
import OtherIcons from '@/components/icons/other-icons';
import EditTextEditor from '@/components/tiptap/EditTextEditor';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { RootState } from '@/lib/redux/store';
import { updateAssessmentScheme } from '@/lib/redux/syllabusDetailsSlice';
import { useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'react-toastify';
import ContentCard from '../../../../components/ContentCard';
import TimeAllocation from '../OutlineTab/TimeAllocation';
import CreateAssessment from './CreateAssessment';
import UpdateAssessment from './UpdateAssessment';
export type AssessmentType = {
  assessmentSchemeId: number;
  syllabusId: number;
  percentMark: number;
  assessmentSchemeName: string;
};
const OtherTab = ({ form }: { form: UseFormReturn<any> }) => {
  const { data, assessmentSchemeSyllabusModels } = useAppSelector((state: RootState) => state.syllabusDetails);

  const [renderKey, setRenderKey] = useState<number>(0);
  const rerender = () => {
    setRenderKey(renderKey + 1);
  };
  const assessmentSchemesRef = useRef(data.assessmentSchemeSyllabus);

  const dispatch = useAppDispatch();


  const filterSchema:any = assessmentSchemeSyllabusModels?.filter((item: any) => !(item?.assessmentSchemeName.trim() == 'GPA'  || item?.assessmentSchemeName.trim() == 'Final Theory' || item?.assessmentSchemeName.trim() == 'Final Practice'));
  console.log(filterSchema)

  const finalTheory:any = assessmentSchemeSyllabusModels?.find((item: any) => item?.assessmentSchemeName.trim() === 'Final Theory');
  console.log(finalTheory);
  
  const finalPractice:any = assessmentSchemeSyllabusModels?.find((item: any) => item?.assessmentSchemeName.trim() === 'Final Practice');
  console.log(finalPractice);
  
  const gpaCriteria = assessmentSchemeSyllabusModels?.find((item: any) => item?.assessmentSchemeName.trim() === 'GPA');
  console.log(gpaCriteria);
  

  const outlineData = data.unit.map((u: any) => {
    const learningObjs = u.learningObjs.map((l: any) => {
      return {
        delivery_type: l.deliveryType,
      };
    });
    return {
      lessions: learningObjs,
    };
  });

  const handleUpdateAssessment = (assessmentSchemeId: string, assessmentSchemeName: string, percentMark: string | undefined) => {
    let totalPercent=0;
    let totalFinal=0;
    console.log(assessmentSchemeId);
    
    if (!percentMark) {
      return;
    }
    if (isNaN(Number(percentMark))|| parseFloat(percentMark)<0|| parseFloat(percentMark)>100) {
      toast.error('Invalid value at percent mark');
      return;
    }
    
    if( assessmentSchemeName.trim()== "GPA" && parseFloat(percentMark)>100){
      toast.error('gpa is over 100%')
      return;
    }

    totalFinal= finalTheory?.percentMark||finalPractice?.percentMark || 0;
    if(assessmentSchemeName.trim()=='Final Theory' ){
      console.log(totalFinal);
      
      if( finalPractice?.percentMark + parseFloat(percentMark)>100)
      {
        toast.error('final score is over 100%')
        return;
      }

      
    }
    else if(assessmentSchemeName.trim()=='Final Practice'){
      if(finalTheory?.percentMark+parseFloat(percentMark)>100) {
        toast.error('final score is over 100%')
        return;
      }

    }
    if(assessmentSchemeName.trim() != "GPA" && assessmentSchemeName.trim() != "Final Practice" && assessmentSchemeName.trim() != "Final Theory"){
      filterSchema.forEach((item:any,index:any)=>{
     
        if(item.assessmentSchemeName.trim() != "GPA" && item.assessmentSchemeName.trim() != "Final Practice" && item.assessmentSchemeName.trim() != "Final Theory"){
       
          if(item.assessmentSchemeName.trim() !=assessmentSchemeName.trim())
             {
              totalPercent+=item.percentMark
             }
        }
         
      })
      console.log(totalPercent);
      
      if(totalPercent+parseFloat(percentMark) > 100){
        console.log(assessmentSchemeName.trim());
        toast.error('percent is over 100%')
        return;
      }
    }
   
    dispatch(
      updateAssessmentScheme({
        assessmentSchemeId: parseInt(assessmentSchemeId),
        percentMark: parseInt(percentMark),
        assessmentSchemeName: assessmentSchemeName || '',
        syllabusId: data.syllabusId,
      }),
    );
  };

  const handleAddAssessment = async (assessmentSchemeId: string | undefined, assessmentSchemeName: string | undefined, percentMark: string | undefined) => {
    console.log(percentMark);
    console.log(assessmentSchemeName);
    
    if (!percentMark || !assessmentSchemeId) {
      toast.error('Please fill all the field');
      return;
    }
    
    if (isNaN(Number(percentMark))|| parseFloat(percentMark)<0|| parseFloat(percentMark)>100) {
      toast.error('Invalid value at percent mark');
      return;
    }
    if (assessmentSchemesRef.current.some((a: AssessmentType) => a?.assessmentSchemeId == +assessmentSchemeId)) {
      toast.error('Assessment already exist');
      return;
    }
    
    let totalFinal= finalTheory?.percentMark+finalPractice?.percentMark || 0;
    if(assessmentSchemeName?.trim()=='Final Theory' ){
      console.log(totalFinal);
      
      if( finalPractice?.percentMark + parseFloat(percentMark)>100)
      {
        toast.error('final score is over 100%')
        return;
      }

      
    }
    else if(assessmentSchemeName?.trim()=='Final Practice'){
      if(finalTheory?.percentMark+parseFloat(percentMark)>100) {
        toast.error('final score is over 100%')
        return;
      }

    }
    if(assessmentSchemeName?.trim() != "GPA" && assessmentSchemeName?.trim() != "Final Practice" && assessmentSchemeName?.trim() != "Final Theory")
    {
      let totalPercent=0;
    console.log(assessmentSchemeId, percentMark);
    filterSchema.forEach((item:any,index:any)=>{
     
      if(item.assessmentSchemeName.trim() != "GPA" && item.assessmentSchemeName.trim() != "Final Practice" && item.assessmentSchemeName.trim() != "Final Theory"){

        
        totalPercent+=item.percentMark
      }
       
    })
    console.log(totalPercent);
    
    if(totalPercent+parseFloat(percentMark) > 100){
      console.log(assessmentSchemeName);
      toast.error('percent is over 100%')
      return;
    }
    }
    dispatch(
      updateAssessmentScheme({
        assessmentSchemeId: parseInt(assessmentSchemeId),
        percentMark: parseInt(percentMark),
        assessmentSchemeName: assessmentSchemeName?.trim() || '',
        syllabusId: data.syllabusId,
      }),
    );

    // createAssessmentScheme({
    //   assessmentSchemeName: assessmentSchemeName,
    //   percentMark: parseInt(percentMark),
    // })
    // .then(res => {
    //   console.log(res?.data?.result?.assessmentSchemeModel)
    //   if(res.error){
    //     toast.error(res.error?.response?.message)
    //     return;
    //   } else {
    //     toast.success(res?.data?.result?.message || "Assessment created successfully")

    // xai cai nay
    // dispatch(updateAssessmentScheme({

    //   syllabusId: data.syllabusId
    // }));

    //     console.log(res?.data?.result?.assessmentSchemeModel)
    //     console.log(assessmentSchemesRef.current)
    //     assessmentSchemesRef.current = [
    //       ...assessmentSchemesRef.current,
    //       res?.data?.result?.assessmentSchemeModel
    //     ];
    //   }
    // })

    rerender();
  };

  return (
    <div>
      {/* {form.setValue("Leaniing object", [...form.getValues(",,,"), ])} */}
      <div className="grid grid-cols-2 gap-4 pb-5">
        <div className="col-span-1">
          <ContentCard title="Time allocation" icon={<OtherIcons icon="alarm" />}>
            <TimeAllocation initialData={[{ units: outlineData }]} position="horizontal" />
          </ContentCard>
        </div>
        <div className="col-span-1">
          <ContentCard title="Assessment schema" icon={<DeliveryTypesIcons icon="exam" />}>
            <h3 className="font-bold">Score scheme</h3>
            <div className="ps-1 grid-cols-12 grid gap-1">
              {filterSchema.map((item: any, index: number) => {
                return (
                  <div className="col-span-6 items-center gap-2 grid grid-cols-3" key={`assessment-dcheme-syllabus-${index}`}>
                    <span className="col-span-2">
                      {item?.assessmentSchemeName}: {item?.percentMark}%
                    </span>
                    <div className="col-span-1">
                      <UpdateAssessment assessment={item} handleUpdateAssessment={handleUpdateAssessment} />
                    </div>
                  </div>
                );
              })}
              <div className="col-span-6 flex items-center gap-2">
                <CreateAssessment handleAddAssessment={handleAddAssessment} />
              </div>
            </div>
            <h3 className="font-bold mt-1">Content</h3>
            <div className="ps-1 grid-cols-12 grid">
              <div className="col-span-6 grid grid-cols-3 gap-2">
                <span className="col-span-2">Final Theory: {finalTheory ? finalTheory?.percentMark : 'null'}%</span>
                <div className="col-span-1">
                  <UpdateAssessment assessment={finalTheory} handleUpdateAssessment={handleUpdateAssessment} />
                </div>
              </div>
              <div className="col-span-6  grid grid-cols-3 gap-2">
                <span className="col-span-2">Final Practice: {finalPractice ? finalPractice?.percentMark : 'null'}%</span>

                <div className="col-span-1">
                  <UpdateAssessment assessment={finalPractice} handleUpdateAssessment={handleUpdateAssessment} />
                </div>
              </div>
            </div>
            <h3 className="font-bold mt-1">Passing Criteria</h3>
            <div className="ps-1 grid-cols-12 grid ">
              <div className="col-span-6 grid grid-cols-3 gap-2">
                <span className="col-span-2">GPA &gt; {gpaCriteria ? gpaCriteria.percentMark : 'null'}%</span>
                <div className="col-span-1">
                  <UpdateAssessment assessment={gpaCriteria} handleUpdateAssessment={handleUpdateAssessment} />
                </div>
              </div>
            </div>
          </ContentCard>
        </div>
      </div>
      <div className="mt-4">
        <ContentCard title="Training delivery principle" icon={<IndicatorIcons icon="verified-user" />}>
          <FormField
            control={form.control}
            name="trainingDelivery"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <EditTextEditor content={form.getValues('trainingDelivery')} handleUpdate={(string: string) => form.setValue('trainingDelivery', string)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </ContentCard>
      </div>
    </div>
  );
};
export default OtherTab;
