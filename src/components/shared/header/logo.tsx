import LogoImage from '@/assets/images/logo.png';

export default function Logo() {
  return (
    <div className="w-[68px] flex justify-center items-center">
      <img src={LogoImage} alt="FAMS Logo" className="logo w-full h-full object-contain" />
    </div>
  );
}
