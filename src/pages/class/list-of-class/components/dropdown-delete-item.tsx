import DocumentManageIcons from '@/components/icons/document-manage-icons';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import axios from 'axios';

export default function DropdownDeleteItem({ id }: { id: string | number }) {
  const handleDelete = () => {
    const url = 'https://6544ed325a0b4b04436d3a1e.mockapi.io/api/v1/staffManagement/classData';
    axios
      .delete(`${url}/${id}`)
      .then(() => {
        console.log(`Item with id ${id} deleted successfully.`);
      })
      .catch((error) => console.error('Error deleting item:', error));
  };

  return (
    <DropdownMenuItem className="text-zinc-400" onClick={handleDelete}>
      {' '}
      <DocumentManageIcons icon="delete-forever" className="mx-2 w-[24px] h-[24px]" />
      Delete program
    </DropdownMenuItem>
  );
}
