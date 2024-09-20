import CheckBoxIcon from '@/assets/icons/indicator-icons/CheckBoxIcon';
import CheckBoxOutLineBlankIcon from '@/assets/icons/indicator-icons/CheckBoxOutLineBlankIcon';
import FilterCenterFocusIcon from '@/assets/icons/indicator-icons/FilterCenterFocusIcon';
import GradeIcon from '@/assets/icons/indicator-icons/GradeIcon';
import InfoIcon from '@/assets/icons/indicator-icons/InfoIcon';
import RadioButtonCheckedIcon from '@/assets/icons/indicator-icons/RadioButtonCheckedIcon';
import RadioButtonUncheckedIcon from '@/assets/icons/indicator-icons/RadioButtonUncheckedIcon';
import ReportProblemIcon from '@/assets/icons/indicator-icons/ReportProblemIcon';
import SupplierIcon from '@/assets/icons/indicator-icons/SupplierIcon';
import VerifiedUserIcon from '@/assets/icons/indicator-icons/VerifiedUserIcon';
import WarningLogoIcon from '@/assets/icons/indicator-icons/WarningLogoIcon';

type IndicatorIconsPropsType = {
  icon:
    | 'checkbox'
    | 'checkbox-outline-blank'
    | 'filter-center-focus'
    | 'grade'
    | 'info'
    | 'radio-button-checked'
    | 'radio-button-unchecked'
    | 'report-problem'
    | 'supplier'
    | 'verified-user'
    | 'warning-logo';
};
const IndicatorIcons = ({ icon, ...props }: IndicatorIconsPropsType & React.HTMLAttributes<SVGSVGElement>) => {
  switch (icon) {
    case 'checkbox': {
      return <CheckBoxIcon {...props} />;
    }
    case 'checkbox-outline-blank': {
      return <CheckBoxOutLineBlankIcon {...props} />;
    }
    case 'filter-center-focus': {
      return <FilterCenterFocusIcon {...props} />;
    }
    case 'grade': {
      return <GradeIcon {...props} />;
    }
    case 'info': {
      return <InfoIcon {...props} />;
    }
    case 'radio-button-checked': {
      return <RadioButtonCheckedIcon {...props} />;
    }
    case 'radio-button-unchecked': {
      return <RadioButtonUncheckedIcon {...props} />;
    }
    case 'report-problem': {
      return <ReportProblemIcon {...props} />;
    }
    case 'supplier': {
      return <SupplierIcon {...props} />;
    }
    case 'verified-user': {
      return <VerifiedUserIcon {...props} />;
    }
    case 'warning-logo': {
      return <WarningLogoIcon {...props} />;
    }
  }
};

export default IndicatorIcons;
