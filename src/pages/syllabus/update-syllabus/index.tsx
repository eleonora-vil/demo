import { Link, useNavigate, useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Tab } from '@/types/tab';
import { SyllabusTabs } from '@/components/syllabus-tab';
import GeneralTab from './GeneralTab/GeneralTab';
import OutlineTab from './OutlineTab/OutlineTab';
import OtherTab from './OtherTab/OtherTab';
import { useEffect, useState } from 'react';
import { formatDate } from '@/utils/DateUtils';
import { FormProvider, useForm } from 'react-hook-form';
import { useAppSelector } from '@/hooks/useRedux';
import { RootState } from '@/lib/redux/store';
import Loading from '@/components/loading';
import NotFound from '@/components/error/NotFound';
import useGetSyllabusDetails from '@/hooks/useGetSyllabusDetails';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getSyllabusDetailById, updateFullSyllabus } from '@/lib/api/syllabus-detail-api';
import { toast } from 'react-toastify';
import { addIndexIntoSyllabus } from '@/utils/syllabus-convert-utils';

const formSchema = z.object({
  name: z.string().min(2).max(50),
  code: z.string().min(2).max(10),
  level: z.string().min(2).max(50),
  version: z.string().min(2).max(10),
  attendeeNumber: z
    .number()
    .min(0, {
      message: 'The number of attendees must be between 0 and 100',
    })
    .max(100, {
      message: 'The number of attendees must be between 0 and 100',
    }),
  courseObjectives: z.string().min(2).max(3000),
  technicalRequirement: z.string().min(2).max(3000),
  trainingDelivery: z.string().min(2).max(3000),
});

export default function SyllabusDetailPage() {
  const { getSyllabusDetails } = useGetSyllabusDetails();
  const { data, createTrainingProgramUnits, assessmentSchemeSyllabusModels } = useAppSelector((state: RootState) => state.syllabusDetails);
  const { userId } = useAppSelector((state: RootState) => state.currentUser.user);
  const { id } = useParams<string>();
  const [isLoading, setIsLoading] = useState(true);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (id != null) {
      getSyllabusDetails(id);
      getSyllabusDetailById(id)
        .then((res) => {
          if (res.error != null) {
            toast.error(res.error)
          } else {
            console.log(res?.data?.result?.getSyllabusResponse);
            form.setValue('name', res?.data?.result?.getSyllabusResponse?.name);
            form.setValue('code', res?.data?.result?.getSyllabusResponse?.code);
            form.setValue('level', res?.data?.result?.getSyllabusResponse?.level);
            form.setValue('version', res?.data?.result?.getSyllabusResponse?.version);
            form.setValue('courseObjectives', res?.data?.result?.getSyllabusResponse?.courseObjectives);
            form.setValue('technicalRequirement', res?.data?.result?.getSyllabusResponse?.technicalRequirement);
            form.setValue('attendeeNumber', res?.data?.result?.getSyllabusResponse?.attendeeNumber);
            form.setValue('trainingDelivery', res?.data?.result?.getSyllabusResponse?.trainingDelivery);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    if (data) {
      document.title = `Edit ${data.name} - FAMS`;
    } else {
      document.title = `FAMS`;
    }
  }, [data]);

  const tabs: Tab[] = [
    {
      label: 'General',
      content: <GeneralTab form={form} />,
    },
    {
      label: 'Outline',
      content: <OutlineTab />,
    },
    {
      label: 'Other',
      content: <OtherTab form={form} />,
    },
  ];
  const navigate = useNavigate();

  const handleSaveDraft = () => {
    // Do something to save the draft.
    // getvalues from form
    // call api to save draft
    if (id) {
      updateFullSyllabus(
        id,
        {
          name: form.getValues('name'),
          code: form.getValues('code'),
          level: form.getValues('level'),
          version: form.getValues('version'),
          courseObjectives: form.getValues('courseObjectives'),
          technicalRequirement: form.getValues('technicalRequirement'),
          attendeeNumber: form.getValues('attendeeNumber'),
          trainingDelivery: form.getValues('trainingDelivery') || 'string',
          instructorId: userId,
        },
        addIndexIntoSyllabus(createTrainingProgramUnits),
        'Inactive',
        assessmentSchemeSyllabusModels,
      )
        .then((res) => {
          if (res?.error) {
            toast.error(res.error?.response?.message);
            return;
          } else {
            toast.success(res?.data?.result?.message || 'Syllabus updated successfully');
            navigate('/syllabus/' + id);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(id);
    const formatAssessmentSchemeSyllabus=assessmentSchemeSyllabusModels.map((item:any,index:number)=>{
      return {assessmentSchemeId:item.assessmentSchemeId,syllabusId:item.syllabusId,percentMark:item.percentMark}
    })
    if (id) {
      updateFullSyllabus(
        id,
        {
          name: values.name,
          code: values.code,
          level: values.level,
          version: values.version,
          courseObjectives: values.courseObjectives,
          technicalRequirement: values.technicalRequirement,
          attendeeNumber: values.attendeeNumber,
          trainingDelivery: values.trainingDelivery,
          instructorId: userId,
        },
        addIndexIntoSyllabus(createTrainingProgramUnits),
        'Inactive',
        formatAssessmentSchemeSyllabus,
      )
        .then((res) => {
          console.log(res.error);
          
          if (res?.error) {
            toast.error(res.error);
            return;
          } else {
            toast.success(res?.data?.result?.message || 'Syllabus updated successfully');
            navigate('/syllabus/' + id);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }

  form.watch(['name', 'code', 'version']);

  if (isLoading) return <Loading />;
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {data ? (
          <div className="w-full">
            {/* BEGIN Program header */}
            <div>
              <div className="py-3 px-8">
                <div className="text-[20px] pb-1 font-semibold tracking-[0.2em]">Syllabus</div>
                <div>
                  <div className="w-full flex justify-between">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-[24px] font-bold tracking-wide text-4xl">{form.getValues('name')}</div>
                      <div>
                        <Badge className="bg-primary py-1">{data.status}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/syllabus/${data.syllabusId}`}>
                        <Button type="button" variant="outline" className="text-red-500 hover:text-red-500">
                          Cancel
                        </Button>
                      </Link>
                      <Button type="button" variant="outline" className="text-blue-500 bg-blue-100 hover:bg-blue-200" onClick={handleSaveDraft}>
                        Save as draft
                      </Button>

                      <Button type="submit">Save</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="justify-between py-3 px-8 text-[16px] border-t border-b border-black flex">
                <div className="flex  gap-3">
                  <span className="font-semibold">
                    {form.getValues('code')} v{form.getValues('version')}
                  </span>
                  <span className="font-semibold">&bull;</span>
                  <span>
                    Modified on {formatDate(new Date(data.updatedDate))} by {data.instructorName}
                  </span>
                </div>
                <div className="font-semibold">({data.unit.length} slots)</div>
              </div>
            </div>
            {/* END Program header */}
            {/* BEGIN Syllabus Tabs */}
            <div className="px-5 w-full my-5">
              <SyllabusTabs tabs={tabs} />
            </div>
            {/* END Syllabus Tabs */}
          </div>
        ) : (
          <NotFound />
        )}
      </form>
    </FormProvider>
  );
}
