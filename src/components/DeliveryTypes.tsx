import DeliveryTypesIcons from './icons/delivery-types-icons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export type DeliveryType = 'lab' | 'lecture' | 'exam' | 'workshop' | 'review';
type DeliveryTypesProps = {
  deliveryType: DeliveryType;
};

const DeliveryTypes = ({ deliveryType }: DeliveryTypesProps) => {
  let text = '';
  switch (deliveryType) {
    case 'lab': {
      text = 'Asignment/Lab';
      break;
    }
    case 'lecture': {
      text = 'Concept/Lecture';
      break;
    }
    case 'exam': {
      text = 'Exam';
      break;
    }
    case 'workshop': {
      text = 'Seminar/Workshop';
      break;
    }
    case 'review': {
      text = 'Concept/Lecture';
      break;
    }
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <DeliveryTypesIcons icon={deliveryType} />
        </TooltipTrigger>
        <TooltipContent>{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DeliveryTypes;
