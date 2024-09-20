import Typography from '@/components/Typography';

const SearchItem = ({ item }: any) => {
  return (
    <div className="w-full">
      <div>
        <div className="flex flex-row justify-between items-baseline">
          <Typography type="h3">{item.name + ' '}</Typography>
          <div>{item.slot + ' slots'} </div>
        </div>
        <div className="flex flex-row justify-between items-baseline">
          <div>{item.code + ' '}</div>
          <div>{item.status}</div>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
