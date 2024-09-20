import TimeAllocation from '../OutlineTab/TimeAllocation';
import IndicatorIcons from '@/components/icons/indicator-icons';
import ContentCard from '../../../../components/ContentCard';
import OtherIcons from '@/components/icons/other-icons';
import DeliveryTypesIcons from '@/components/icons/delivery-types-icons';
import { useAppSelector } from '@/hooks/useRedux';
import { RootState } from '@/lib/redux/store';
import ShowTextEditor from '@/components/tiptap/ShowTextEditor';

const OtherTab = () => {
  const { data, createTrainingProgramUnits } = useAppSelector((state: RootState) => state.syllabusDetails);
  const finalTheory = data.assessmentSchemeSyllabus.find((item: any) => item.assessmentSchemeName === 'Final Theory');
  const finalPractice = data.assessmentSchemeSyllabus.find((item: any) => item.assessmentSchemeName === 'Final Practice');
  const gpaCriteria = data.assessmentSchemeSyllabus.find((item: any) => item.assessmentSchemeName === 'GPA');
  const assessmentSchemes = data.assessmentSchemeSyllabus.filter(
    (item: any) => item.assessmentSchemeName !== 'Final Theory' && item.assessmentSchemeName !== 'Final Practice' && item.assessmentSchemeName !== 'GPA',
  );
  // Convert data from server to suitable data for TimeAllocation component
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
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 pb-5">
        <div className="col-span-1">
          <ContentCard title="Time allocation" icon={<OtherIcons icon="alarm" />}>
            <TimeAllocation initialData={[{ units: outlineData }]} position="horizontal" />
          </ContentCard>
        </div>
        <div className="col-span-1">
          <ContentCard title="Assessment schema" icon={<DeliveryTypesIcons icon="exam" />}>
            <h3 className="font-bold">Score scheme</h3>
            <div className="ps-1 grid-cols-12 grid">
              {assessmentSchemes.map((item: any, index: number) => {
                return (
                  <p className="col-span-6" key={`assessment-dcheme-syllabus-${index}`}>
                    {item.assessmentSchemeName}: {item.percentMark}%
                  </p>
                );
              })}
            </div>
            <h3 className="font-bold mt-1">Content</h3>
            <div className="ps-1 grid-cols-12 grid">
              <p className="col-span-6">Final Theory: {finalTheory ? finalTheory.percentMark : '0%'}</p>
              <p className="col-span-6">Final Practice: {finalPractice ? finalPractice.percentMark : '0%'}</p>
            </div>
            <h3 className="font-bold mt-1">Passing Criteria</h3>
            <div className="ps-1 grid-cols-12 grid">
              <p className="col-span-6">GPA &gt; {gpaCriteria ? gpaCriteria.percentMark : '0'}%</p>
            </div>
          </ContentCard>
        </div>
      </div>
      <div className="mt-4">
        <ContentCard title="Training delivery principle" icon={<IndicatorIcons icon="verified-user" />}>
          <ShowTextEditor content={data.trainingDelivery} />
        </ContentCard>
      </div>
    </div>
  );
};
export default OtherTab;
