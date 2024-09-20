import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select as CnSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppSelector } from '@/hooks/useRedux';
import { getClassDetail } from '@/lib/api/class-api';
import { setScheduleDetailsField } from '@/lib/redux/scheduleSlice';
import { cn } from '@/utils';
import { formatDate } from '@/utils/DateUtils';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from 'react-select';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SyllabusCard = ({ syllabus, form }: any) => {
  const users = useAppSelector((state) => state.user.users);
  const trainers = users.filter(u => u.roleName == "Instructor");
  const rooms = useAppSelector((state) => state.room.rooms);
  const schedule = useAppSelector((state) => state.schedule);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [classDetails, setClassDetails] = useState<any>({});
  const classId = useAppSelector((state) => state.schedule.classId);
  const [renderKey, setRenderKey] = useState(0);
  const semester = classDetails?.class?.semester;

  const rerender = () => {
    setRenderKey(renderKey + 1);
  }

  useEffect(() => {
    getClassDetail(classId.toString())
      .then((res) => {
        setClassDetails(res?.data?.result);
      })
      .catch(() => {
        console.log('Error');
      });
  }, []);
  const trainerOptions = trainers.map((trainer) => {
    return {
      value: trainer.userId,
      label: trainer,
    };
  });
  const dispatch = useDispatch();
  const currenSchedule = schedule.scheduleDetails.find((x) => x.syllabusId === syllabus.syllabusId);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatItem = ({  label }: any) => {
    return (
      <div className="flex gap-2 items-center py-[1px]">
        <Avatar className="h-8 w-8">
          <AvatarImage src={label.avatar} alt="trainer" />
          <AvatarFallback>{label.fullName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-[12px]">{label.fullName}</p>
          <p className="text-[9px]">{label.email}</p>
        </div>
      </div>
    );
  };
  if (!syllabus) {
    return;
  }
  return (
    <div className="p-3 shadow rounded-lg">
      <h3 className="text-2xl font-bold">
        <Link to={`/syllabus/${syllabus.syllabusId}`}>{syllabus.name}</Link>
      </h3>
      <div className="flex justify-between">
        <div>
          <strong>
            {syllabus.code} v{syllabus.version}
          </strong>
          <span className="mx-2">&bull;</span>
          Modified on {formatDate(new Date(syllabus.updatedDate))}&nbsp; by
        </div>
        <strong>({syllabus.slot} slots)</strong>
      </div>
      <hr className="my-2" />
      <div className="grid grid-cols-12 gap-5">
        <div className="xl:col-span-3 lg:col-span-4 col-span-6">
          <strong>Trainer</strong>
          <Select
            placeholder="Choose trainer"
            options={trainerOptions}
            formatOptionLabel={(options) => formatItem(options)}
            onChange={(user) => {
              console.log(user);
              dispatch(
                setScheduleDetailsField({
                  field: 'trainerId',
                  syllabusId: syllabus.syllabusId,
                  value: user?.value,
                }),
              );
            }}
          ></Select>
        </div>
        <div className="xl:col-span-3 lg:col-span-4 col-span-6">
          <div>
            <strong>Date</strong>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={'outline'} className={cn('pl-3 text-left font-normal w-full ', !currenSchedule?.date && 'text-muted-foreground')}>
                {currenSchedule?.date ? format(currenSchedule?.date, 'PPP') : <span>Pick a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit  bg-slate-100 p-0" align="start">
              <Calendar
                mode="single"
                
                captionLayout='dropdown-buttons'
                selected={currenSchedule?.date ? new Date(currenSchedule.date) : new Date()}
                onSelect={(value) => {
                  console.log(value);
                  dispatch(
                    setScheduleDetailsField({
                      field: 'date',
                      syllabusId: syllabus.syllabusId,
                      value: value?.toISOString() ?? '', // Add nullish coalescing operator
                    }),
                  );
                  rerender();
                }}
                disabled={(date) =>
                  date < new Date(semester?.semesterStartDate || new Date()) || date > new Date(semester?.semesterEndDate || new Date())
                }
                initialFocus
                fromYear={1960}
                toYear={2050}
              />
            </PopoverContent>
          </Popover>
          <FormDescription>
            From {format(new Date(semester?.semesterStartDate || new Date()), 'PPP') + ' To ' + format(new Date(semester?.semesterEndDate || new Date()), 'PPP')}
          </FormDescription>
          <FormMessage />

        </div>
        <div className="xl:col-span-3 lg:col-span-4 col-span-6">
          <strong>Room</strong>
          <CnSelect
            onValueChange={(value) => {
              dispatch(
                setScheduleDetailsField({
                  field: 'roomId',
                  syllabusId: syllabus.syllabusId,
                  value: value,
                }),
              );
            }}
            defaultValue={currenSchedule?.roomId + ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a room" />
            </SelectTrigger>
            <SelectContent>
              {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              rooms.map((rooms: any, index: number) => {
                return (
                  <SelectItem value={rooms.roomId + ""} key={`room-${syllabus.syllabusId}-${index}`}>
                    {rooms.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </CnSelect>
          <FormMessage />

        </div>
        <div className="xl:col-span-3 lg:col-span-4 col-span-6">
          <strong>Slot</strong>
          <FormField
            control={form.control}
            name="slot"
            render={() => (
              <FormItem>
                <CnSelect
                  onValueChange={(value) => {
                    console.log(value);
                    dispatch(
                      setScheduleDetailsField({
                        field: 'slot',
                        syllabusId: syllabus.syllabusId,
                        value: +value,
                      }),
                    );
                  }}
                  defaultValue={currenSchedule?.slot?.toString() || '1'}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a slot" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={'1'} key={`slot-1`}>
                      Morning
                    </SelectItem>
                    <SelectItem value={'2'} key={`slot-2`}>
                      Noon
                    </SelectItem>
                    <SelectItem value={'3'} key={`slot-3`}>
                      Night
                    </SelectItem>
                  </SelectContent>
                </CnSelect>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SyllabusCard;
