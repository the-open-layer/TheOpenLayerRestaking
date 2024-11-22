import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { DepositStateEnum } from '@/types/action';
import { Spinner } from '@/components/ui/spiner';

export default function Deposit({
  amount,
  symol,
  status,
  handleClose,
  handleTryAgain,
  handleBacktodashboard
}: {
  amount: string;
  symol: string;
  status: DepositStateEnum;
  handleClose: () => void;
  handleTryAgain: () => void;
  handleBacktodashboard: () => void;
}) {
  // console.log('status', status);
  const renderDialogContent = () => {
    switch (status) {
      case DepositStateEnum.CONFIRMING:
        return (
          <>
            <DialogTitle>Deposit</DialogTitle>
            <DialogDescription>
              Please confirm and sign the transaction in your wallet.
            </DialogDescription>
            <div className="space-y-4 mt-4">
            
              <div className="flex items-center gap-2 text-sm">
                <Spinner className='size-4 rounded-full' />
                <div className="text-muted-foreground">
                  Depositing {amount || '0.000'} {symol}
                </div>
              </div>
            </div>
          </>
        );
      case DepositStateEnum.SUCCESS:
        return (
          <>
            <div className="mx-auto rounded-full p-3 bg-slate-100 mb-2">
              <Check className="w-6 h-6" />
            </div>
            <DialogDescription className="text-center">
              Deposit Successful
            </DialogDescription>
            <div className="text-center">
              <Button className="mt-4" onClick={handleBacktodashboard}>
                Go back to dashboard
              </Button>
            </div>
          </>
        );
      case DepositStateEnum.ERROR:
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
    <Dialog open={status !== DepositStateEnum.IDLE} onOpenChange={handleClose}>
      <DialogContent className="w-[calc(100vw_-_6rem)] rounded-lg">
        {renderDialogContent()}
      </DialogContent>
    </Dialog>
  );
}
