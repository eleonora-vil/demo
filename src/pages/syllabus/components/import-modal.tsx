import DocumentManageIcons from '@/components/icons/document-manage-icons';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useAuthorized from '@/hooks/useAuthorized';

export function ImportModal() {
  const isAccessable = useAuthorized({ requestTo: 'syllabus', actionType: 'create' });

  return (
    <div>
      {isAccessable ? (
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary text-white flex gap-2">
                <DocumentManageIcons icon="upload" />
                Import
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader className="bg-primary">
                <DialogTitle className="flex justify-center text-white p-4">Import Training Program</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-3">
                <div className="grid grid-cols-12  items-center gap-4">
                  <Label htmlFor="file" className="flex justify-center col-span-4">
                    File(.xsxl, .csv)
                  </Label>
                  <div className="col-span-8 px-6">
                    <Input id="file" type="file" />
                  </div>
                </div>
                <div className="grid grid-cols-12 items-center gap-4">
                  <Label htmlFor="duplicatehandler" className="flex justify-center col-span-4 ">
                    Duplicate Handler
                  </Label>
                  <div className="col-span-8 px-6">
                    <Select>
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="allow">Allow</SelectItem>
                        <SelectItem value="replace">Replace</SelectItem>
                        <SelectItem value="skip">Skip</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Button type="submit">Save changes</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
