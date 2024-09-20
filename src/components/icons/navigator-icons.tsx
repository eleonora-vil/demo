import ArrowBackIosIcon from '@/assets/icons/navigator-icons/ArrowBackIosIcon';
import ArrowForwardIcon from '@/assets/icons/navigator-icons/ArrowForwardIcon';
import EastIcon from '@/assets/icons/navigator-icons/EastIcon';
import FirstPageIcon from '@/assets/icons/navigator-icons/FirstPageIcon';
import LastPageIcon from '@/assets/icons/navigator-icons/LastPageIcon';

type NavigatorIconsPropsType = {
  icon: 'arrow-back' | 'arrow-forward' | 'east' | 'first-page' | 'last-page';
};
const NavigatorIcons = ({ icon, ...props }: NavigatorIconsPropsType & React.HTMLAttributes<SVGSVGElement>) => {
  switch (icon) {
    case 'arrow-back': {
      return <ArrowBackIosIcon {...props} />;
    }
    case 'arrow-forward': {
      return <ArrowForwardIcon {...props} />;
    }
    case 'east': {
      return <EastIcon {...props} />;
    }
    case 'first-page': {
      return <FirstPageIcon {...props} />;
    }
    case 'last-page': {
      return <LastPageIcon {...props} />;
    }
  }
};
export default NavigatorIcons;
