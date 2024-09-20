import { axiosClient } from '@/lib/api/config/axios-client';
import { handleApiError } from '@/lib/api/role-api';
import { getAllSyllabuses } from '@/lib/api/syllabus-detail-api';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import SearchItem from './SearchItem';
import SyllabusAddedItem from './SyllabusAddedItem';
const SearchBar = ({ method, id }: any) => {
  const [options, setOptions] = useState([]);

  const [listSyllabus, setListSyllabus] = useState([]);

  const [getHidden, setGetHidden] = useState(true);
  const [data, setData] = useState([]);

  const getData = async () => {
    setData((await getAllSyllabuses()).data.result.syllabus);
  };
  useEffect(() => {
    getData();
    getDetailProgram();
  }, []);
  useEffect(() => {
    const list = data.map((item: any, index: any) => {
      return { value: item.syllabusId, label: item };
    });
    setOptions(list as any);
    console.log(options);
  }, [data]);
  const getDetailProgram = async () => {
    try {
      console.log(id);

      if (id != 'undefined') {
        console.log('vao');

        const result = await axiosClient.get(`/api/TrainingProgram/getDetails/${id}`);
        console.log('result in get detail syllabus training program ', result);
        setListSyllabus(result.data.result.listSyllabus);
      }
    } catch (error) {
      return handleApiError(error);
    }
  };
  useEffect(() => {
    const listIDs: any = [];
    listSyllabus.map((item, index) => listIDs.push(item));
    method(listIDs);
  }, [listSyllabus]);
  const setSyllabus = (item: any) => {
    console.log(listSyllabus);
    let exist=false;
    listSyllabus.forEach((value: any,index: number)=>
    {
      if(item.syllabusId == value?.syllabusId){
          
          exist=true
      }
    }
    )
    if(exist){
      console.log("exist");
      
    }
    else{
      setListSyllabus([...listSyllabus, item] as any);
    }
    
  };

  const getItemHidden = () => {
    setGetHidden(!getHidden);
  };

  const formatItem = ({ value, label }: any) => {
    return <SearchItem item={label} />;
  };
  return (
    <>
      <div className="w-full mb-20">
        {/* <Command
        onClick={getItemHidden}
        filter={(value: any, search) => {
          console.log(value.split(" ")[0]);
          
          if (value.split(" ")[0].includes(search)) {
            return 1;
          }
          return 0;
        }}
      >
        <div>
          {" "}
          <CommandInput placeholder="Type a name of syllabus..." className="bg-slate-100 border" />
        </div>
        <CommandList  hidden={getHidden} className="w-full h-30">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Syllabus">
            {data.map((item: any, index) => {
              return (
                <CommandItem key={index} onSelect={() => setSyllabus(item)}>
                  <SearchItem item={item} />
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>  */}
        <Select
          isClearable
          placeholder="Type name of syllabus"
          options={options}
          formatOptionLabel={(options) => formatItem(options)}
          onChange={(e: any) => {
            setSyllabus(e.label);
          }}
          filterOption={(candidate: any, input) => {
            if (candidate.label?.name) {
              if (candidate.label?.name.includes(input) || candidate.label.code.includes(input)) {
                return true;
              }
            }

            return false;
          }}
        ></Select>
      </div>
      {listSyllabus.length > 0 ? (
        <div className="overflow-y-auto text-center flex flex-col gap-3">
          {listSyllabus.map((item, index) => {
            return <SyllabusAddedItem syllabusDetail={item} value={listSyllabus} method={setListSyllabus} index={index} key={index} />;
          })}
        </div>
      ) : (
        <div>
          <div className="border text-center bg-slate-100">No syllabus</div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
