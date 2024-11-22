import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useUserRestaking } from '@/hooks/useUserRestaking';
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom';
import { useStakeList } from '@/hooks/api/useStakeList';
import { WITHDRAWSTATUS } from '@/constant';
import { Skeleton } from '@/components/ui/skeleton';
import TXModal from '@/components/ux/modals/tx';
import { ACTION_TYPES } from '@/constant';
// import { useTokenPrice } from '@/hooks/useTokenPrice';
import {
  useWithdrawMutation,
  useRedepositMutation,
} from '@/hooks/useStakeMutation';
import { txStateEnum } from '@/types/action';
import { useState } from 'react';
import { useAccount } from '@/hooks/useAccount';

export default function Token() {
  const { token } = useParams();
  const { connected } = useAccount();
  const { data: stakeList = [] } = useStakeList();
  const restakeToken = stakeList.find((v) => v.symbol === token);
  const [action, setAction] = useState<ACTION_TYPES>(ACTION_TYPES.DEPOSIT);
  const [txState, settxState] = useState<txStateEnum>(txStateEnum.IDLE);
  const [pendingIndex, setPendingIndex] = useState<bigint>(BigInt(0));
  // const { data: tokenPrice } = useTokenPrice(token!);
  // console.log({ restakingInfo, tokenPrice });
  const { data: restakingInfo, isLoading: restakingInfoLoading } =
    useUserRestaking(restakeToken!.restakingMaster);
  const restakeAmount = restakingInfo?.restakeAmount;
  const maxPendingAmount = restakingInfo?.maxPendingAmount;
  const { mutateAsync: withdraw } = useWithdrawMutation(
    restakeToken!.jettonMaster,
    restakeToken!.restakingMaster
  );
  const { mutateAsync: redeposit } = useRedepositMutation(
    restakeToken!.restakingMaster
  );
  const navigate = useNavigate();
  const handleClose = () => {
    settxState(txStateEnum.IDLE);
  };
  const handleBacktodashboard = () => {
    handleClose();
    navigate(`/restake/${token}`);
  };

  const handleSubmit = async (
    txAction = action,
    txPendingIndex = pendingIndex
  ) => {
    if (txAction === ACTION_TYPES.WITHDRAW) {
      settxState(txStateEnum.CONFIRMING);
      try {
        const res = await withdraw(txPendingIndex);
        if (res) {
          settxState(txStateEnum.SUCCESS);
        } else {
          settxState(txStateEnum.ERROR);
        }
      } catch (error) {
        settxState(txStateEnum.ERROR);
      }
    } else {
      settxState(txStateEnum.CONFIRMING);
      try {
        const res = await redeposit(txPendingIndex);
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
  console.log({ restakingInfo });
  if (!stakeList.some((v) => v.symbol === token)) {
    return <Navigate to="/404" />;
  }
  return (
    <main className="container mx-auto p-4 space-y-6 lg:space-y-8">
      <div className="flex items-center gap-3 mb-7">
        <img
          src={restakeToken!.logo}
          alt="Tonstakers TON"
          width={48}
          height={48}
          className="rounded-full"
        />
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">{restakeToken!.name}</h1>
          <Badge variant="outline">{restakeToken!.symbol}</Badge>
        </div>
      </div>

      <Card className="bg-black text-white rounded-2xl text-center ">
        <CardContent className="p-6 md:max-w-md mx-auto space-y-7 md:space-y-14">
          <div className="mb-4 md:pt-5 space-y-2">
            <div className="text-xl md:text-3xl mb-4 md:pt-5">
              Earn <span className="text-[#8BAFFF]">20 OPEN XP</span> every day
            </div>
            <p className="text-sm md:text-2xl">
              with every 1 {restakeToken!.symbol} restaked
            </p>
          </div>
          <Link to={`/restake/deposit/${token}`} className="block">
            <Button
              size="lg"
              className="w-full bg-white text-black hover:bg-gray-100 rounded-3xl md:mb-5"
            >
              Restake
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Your Restake</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-slate-100 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-muted-foreground">
                RESTAKED BALANCE
              </div>
              <Link to={`/restake/unstake/${token}`}>
                <Button variant="outline" size="sm">
                  Unstake
                </Button>
              </Link>
            </div>
            <div className="text-2xl font-semibold flex gap-2">
              {restakingInfoLoading ? (
                <Skeleton className="w-24 h-8 bg-slate-300" />
              ) : (
                (restakeAmount?.toFixed(2) ?? 0)
              )}
              <span className="text-muted-foreground">{token}</span>
            </div>
          </div>

          <div className="p-4 bg-slate-100 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-muted-foreground">
                AVAILABLE TO WITHDRAW
              </div>
            </div>
            <div className="text-2xl font-semibold mb-4 flex gap-2">
              {restakingInfoLoading ? (
                <Skeleton className="w-24 h-8 bg-slate-300" />
              ) : (
                (maxPendingAmount?.toFixed(2) ?? 0)
              )}{' '}
              <span className="text-muted-foreground">{token}</span>
            </div>
            <div className="space-y-3 lg:space-y-6">
              {restakingInfo?.pendingJettons.map((tx, i) => (
                <div
                  className="space-y-4 lg:space-y-8 bg-slate-300 rounded-lg py-4 px-2"
                  key={i}
                >
                  <div className="flex flex-col gap-2 lg:flex-row items-center">
                    <div className="text-lg font-medium">
                      unstake {tx.amount} {token}
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="text-sm text-muted-foreground">
                        {tx?.unstakeTimeFmt}
                      </div>
                      <Badge variant={'secondary'} className="mt-1">
                        {tx.isLocked
                          ? WITHDRAWSTATUS.PENDING
                          : WITHDRAWSTATUS.COMPLETED}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-3 flex-col md:flex-row">
                    <Button
                      className="flex-1"
                      disabled={tx.isLocked}
                      onClick={() => {
                        setAction(ACTION_TYPES.REDEPOSIT);
                        settxState(txStateEnum.CONFIRMING);
                        setPendingIndex(tx.pendingIndex);
                        handleSubmit(ACTION_TYPES.REDEPOSIT, tx.pendingIndex);
                      }}
                    >
                      Redeposit
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      disabled={tx.isLocked}
                      onClick={() => {
                        // withdraw(tx.pendingIndex);
                        setAction(ACTION_TYPES.WITHDRAW);
                        settxState(txStateEnum.CONFIRMING);
                        setPendingIndex(tx.pendingIndex);
                        handleSubmit(ACTION_TYPES.WITHDRAW, tx.pendingIndex);
                      }}
                    >
                      Withdraw
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Your Withdraw</CardTitle>
        </CardHeader>
        <CardContent>
          {restakingInfoLoading ? (
            <div className="flex items-center justify-between gap-y-4">
              <div className="space-y-3">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-5 w-14" />
              </div>
              <Skeleton className="h-5 w-14" />
            </div>
          ) : (
            <div className="space-y-4">
              {!connected || restakingInfo?.withdrawalJettons?.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center">
                  no data
                </div>
              ) : (
                restakingInfo?.withdrawalJettons.map((tx, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-medium">Withdraw {token}</div>
                        <div className="text-sm text-muted-foreground">
                          {tx.amount} {token}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        {tx?.createdTime}
                      </div>
                      <Badge variant={'secondary'} className="mt-1">
                        {WITHDRAWSTATUS.COMPLETED}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
      <TXModal
        title={action as ACTION_TYPES}
        amount={null}
        symol={token!}
        status={txState}
        handleClose={handleClose}
        handleTryAgain={() => handleSubmit(action, pendingIndex)}
        handleBacktodashboard={handleBacktodashboard}
      />
    </main>
  );
}
