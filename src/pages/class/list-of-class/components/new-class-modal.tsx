// import DocumentManageIcons from '@/components/icons/document-manage-icons';
// import { Button } from '@/components/ui/button';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// export function CreateClassModal() {
//   return (
//     <div>
//       <Dialog>
//         <DialogTrigger asChild>
//           <Button className="bg-blue-500 text-white px-4 py-2 rounded-md">New Class</Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[500px]">
//           <DialogHeader className="bg-white">
//             <DialogTitle className="flex justify-center text-white font-bold bg-primary p-4"> Create Class</DialogTitle>
//             <div className="grid gap-4 py-3">
//               <div className="grid grid-cols-12  items-center gap-4">
//                 <Label htmlFor="file" className="text-end col-span-4">
//                   ClassName
//                 </Label>
//                 <div className="col-span-8 px-6">
//                   <Input id="name" defaultValue="" />
//                 </div>
//               </div>
//               <div className="grid grid-cols-12  items-center gap-4">
//                 <Label htmlFor="file" className="text-end col-span-4">
//                   ProgramID
//                 </Label>
//                 <div className="col-span-8 px-6">
//                   <Input id="name" defaultValue="" />
//                 </div>
//               </div>
//               <div className="grid grid-cols-12  items-center gap-4">
//                 <Label htmlFor="file" className="text-end col-span-4">
//                   InstructorID
//                 </Label>
//                 <div className="col-span-8 px-6">
//                   <Input id="name" defaultValue="" />
//                 </div>
//               </div>
//               <div className="grid grid-cols-12  items-center gap-4">
//                 <Label htmlFor="file" className="text-end col-span-4">
//                   StateDate
//                 </Label>
//                 <div className="col-span-8 px-6">
//                   <Input id="name" defaultValue="" />
//                 </div>
//               </div>
//               <div className="grid grid-cols-12  items-center gap-4">
//                 <Label htmlFor="file" className="text-end col-span-4">
//                   EndDate
//                 </Label>
//                 <div className="col-span-8 px-6">
//                   <Input id="name" defaultValue="" />
//                 </div>
//               </div>
//               <div className="grid grid-cols-12  items-center gap-4">
//                 <Label htmlFor="file" className="text-end col-span-4">
//                   Time
//                 </Label>
//                 <div className="col-span-8 px-6">
//                   <Input id="name" defaultValue="" />
//                 </div>
//               </div>

//               <div className="grid grid-cols-12 items-center gap-4">
//                 <Label htmlFor="duplicatehandler" className="text-end col-span-4 ">
//                   Status
//                 </Label>
//                 <div className="col-span-8 px-6">
//                   <Select>
//                     <SelectTrigger id="framework">
//                       <SelectValue placeholder="Select" />
//                     </SelectTrigger>
//                     <SelectContent position="popper">
//                       <SelectItem value="Online">Online</SelectItem>
//                       <SelectItem value="Offline">Offline</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-center pb-5">
//               <Button className="bg-primary" type="submit">
//                 Create
//               </Button>
//             </div>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
