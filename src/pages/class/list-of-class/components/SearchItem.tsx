import Typography from '@/components/Typography';
import { formatDate } from '@/utils/DateUtils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SearchItem = ({ item }: any) => {
  return (
    <div>
      <div className="flex justify-between">
        <Typography type="h3">{item.programName + ' '}</Typography>
      </div>
      <div className="flex justify-between">
        <div>
          Modified at {formatDate(new Date(item.lastModifiedDate)) + ' '} by {item.lastUpdatedBy}
        </div>
        <div>{item.status}</div>
      </div>
    </div>
  );
};

export default SearchItem;
