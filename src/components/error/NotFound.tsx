import monkey from '@/assets/images/monkey.png';
type NotFoundProps = {
  name?: string;
};
const NotFound = ({ name }: NotFoundProps) => {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col gap-5">
      <img src={monkey} alt="error" />
      <h1 className="uppercase font-bold text-xl">{name} not found!</h1>
    </div>
  );
};

export default NotFound;
