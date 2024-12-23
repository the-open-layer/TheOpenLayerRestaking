import { useCallback, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link, useParams, useNavigate } from 'react-router-dom';
// import TonscanIcon from '@/assets/images/icon/tonscan.svg?react';
import { useAccount } from '@/hooks/useAccount';
// import useTonPrice from '@/hooks/api/useTonPrice';
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
import { ButtonBack } from '@/components/ux/backButton';

export default function Action() {
  const { action, token } = useParams();
  const { data: stakeList = [] } = useStakeList();
  const { connected, tonConnectUI } = useAccount();
  const [amount, setAmount] = useState('');
  // const { data: tonPrice } = useTonPrice();
  const navigate = useNavigate();
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
      return Big(fromNano(tokenAmount ?? 0).toString()).toFixed(2);
    } else {
      // action === ACTION_TYPES.UNSTAKE
      return restakingInfo?.restakeAmount.toFixed(2);
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
  const handleBacktodashboard = () => {
    handleClose();
    navigate(`/restake/${token}`);
  };

  const handleBack = useCallback(() => {
    navigate(`/restake/${token}`);
  }, [token, navigate]);
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
            <Skeleton className="w-24 h-8 bg-slate-300" />
          ) : (
            <div>
              {maxAmount} {token}
            </div>
          )
        ) : restakingInfoLoading ? (
          <Skeleton className="w-24 h-8 bg-slate-300" />
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
    <div className="container max-w-3xl px-4 py-8 mx-auto">
      <ButtonBack onClick={handleBack} />
      <h1 className="mb-6 text-3xl font-bold text-center capitalize">
        {action}
      </h1>
      <Card className="mb-8 border-none shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
          <Link
            to={`/restake/${token}`}
            className="flex items-center gap-x-4 hover:-translate-y-0.5"
          >
            <img
              src={restakeToken?.logo}
              alt={restakeToken?.name}
              className="size-10"
            />
            <div>
              <CardTitle className="text-xl">{restakeToken?.name}</CardTitle>
              <CardDescription>{restakeToken?.symbol}</CardDescription>
            </div>
          </Link>
          {/* <a
            href={`https://testnet.tonscan.org/address/${restakeToken?.jettonMaster}`}
            target="_blank"
          >
            <TonscanIcon className="cursor-pointer text-8" />
          </a> */}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col pt-5 space-y-4">
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-x-2">
                <div className="flex items-end gap-x-2 max-w-80">
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                    step={0.1}
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
            {/* <span className="text-sm text-muted-foreground">${USDTPrice}</span> */}

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
        </CardContent>
      </Card>

      {DepositList.length > 0 && (
        <Card className="bg-transparent shadow-none border-none">
          <CardContent className="flex flex-col gap-y-4">
            {DepositList.map(({ text, value }, idx) => {
              return (
                <div className="flex justify-between" key={idx}>
                  <span className="text-secondary-foreground">{text}</span>
                  <span className="text-[#666666]">{value}</span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      <TXModal
        action={action as ACTION_TYPES}
        amount={amount}
        symol={token!}
        status={txState}
        handleClose={handleClose}
        handleTryAgain={handleSubmit}
        handleMore={handleBacktodashboard}
      />
    </div>
  );
}
