import { MultiSelect } from "@/components/fancy-select-box";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TypographyDemo from "./TypographyDemo";
import Overview from "./Overview";

export default function TabsDashboard() {
  return (
    <Tabs defaultValue="font" className="space-y-4 p-6 pt-0">
      <TabsList>
        <TabsTrigger value="font">Overview</TabsTrigger>
        <TabsTrigger value="Typography">Typography</TabsTrigger>
      </TabsList>
      <TabsContent value="font" className="space-y-4">
        <Overview />
      </TabsContent>
      <TabsContent value="Typography" className="space-y-4">
        <div className="w-[300px]">
          <MultiSelect />
        </div>
        <TypographyDemo />
      </TabsContent>
    </Tabs>
  );
}
