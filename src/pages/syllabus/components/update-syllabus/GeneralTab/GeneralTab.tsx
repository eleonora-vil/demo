/* eslint-disable @typescript-eslint/no-explicit-any */
import IndicatorIcons from '@/components/icons/indicator-icons';
import NavigationIcons from '@/components/icons/navigation-icons';
import ShowTextEditor from '@/components/tiptap/ShowTextEditor';
import { useRef } from 'react';
import OtherIcons from '@/components/icons/other-icons';
import { useAppSelector } from '@/hooks/useRedux';
import { RootState } from '@/lib/redux/store';
import OutputStandard from '@/components/OutputStandard';
import ContentCard from '../../../../../components/ContentCard';
export default function GeneralTab() {
  const data = useAppSelector((state: RootState) => state.syllabusDetails.data);

  const contentRef = useRef<string>('');
  if (!data) {
    return 'loading';
  }
  const outputStandards = extractOutputStandards(data);
  contentRef.current = data.courseObjectives;
  return (
    <div>
      <div className=" w-full flex gap-6 justify-start pt-2 mb-5">
        <ContentCard title="Brief Information" icon={<OtherIcons icon="local-library" />} className="flex-[2]">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1 flex items-center">
              <IndicatorIcons icon="grade" />
              <div className="text-[18px] font-semibold ml-2">Level</div>
            </div>
            <div className="col-span-1">{data.level}</div>
            <div className="col-span-1 ">
              <div className="flex items-center">
                <NavigationIcons icon="group" />
                <div className="text-[18px] font-semibold ml-2">Attendee number</div>
              </div>
            </div>
            <div className="col-span-1">{data.attendeeNumber}</div>
            <div className="col-span-1 ">
              <div className="flex items-center">
                <IndicatorIcons icon="verified-user" />
                <div className="text-[18px] font-semibold ml-2">Output standard</div>
              </div>
            </div>
            <div className="col-span-1w">
              <div className="flex gap-1 flex-wrap">
                {outputStandards.map((item: any, index: number) => (
                  <OutputStandard outputStandard={item} key={`output-standard-${index}`} />
                ))}
              </div>
            </div>
          </div>
        </ContentCard>
        <ContentCard title="Technical Requirement(s)" icon={<NavigationIcons icon="settings" />} className="flex-[3]">
          <ShowTextEditor content={data.technicalRequirement} />
        </ContentCard>
      </div>
      <ContentCard title="Course Objective" icon={<IndicatorIcons icon="filter-center-focus" />}>
        <ShowTextEditor content={contentRef.current} />
        {/* <EditTextEditor
            content={contentRef.current}
            handleUpdate={(string: string) => (contentRef.current = string)}
          /> */}
      </ContentCard>
      <div className="p-2 mt-3"></div>
    </div>
  );
}
function extractOutputStandards(obj: any) {
  const outputStandards: any = [];

  if (obj && obj.unit && Array.isArray(obj.unit)) {
    obj.unit.forEach((unit: any) => {
      if (unit.learningObjs && Array.isArray(unit.learningObjs)) {
        unit.learningObjs.forEach((learningObj: any) => {
          if (learningObj.outputStandard) {
            outputStandards.push(learningObj.outputStandard);
          }
        });
      }
    });
  }

  return outputStandards;
}
