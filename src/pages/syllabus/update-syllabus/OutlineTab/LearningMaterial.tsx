import NavigationIcons from '@/components/icons/navigation-icons';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { addMaterial } from '@/lib/redux/syllabusDetailsSlice';
import { formatDate } from '@/utils/DateUtils';
import { ZapOff } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
const LearningMaterial = ({ unitIndex, contentIndex, materials }: { unitIndex: number; contentIndex: number; materials: any }) => {
  const currentUser = useAppSelector(state => state.currentUser.user);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
  });
  const dispatch = useAppDispatch();

  const handleAddMaterial = () => {
    try {
      dispatch(addMaterial({ unitIndex, contentIndex, name: formData.name, url: formData.url, authorName: currentUser.fullName }));
      toast.success('Success', { position: 'top-right' });
    } catch (error: any) {
      toast.error(`fail`, {
        position: 'top-right',
      });
    }
  };

  console.log(materials);

  return (
    <Dialog>
      <DialogTrigger className="">
        <NavigationIcons icon="folder" className="hover:cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="max-w-3xl overflow-hidden">
        <DialogHeader className="p-4 bg-primary text-white">
          <DialogTitle className="font-bold">Learning material</DialogTitle>
        </DialogHeader>
        <div className="px-5">
          {materials.length == 0 ? (
            <div className="p-2 flex gap-2 text-primary font-bold items-center bg-slate-200 rounded-sm justify-center py-8">
              <ZapOff /> No materials{' '}
            </div>
          ) : (
            <div className="bg-slate-200 rounded-lg p-3">
              {materials.map((material: any, i: number) => {
                return (
                  <div className="flex justify-between" key={`learning-material-${i}`}>
                    <Link to={material.url ? material.url : '/'} className="text-blue-600 underline">
                      {material.name}
                    </Link>{' '}
                    <div className="italic">
                      by {material.createBy} on {formatDate(new Date(material.createDate))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="mt-3 flex flex-col gap-2 pb-5">
            <label htmlFor="materialUrlInput" className="font-bold">
              Add new material by URL
            </label>
            <Input id="materialUrlInput" placeholder="Material URL" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })}></Input>
            <label htmlFor="materialFileInput" className="font-bold">
              Or upload file
            </label>
            <Input id="materialFileInput" placeholder="Material URL" type="file"></Input>
            <label htmlFor="materialNameInput" className="font-bold">
              Name
            </label>
            <Input id="materialNameInput" placeholder="Material name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}></Input>
          </div>
        </div>
        <div className="flex justify-center gap-2 pb-5">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="text-red-500">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleAddMaterial}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LearningMaterial;
