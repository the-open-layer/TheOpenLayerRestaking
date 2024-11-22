import { useRouteError } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TriangleAlert } from 'lucide-react';

export default function RootErrorBoundary() {
  const error = useRouteError() as Error;
  return (
    <div className="container mx-auto flex flex-col items-center px-4 py-8 max-w-3xl">
      <TriangleAlert
        size={100}
        color="#f44336"
        strokeWidth={6}
        absoluteStrokeWidth
      />
      <h1 className="text-3xl text-center font-bold pt-10">Error 500</h1>
      <p className="text-center text-gray-500 mt-2 mb-8">
        Sorry, something went wrong.
      </p>
      <pre className="text-center mb-6">
        {error.message || JSON.stringify(error)}
      </pre>
      <Button
        className="block mx-auto"
        onClick={() => window.location.reload()}
      >
        Click here to reload the app
      </Button>
    </div>
  );
}
