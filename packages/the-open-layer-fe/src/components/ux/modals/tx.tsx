import { Check, CircleX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { txStateEnum } from '@/types/action';
import { Spinner } from '@/components/ui/spiner';
import { ACTION_TYPES } from '@/constant';
import { formatNumber } from '@/lib/numbers';
export default function TXModal({
  action,
  amount,
  symol,
  status,
  handleClose,
  handleTryAgain,
  handleMore,
}: {
  action: ACTION_TYPES;
  amount: string;
  symol: string;
  status: txStateEnum;
  handleClose: () => void;
  handleTryAgain: () => void;
  handleMore?: () => void;
}) {
  // console.log('status', status);
  const amountfmt = formatNumber(amount || '0.000');
  const amountAndSymbol = `${amountfmt} ${symol}`;
  const renderDialogContent = () => {
    switch (status) {
      case txStateEnum.CONFIRMING:
        return (
          <>
            <DialogTitle className="capitalize">{action}</DialogTitle>
            <DialogDescription>
              Please confirm and sign the transaction in your wallet.
            </DialogDescription>
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <Spinner className="size-4 rounded-full" />
                <div className="text-muted-foreground">
                  <span className="capitalize">{action}</span> {amountAndSymbol}
                </div>
              </div>
            </div>
          </>
        );
      case txStateEnum.SUCCESS: {
        const desMap = {
          [ACTION_TYPES.STAKE]: `You've staked ${amountAndSymbol}!`,
          [ACTION_TYPES.UNSTAKE]: `You've unstaked ${amountAndSymbol}!`,
          [ACTION_TYPES.WITHDRAW]: `You've withdrawn ${amountAndSymbol}!`,
          [ACTION_TYPES.RESTAKE]: `You've restaked ${amountAndSymbol}!`,
        };

        return (
          <>
            <div className="mx-auto rounded-full p-3 bg-slate-100 mb-2">
              <Check className="w-6 h-6" />
            </div>
            <DialogDescription className="text-center mb-4 text-[#333]">
              {desMap[action]}
            </DialogDescription>
            {[ACTION_TYPES.STAKE, ACTION_TYPES.UNSTAKE].includes(action) &&
              typeof handleMore === 'function' && (
                <Button className="w-full" onClick={handleMore}>
                  Stake More
                </Button>
              )}
            {action === ACTION_TYPES.UNSTAKE && (
              <div className="text-[#999] text-sm">
                Your assets are entering a 7-day cooldown period. Assets cannot
                be withdrawn during the cooldown period.
              </div>
            )}
          </>
        );
      }

      case txStateEnum.ERROR: {
        return (
          <>
            <DialogDescription className="text-center text-lg text-[#333]">
              Failed to <span className="capitalize">{action}</span>
            </DialogDescription>
            <div className="mb-2 flex items-center text-[#999]">
              <CircleX className="size-5 text-red-700" />
              <span className="capitalize ml-3 mr-1">{action}</span>
              {amountAndSymbol}
            </div>
            <div className="text-center flex flex-col   gap-4">
              <Button className="flex-1" onClick={handleTryAgain}>
                Try Again
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </>
        );
      }
      default:
        return null;
    }
  };

  return (
    <Dialog open={status !== txStateEnum.IDLE} onOpenChange={handleClose}>
      <DialogTitle className="hidden">{action}</DialogTitle>
      <DialogContent className="w-[calc(100vw_-_6rem)] rounded-[20px]">
        {renderDialogContent()}
      </DialogContent>
    </Dialog>
  );
}
