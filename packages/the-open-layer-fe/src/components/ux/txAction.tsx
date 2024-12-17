import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAccount } from '@/hooks/useAccount';
import Big from 'big.js';
import { txStateEnum } from '@/types/action';
import TXModal from '@/components/ux/modals/tx';
import { Navigate } from 'react-router-dom';
import { ACTION_TYPES, SUPPORTED_ACTION_TYPES } from '@/constant';
import { useStakeList } from '@/hooks/api/useStakeList';
import { useBalance } from '@/hooks/useBalance';
import { fromNano } from '@ton/ton';
import { useUserRestaking } from '@/hooks/useUserRestaking';
import { Skeleton } from '@/components/ui/skeleton';
import { useStakeMutation, useUnstakeMutation } from '@/hooks/useStakeMutation';
import { precision } from '@/constant';

export default function TXAction({
  action,
  token,
}: {
  action: string;
  token: string;
}) {
  // const { action, token } = useParams();
  const { data: stakeList = [] } = useStakeList();
  const { connected, tonConnectUI } = useAccount();
  const [amount, setAmount] = useState('');
  // const { data: tonPrice } = useTonPrice();
  const [txState, settxState] = useState<txStateEnum>(txStateEnum.IDLE);
  const restakeToken = stakeList.find((v) => v.symbol === token);
  const { data: restakingInfo, isLoading: restakingInfoLoading } =
    useUserRestaking(restakeToken!.restakingMaster);
  const { data: tokenAmount, isLoading: isAmountLoading } = useBalance(
    restakeToken!.jettonMaster
  );
  const { mutateAsync: stakeMutation } = useStakeMutation(
    restakeToken!.jettonMaster,
    restakeToken!.restakingMaster
  );
  const { mutateAsync: unstakeMutation } = useUnstakeMutation(
    restakeToken!.jettonMaster,
    restakeToken!.restakingMaster
  );

  const maxAmount = useMemo(() => {
    if (action === ACTION_TYPES.STAKE) {
      return Big(fromNano(tokenAmount ?? 0).toString()).toFixed(precision);
    } else {
      // action === ACTION_TYPES.UNSTAKE
      return restakingInfo?.restakeAmount.toFixed(precision);
    }
  }, [action, tokenAmount, restakingInfo]);

  const handleSubmit = async () => {
    if (action === ACTION_TYPES.STAKE) {
      settxState(txStateEnum.CONFIRMING);
      try {
        const res = await stakeMutation(amount);
        if (res) {
          settxState(txStateEnum.SUCCESS);
        } else {
          settxState(txStateEnum.ERROR);
        }
      } catch (error) {
        console.error('Transaction failed', error);
        settxState(txStateEnum.ERROR);
      }
    } else {
      settxState(txStateEnum.CONFIRMING);
      try {
        const res = await unstakeMutation(amount);
        if (res) {
          settxState(txStateEnum.SUCCESS);
        } else {
          settxState(txStateEnum.ERROR);
        }
      } catch (error) {
        console.error('Transaction failed', error);
        settxState(txStateEnum.ERROR);
      }
    }
  };

  const handleClose = () => {
    settxState(txStateEnum.IDLE);
  };

  if (
    !SUPPORTED_ACTION_TYPES.includes(action as ACTION_TYPES) ||
    !stakeList.some((v) => v.symbol === token)
  ) {
    return <Navigate to="/404" />;
  }
  const DepositList = [
    {
      text:
        action === ACTION_TYPES.STAKE
          ? 'Available to stake'
          : 'Available to unstake',
      value: connected ? (
        action === ACTION_TYPES.STAKE ? (
          isAmountLoading ? (
            <Skeleton className="w-10 h-5 bg-slate-300" />
          ) : (
            <div>
              {maxAmount} {token}
            </div>
          )
        ) : restakingInfoLoading ? (
          <Skeleton className="w-10 h-5 bg-slate-300" />
        ) : (
          <div>
            {maxAmount} {token}
          </div>
        )
      ) : (
        <div>0 {token}</div>
      ),
      show: connected,
    },
    {
      text: 'You get',
      value: <div>20 OPEN XP / day</div>,
      show: connected && action !== ACTION_TYPES.UNSTAKE,
    },
  ].filter((v) => v.show);
  return (
    <div className="container max-w-3xl p-4 mx-auto">
      <h1 className="mb-6 capitalize text-xs font-medium md:text-3xl md:font-bold text-[#999] text-left">
        {action}
      </h1>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between gap-x-2">
            <div className="flex items-end gap-x-2 max-w-80">
              <Input
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                step={0.001}
                placeholder="0.0000"
                className="h-20 text-6xl"
              />
              <span className="text-base text-muted-foreground ">
                {restakeToken?.symbol}
              </span>
            </div>
            <Button
              variant="secondary"
              className="px-3 py-1 text-sm font-medium leading-none rounded-2xl h-7"
              onClick={() => {
                if (connected) {
                  setAmount(maxAmount!);
                } else {
                  tonConnectUI.openModal();
                }
              }}
              disabled={Number(maxAmount) === 0}
            >
              MAX
            </Button>
          </div>
        </div>

        {connected ? (
          <Button
            className="w-full rounded-2xl"
            size="lg"
            onClick={handleSubmit}
            disabled={
              Big(amount || 0).lte(0) ||
              Big(amount || 0)
                .minus(maxAmount ?? 0)
                .gt(0) ||
              Big(maxAmount || 0).lte(0)
            }
          >
            Submit
          </Button>
        ) : (
          <Button
            className="w-full border-black rounded-2xl"
            variant="outline"
            size="lg"
            onClick={() => {
              tonConnectUI.openModal();
            }}
          >
            Connect Wallet to Deposit
          </Button>
        )}
      </div>

      {DepositList.length > 0 && (
        <div className="px-0 pt-4 flex flex-col gap-y-2">
          {DepositList.map(({ text, value }, idx) => {
            return (
              <div className="flex justify-between text-sm" key={idx}>
                <span className="text-secondary-foreground font-medium">
                  {text}
                </span>
                <span className="text-[#666666]">{value}</span>
              </div>
            );
          })}
        </div>
      )}

      <TXModal
        action={action as ACTION_TYPES}
        amount={amount}
        symol={token!}
        status={txState}
        handleClose={handleClose}
        handleTryAgain={handleSubmit}
        handleMore={handleClose}
      />
    </div>
  );
}
