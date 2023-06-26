import { IconDatabaseOff } from '@tabler/icons';

const NoData = () => {
  return (
    <div className="grid grid-cols-1 justify-items-center gap-3 rounded border border-gray-600 p-5">
      <IconDatabaseOff size={42} className="text-blue-500" />
      <p className="font-bold">No balance</p>
    </div>
  );
};

export default NoData;
