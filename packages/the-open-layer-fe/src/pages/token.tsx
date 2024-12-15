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
    <main className="container p-4 mx-auto space-y-6 lg:space-y-8">
      {/* <div className="flex items-center gap-3 mb-7">
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
      </div> */}

      <Card className="text-center text-white bg-black rounded-2xl ">
        <CardContent className="p-6 mx-auto md:max-w-md space-y-7 md:space-y-14">
          <div className="mb-2 space-y-2 text-left md:pt-5">
            <div className="mb-2 text-2xl md:text-3xl md:pt-5">
              {/* Earn <span className="text-[#8BAFFF]">20 OPEN XP</span> every day */}
              Current Restaking Reward Rate for {restakeToken?.symbol}
            </div>
            <p className="text-lg md:text-2xl">
              <span className="text-[#8BAFFF] mr-2">20 OPEN XP</span>
              <span>per {restakeToken?.symbol} per day</span>
            </p>
          </div>

          <Card className='p-4 text-left bg-white'>
            <span className='p-4 px-0 text-sm text-left text-gray-500'>STAKE</span>
            <div>TODO ACTION Card</div>
            <div>TODO ACTION Card</div>
            <div>TODO ACTION Card</div>
            <div>TODO ACTION Card</div>
          </Card>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>BALANCES</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#C9D4F2]">
            <div className="text-sm text-muted-foreground">
              RESTAKED BALANCE
            </div>
            <div className="flex gap-2 mb-4 text-2xl font-semibold">
              {restakingInfoLoading ? (
                <Skeleton className="w-24 h-8 bg-[#C9D4F2]" />
              ) : (
                (restakeAmount?.toFixed(2) ?? 0)
              )}
              <span className="text-muted-foreground">{token}</span>
            </div>
            <Link to={`/restake/unstake/${token}`}>
              <Button variant="outline" size="sm">
                Unstake
              </Button>
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-[#C9D4F2]">
            <div className="text-sm text-muted-foreground">
              UNSTAKED BALANCE
            </div>
            <div className="flex gap-2 mb-4 text-2xl font-medium">
              {restakingInfoLoading ? (
                <Skeleton className="w-24 h-8 bg-[#C9D4F2]" />
              ) : (
                (maxPendingAmount?.toFixed(2) ?? 0)
              )}{' '}
              {token}
            </div>
            <div className="space-y-3 lg:space-y-6">
              {restakingInfo?.pendingJettons.map((tx, i) => (
                <div
                  className="px-2 py-2 space-y-4 rounded-2xl lg:space-y-8 bg-white/50"
                  key={i}
                >
                  <div className="flex justify-between gap-2 lg:flex-row">
                    <div className='flex flex-col'>
                      <div className="text-lg font-medium">
                        Unstake {tx.amount} {token}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {tx?.unstakeTimeFmt}
                      </div>
                    </div>
                
                    <div className="flex items-center gap-2">
                      <Badge variant={'secondary'} className="mt-1">
                        {tx.isLocked
                          ? WITHDRAWSTATUS.PENDING
                          : WITHDRAWSTATUS.COMPLETED}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-3 md:flex-row">
                    <Button
                      className=""
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
                      className=""
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

      {/* no data -> hidden card */}
      {connected && (restakingInfo?.withdrawalJettons?.length ?? 0) > 0 && (
        <Card className="rounded-2xl">
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
                {
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
                }
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
        handleBacktodashboard={handleBacktodashboard}
      />
    </main>
  );
}
