import ActionIcons from '@/components/icons/action-icons';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/hooks/useRedux';
import { setIsCreateTraineeDialogOpen } from '@/lib/redux/form/userFormSlice';
import { Link } from 'react-router-dom';

interface Props {
  isAccessable: boolean;
}

export default function CreateTraineeButton({ isAccessable }: Props) {
  const dispatch = useAppDispatch();

  const handleOpenDialog = (isOpen: boolean) => {
    dispatch(setIsCreateTraineeDialogOpen(isOpen));
  };
  return (
    isAccessable && (
      <div>
        <Link to={'/user-management/create-trainee'} className="flex items-center gap-2">
          <Button onClick={() => handleOpenDialog(true)} className="flex items-center gap-2">
            <ActionIcons icon="add" />
            Create Trainee
          </Button>
        </Link>
      </div>
    )
  );
}
