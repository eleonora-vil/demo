import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { checkDuplicateEmail, checkValidEmail, handleCheckExistedEmail, removeRow, setExistedCount, setInvalidCount, setIsDataValid } from '@/lib/redux/createTraineeSlice';
import StatusCell from './status-cell';
import { Trash2 } from 'lucide-react';

interface Props {
  index: number;
  rowData?: any;
}

export default function DataRow({ index, rowData }: Props) {
  const { existedEmail, data } = useAppSelector((state) => state.createTrainee);
  const dispatch = useAppDispatch();
  const isExisted = handleCheckExistedEmail(existedEmail, rowData);
  const isValid = checkValidEmail(rowData);
  const isDuplicate = checkDuplicateEmail(data, rowData);

  const handleRemoveRow = () => {
    dispatch(removeRow({ index: index }));
  };

  return (
    <TableRow
      className={`${isValid === false && 'bg-red-100 hover:bg-red-100'} ${isExisted === true && 'bg-purple-100 hover:bg-purple-100'}  ${isDuplicate === true && 'bg-blue-100 hover:bg-blue-100'}`}
    >
      <TableCell>{index + 1}</TableCell>
      <TableCell>{rowData}</TableCell>
      <TableCell className="w-32">
        <StatusCell isValid={isValid} isExisted={isExisted} isDuplicate={isDuplicate} />
      </TableCell>
      <TableCell className="w-20">
        <Button className="bg-white text-primary border-[1px] border-input text-slate-500 hover:bg-slate-100" onClick={handleRemoveRow}>
          <Trash2 size={20} />
        </Button>
      </TableCell>
    </TableRow>
  );
}
