import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tab } from '@/types/tab';

type SyllabusTabsPropsType = {
  tabs: Tab[];
};
export function TabsButton({ tabs }: SyllabusTabsPropsType) {
  return (
    <Tabs defaultValue={tabs[0].label}>
      <TabsList className=" bg-slate-200 ">
        {tabs.map((tab) => (
          <TabsTrigger
            value={tab.label}
            // className="text-black bg-white"
            key={tab.label}
          >
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
