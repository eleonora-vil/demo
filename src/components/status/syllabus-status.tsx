import { Badge } from '../ui/badge';

interface SyllabusStatusProps {
  status: 'Active' | 'Inactive' | 'Draft';
}

export default function SyllabusStatus({ status }: SyllabusStatusProps) {
  let statusColor = 'bg-primary hover:bg-primary/80 whitespace-nowrap';

  switch (status) {
    case 'Draft':
      statusColor = 'bg-[#285D9A] hover:bg-[#285D9A]/80 whitespace-nowrap';
      break;
    case 'Inactive':
      statusColor = 'bg-[#B9B9B9] hover:bg-[#B9B9B9]/80 whitespace-nowrap';
      break;
    case 'Active':
      statusColor = 'bg-primary hover:bg-primary/80 whitespace-nowrap';
      break;
    default:
      statusColor = 'bg-primary hover:bg-primary/80 whitespace-nowrap';
      break;
  }

  return <Badge className={statusColor}>{status}</Badge>;
}
