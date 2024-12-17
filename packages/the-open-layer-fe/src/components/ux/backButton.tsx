import WebApp from '@twa-dev/sdk';
import { memo, useEffect, useRef } from 'react';

export const ButtonBack = memo(({ onClick }: { onClick: () => void }) => {
  const onClickRef = useRef(onClick);
  useEffect(() => {
    onClickRef.current = onClick;
  }, [onClick]);

  useEffect(() => {
    const forceHide = () => WebApp.BackButton.hide();
    window.addEventListener('beforeunload', forceHide);
    return () => window.removeEventListener('beforeunload', forceHide);
  }, []);

  useEffect(() => {
    if (Number(WebApp.version) <= 6) return;
    const handleBackButtonClick = () => {
      onClickRef.current();
    };
    WebApp.BackButton.show();
    WebApp.BackButton.onClick(handleBackButtonClick);

    return () => {
      WebApp.BackButton.hide();
      WebApp.BackButton.offClick(handleBackButtonClick);
    };
  }, []);
  return null;
});
