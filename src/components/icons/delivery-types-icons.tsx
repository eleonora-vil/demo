import ExamIcon from '@/assets/icons/delivery-types-icons/ExamIcon';
import LabIcon from '@/assets/icons/delivery-types-icons/LabIcon';
import LectureIcon from '@/assets/icons/delivery-types-icons/LectureIcon';
import QuizIcon from '@/assets/icons/delivery-types-icons/QuizIcon';
import ReviewIcon from '@/assets/icons/delivery-types-icons/ReviewIcon';
import WorkShopIcon from '@/assets/icons/delivery-types-icons/WorkShopIcon';
type DeliveryTypesIconsPropsType = {
  icon: 'exam' | 'lab' | 'lecture' | 'quiz' | 'review' | 'workshop';
};
const DeliveryTypesIcons = ({ icon, ...props }: DeliveryTypesIconsPropsType & React.HTMLAttributes<SVGSVGElement>) => {
  switch (icon) {
    case 'exam': {
      return <ExamIcon {...props} />;
    }
    case 'lab': {
      return <LabIcon {...props} />;
    }
    case 'lecture': {
      return <LectureIcon {...props} />;
    }
    case 'quiz': {
      return <QuizIcon {...props} />;
    }
    case 'review': {
      return <ReviewIcon {...props} />;
    }
    case 'workshop': {
      return <WorkShopIcon {...props} />;
    }
  }
};

export default DeliveryTypesIcons;
