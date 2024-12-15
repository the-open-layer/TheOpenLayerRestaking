import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useUserRestaking } from '@/hooks/useUserRestaking';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useStakeList } from '@/hooks/api/useStakeList';
import { WITHDRAWSTATUS } from '@/constant';
import { Skeleton } from '@/components/ui/skeleton';
import TXModal from '@/components/ux/modals/tx';
import TXAction from '@/components/ux/txAction';
import { ACTION_TYPES } from '@/constant';
// import { useTokenPrice } from '@/hooks/useTokenPrice';
import {
  useWithdrawMutation,
  useRedepositMutation,
} from '@/hooks/useStakeMutation';
import { txStateEnum } from '@/types/action';
import { useState } from 'react';
import { useAccount } from '@/hooks/useAccount';
import { precision } from '@/constant';

export default function Token() {
  const { token } = useParams();
  const { connected } = useAccount();
  const { data: stakeList = [] } = useStakeList();
  const restakeToken = stakeList.find((v) => v.symbol === token);
  const [action, setAction] = useState<ACTION_TYPES>(ACTION_TYPES.STAKE);
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
  const handleClose = () => {
    settxState(txStateEnum.IDLE);
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
        console.error('Transaction failed', error);
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
  // console.log({ restakingInfo });
  if (!stakeList.some((v) => v.symbol === token)) {
    return <Navigate to="/404" />;
  }
  return (
    <main className="container p-4 mx-auto space-y-4 lg:space-y-8">
      <Card className="text-center text-white bg-black rounded-2xl shadow-none border-none">
        <CardContent className="p-4 mx-auto md:max-w-md space-y-7 md:space-y-14">
          <div className="mb-2 space-y-2 text-left md:pt-5">
            <div className="mb-2 text-2xl md:text-3xl md:pt-5">
              Current Restaking Reward Rate for {restakeToken?.symbol}
            </div>
            <p className="text-lg md:text-2xl">
              <span className="text-[#8BAFFF] font-medium mr-2">
                20 OPEN XP
              </span>
              <span>per {restakeToken?.symbol} per day</span>
            </p>
          </div>

          <Card className="p-0 bg-white">
            <TXAction action={ACTION_TYPES.STAKE} token={token!} />
          </Card>
        </CardContent>
      </Card>

      <Card className="rounded-2xl bg-[#C9D4F2] shadow-none border-none">
        <CardHeader>
          <CardTitle>RESTAKED BALANCES</CardTitle>
          <div className="flex gap-2 text-2xl font-medium">
            {restakingInfoLoading ? (
              <Skeleton className="w-24 h-8 bg-[#C9D4F2]" />
            ) : (
              (restakeAmount?.toFixed(precision) ?? 0)
            )}
            <span>{token}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-2">
          {restakeAmount?.gt(0) && (
            <Link to={`/restake/unstake/${token}`}>
              <Button
                variant="outline"
                className="bg-transparent border-black rounded-2xl"
                size="sm"
              >
                Unstake
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>

      <Card className="rounded-2xl bg-[#C9D4F2] shadow-none border-none">
        <CardHeader>
          <CardTitle>UNSTAKED BALANCE</CardTitle>
          <div className="flex gap-2 text-2xl font-medium">
            {restakingInfoLoading ? (
              <Skeleton className="w-24 h-8 bg-[#C9D4F2]" />
            ) : (
              (maxPendingAmount?.toFixed(precision) ?? 0)
            )}{' '}
            {token}
          </div>
        </CardHeader>
        <CardContent className="space-y-1 px-0 py-2">
          <div className="px-4 rounded-2xl bg-[#C9D4F2]">
            <div className="space-y-3 lg:space-y-6">
              {restakingInfo?.pendingJettons.map((tx, i) => (
                <div
                  className="px-3 py-4 space-y-4 rounded-2xl lg:space-y-8 bg-white/50"
                  key={i}
                >
                  <div className="flex justify-between items-center gap-2 lg:flex-row">
                    <div className="flex gap-0.5 flex-col items-center">
                      <div className="text-base font-medium">
                        Unstake {tx.amount} {token}
                      </div>
                      {tx.isLocked && (
                        <div className="text-xs text-[#999]">
                          {tx.unstakeTimeFmt}
                        </div>
                      )}
                    </div>

                    <div className="text-xs">
                      {tx.isLocked ? (
                        <Badge
                          variant={'secondary'}
                          className="text-[#92400E] h-5 px-2.5 py-0.5"
                        >
                          Cooldown Period
                        </Badge>
                      ) : (
                        <Badge
                          variant={'secondary'}
                          className="text-[#065F46] h-5 px-2.5 py-0.5"
                        >
                          Completed
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-3 md:flex-row">
                    <Button
                      className="bg-white rounded-2xl"
                      variant="secondary"
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
                      disabled={tx.isLocked}
                      variant="outline"
                      className="bg-transparent border-black rounded-2xl"
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

      {/* no data -> hidden card */}
      {connected && (restakingInfo?.withdrawalJettons?.length ?? 0) > 0 && (
        <Card className="rounded-2xl shadow-none border-none">
          <CardHeader>
            <CardTitle>WITHDRAW RECORDS</CardTitle>
          </CardHeader>
          <CardContent>
            {restakingInfoLoading ? (
              <div className="flex items-center justify-between gap-y-4">
                <div className="space-y-3">
                  <Skeleton className="w-24 h-6" />
                  <Skeleton className="h-5 w-14" />
                </div>
                <Skeleton className="h-5 w-14" />
              </div>
            ) : (
              <div className="space-y-4">
                {restakingInfo?.withdrawalJettons.map((tx, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="text-base text-[#333]">
                          Withdraw {token}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {tx?.createdTime}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-[#333]">
                        {tx.amount} {token}
                      </div>
                      <Badge
                        variant={'secondary'}
                        className="mt-1 text-[#065F46] bg-white font-medium h-5 px-2.5 py-0.5"
                      >
                        {WITHDRAWSTATUS.COMPLETED}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <TXModal
        title={action as ACTION_TYPES}
        amount={null}
        symol={token!}
        status={txState}
        handleClose={handleClose}
        handleTryAgain={() => handleSubmit(action, pendingIndex)}
        // handleBacktodashboard={handleBacktodashboard}
      />
    </main>
  );
}
