import DocumentManageIcons from '@/components/icons/document-manage-icons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useAppDispatch } from '@/hooks/useRedux';
import { deleteLearningObjectsByIndex } from '@/lib/redux/syllabusDetailsSlice';
import { toast } from 'react-toastify';

const DeleteContent = ({ unitIndex, contentIndex }: { unitIndex: number; contentIndex: number }) => {
  const dispatch = useAppDispatch();
  const handleDeleteLearningObjs = () => {
    dispatch(
      deleteLearningObjectsByIndex({
        unitIndex: unitIndex,
        learningObjIndex: contentIndex,
      }),
    );
    toast.info('Slot is deleted');
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="gap-2 text-red-500 hover:text-red-400">
          <DocumentManageIcons icon="delete-forever" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone. This will permanently delete the learning content and remove data from our servers.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteLearningObjs} className="bg-red-500 hover:bg-red-400">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteContent;
