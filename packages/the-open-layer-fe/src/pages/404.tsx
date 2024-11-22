import { Button } from '@/components/ui/button';
import { Flag } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function Page404() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex flex-col items-center">
        <Flag className="w-20 h-20 mx-auto" />
        <h2 className="mt-10 text-3xl text-center font-bold">Error 404</h2>
        <p className="text-center text-gray-500 my-8">
          Sorry, the page you visited does not exist.
        </p>
        <Link to="/restake">
          <Button className="w-full px-4 md:w-[8rem]">back to home</Button>
        </Link>
      </div>
    </div>
  );
}
