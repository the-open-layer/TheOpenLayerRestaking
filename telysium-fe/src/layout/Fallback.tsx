import { Spinner } from '@/components/ui/spiner';

const Fallback = () => {
  return (
    <div className="flex items-center justify-center h-[70vh] w-full">
      <Spinner size="large" />
    </div>
  );
};

export default Fallback;
