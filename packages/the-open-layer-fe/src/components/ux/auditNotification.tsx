// import { useLocalStorage } from 'react-use';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export const AuditNotification = () => {
  // const [showAdvice, setShowAdvice] = useLocalStorage('audit-showAdvice', true);
  const [showAdvice, setShowAdvice] = useState(true);
  return (
    <div
      className={cn(
        'fixed bottom-4 left-4 right-4 p-4 bg-white shadow-md rounded-lg flex flex-col items-center',
        'transform transition-all duration-500 ease-in-out',
        showAdvice ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      )}
    >
      <p className="text-sm text-gray-700 mb-4 text-center">
        Our product is currently undergoing auditing, and there may be risks
        associated with interactions. If you'd like to become an early adopter,
        please{' '}
        <a
          href="https://t.me/the_open_layer"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          subscribe to our channel
        </a>
        .
      </p>
      <button
        onClick={() => {
          setShowAdvice(false);
        }}
        className="px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800"
      >
        I Understand
      </button>
    </div>
  );
};
