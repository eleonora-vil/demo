import IndicatorIcons from '@/components/icons/indicator-icons';
import NavigationIcons from '@/components/icons/navigation-icons';
import OtherIcons from '@/components/icons/other-icons';
import EditTextEditor from '@/components/tiptap/EditTextEditor';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAppSelector } from '@/hooks/useRedux';
import { RootState } from '@/lib/redux/store';
import { BookIcon, CogIcon, QrCodeIcon, StarIcon, UsersIcon } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import ContentCard from '../../../../components/ContentCard';
export default function GeneralTab({ form }: { form: UseFormReturn<any> }) {
  const data = useAppSelector((state: RootState) => state.syllabusDetails.data);

  if (!data) {
    return 'loading';
  }

  return (
    <div>
      <div className=" w-full flex gap-6 justify-start pt-2">
        <ContentCard title="Brief Information" icon={<OtherIcons icon="local-library" />} className="flex-[2]">
          <div className="space-y-4 p-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="col-span-4 flex gap-2 font-bold items-center">
                    <BookIcon />
                    Syllabus name
                  </div>
                  <FormControl>
                    <Input placeholder="Syllabus name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <div className="col-span-4 flex gap-2 font-bold items-center">
                    <QrCodeIcon />
                    Code
                  </div>
                  <FormControl>
                    <Input placeholder="Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <div className="col-span-4 flex gap-2 font-bold items-center">
                    <StarIcon />
                    Level
                  </div>
                  <FormControl>
                    <Input placeholder="Level" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="version"
              render={({ field }) => (
                <FormItem>
                  <div className="col-span-4 flex gap-2 font-bold items-center">
                    <CogIcon />
                    Version
                  </div>
                  <FormControl>
                    <Input placeholder="Version" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="attendeeNumber"
              render={({ field }) => (
                <FormItem>
                  <div className="col-span-4 flex gap-2 font-bold items-center">
                    <UsersIcon />
                    Attendee number
                  </div>
                  <FormControl>
                    <Input placeholder="Number" {...field} type="number" onChange={(e) => form.setValue('attendeeNumber', +e.target.value)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </ContentCard>
        <ContentCard title="Technical Requirement(s)" icon={<NavigationIcons icon="settings" />} className="flex-[3]">
          <FormField
            control={form.control}
            name="technicalRequirement"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <EditTextEditor content={form.getValues('technicalRequirement')} handleUpdate={(string: string) => form.setValue('technicalRequirement', string)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </ContentCard>
      </div>
      <ContentCard title="Course Objective" icon={<IndicatorIcons icon="filter-center-focus" />} className="mt-3">
        <FormField
          control={form.control}
          name="courseObjectives"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <EditTextEditor content={form.getValues('courseObjectives')} handleUpdate={(string: string) => form.setValue('courseObjectives', string)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
