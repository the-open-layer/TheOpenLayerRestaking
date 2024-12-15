import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { txStateEnum } from '@/types/action';
import { Spinner } from '@/components/ui/spiner';
import {
  ACTION_TYPES,
  ACTION_TYPES_NOW_MAP,
  ACTION_TYPES_TITLE_MAP,
} from '@/constant';

export default function TXModal({
  title,
  amount,
  symol,
  status,
  handleClose,
  handleTryAgain,
  // handleBacktodashboard,
}: {
  title: ACTION_TYPES;
  amount: string | null;
  symol: string;
  status: txStateEnum;
  handleClose: () => void;
  handleTryAgain: () => void;
  // handleBacktodashboard: () => void;
}) {
  // console.log('status', status);
  const renderDialogContent = () => {
    switch (status) {
      case txStateEnum.CONFIRMING:
        return (
          <>
            <DialogTitle>{ACTION_TYPES_TITLE_MAP[title]}</DialogTitle>
            <DialogDescription>
              Please confirm and sign the transaction in your wallet.
            </DialogDescription>
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <Spinner className="size-4 rounded-full" />
                <div className="text-muted-foreground">
                  {ACTION_TYPES_NOW_MAP[title]}{' '}
                  {[ACTION_TYPES.STAKE, ACTION_TYPES.UNSTAKE].includes(title)
                    ? amount || '0.000'
                    : null}{' '}
                  {symol}
                </div>
              </div>
            </div>
          </>
        );
      case txStateEnum.SUCCESS:
        return (
          <>
            <div className="mx-auto rounded-full p-3 bg-slate-100 mb-2">
              <Check className="w-6 h-6" />
            </div>
            <DialogDescription className="text-center">
              {title} Successful
            </DialogDescription>
            {/* <div className="text-center">
              <Button className="mt-4" onClick={handleBacktodashboard}>
                Go back to dashboard
              </Button>
            </div> */}
          </>
        );
      case txStateEnum.ERROR:
        return (
          <>
            <div className="mx-auto rounded-full p-3 bg-red-100 mb-2">
              <X className="w-6 h-6 text-red-500" />
            </div>
            <DialogDescription className="text-center">
              Transaction Failed
            </DialogDescription>
            <div className="text-center flex flex-col  gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button className="flex-1" onClick={handleTryAgain}>
                Try Again
              </Button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={status !== txStateEnum.IDLE} onOpenChange={handleClose}>
      <DialogTitle className="hidden">{title}</DialogTitle>
      <DialogContent className="w-[calc(100vw_-_6rem)] rounded-lg">
        {renderDialogContent()}
      </DialogContent>
    </Dialog>
  );
}
