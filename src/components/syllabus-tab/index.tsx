import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tab } from '@/types/tab';

type SyllabusTabsPropsType = {
  tabs: Tab[];
};
export function SyllabusTabs({ tabs }: SyllabusTabsPropsType) {
  return (
    <Tabs defaultValue={tabs[0].label}>
      <TabsList className="p-0 ml-[2px]  md:w-full lg:w-auto ">
        {tabs.map((tab) => (
          <TabsTrigger value={tab.label} className="bg-gray-500 w-[200px] text-white rounded-t-md border border-white ml-[-2px] hover:bg-gray-600" key={tab.label}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent value={tab.label} className="m-0" key={tab.label}>
          <div>
            <div className="space-y-2 p-0">{tab.content}</div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
