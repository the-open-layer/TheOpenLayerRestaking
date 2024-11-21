import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useUserRestaking } from '@/hooks/useUserRestaking';
import { useAccount } from '@/hooks/useAccount';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useStakeList } from '@/hooks/api/useStakeList';
import { fromNano } from '@ton/ton';
import dayjs from 'dayjs';
import { dateTimeFormat, WITHDRAWSTATUS } from '@/constant';
import { Skeleton } from '@/components/ui/skeleton';
import { useTokenPrice } from '@/hooks/useTokenPrice';
import Big from 'big.js';

export default function Token() {
  const { address } = useAccount();
  const { data: restakingInfo, isLoading } = useUserRestaking(address);
  const { token } = useParams();
  const { data: stakeList = [] } = useStakeList();
  const { data: tokenPrice } = useTokenPrice(token!);
  console.log({ restakingInfo, tokenPrice });
  const restakeBalance = restakingInfo?.stakedJettons?.reduce((acc, cur) => {
    return acc.add(Big(fromNano(cur.jettonAmount)));
  }, Big(0));
  const maxWithdrawAmount = restakingInfo?.pendingJettons?.reduce(
    (acc, cur) => {
      return acc.add(Big(fromNano(cur.jettonAmount)));
    },
    Big(0)
  );

  const restakeToken = stakeList.find((v) => v.symbol === token);
  if (!stakeList.some((v) => v.symbol === token)) {
    return <Navigate to="/404" />;
  }
  return (
    <main className="container mx-auto p-4 space-y-6 lg:space-y-8">
      <div className="items-center gap-3 hidden md:flex mb-7">
        <img
          src={restakeToken!.image}
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
            <div className="text-2xl font-semibold">
              {restakeBalance?.toFixed(2)}
              <span className="text-muted-foreground">{token}</span>
            </div>
          </div>

          <div className="p-4 bg-slate-100 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-muted-foreground">
                AVAILABLE TO WITHDRAW
              </div>
            </div>
            <div className="text-2xl font-semibold mb-4">
              {maxWithdrawAmount?.toFixed(2)}{' '}
              <span className="text-muted-foreground">{token}</span>
            </div>
            <div className="flex gap-3">
              <Link to={`/restake/redeposit/${token}`} className="flex-1">
                <Button className="w-full">Redeposit</Button>
              </Link>

              <Link to={`/restake/withdraw/${token}`} className="flex-1">
                <Button variant="outline" className="w-full">
                  Withdraw
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Your Withdraw</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-between gap-y-4">
              <div className="space-y-3">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-5 w-14" />
              </div>
              <Skeleton className="h-5 w-14" />
            </div>
          ) : (
            <div className="space-y-4">
              {restakingInfo?.withdrawList?.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center">
                  no data
                </div>
              ) : (
                restakingInfo?.withdrawList.map((tx, i) => (
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
                        {tx?.txTime}
                      </div>
                      <Badge
                        variant={
                          tx.status === WITHDRAWSTATUS.PENDING
                            ? 'default'
                            : 'secondary'
                        }
                        className="mt-1"
                      >
                        {tx.status === WITHDRAWSTATUS.PENDING
                          ? 'Completed'
                          : tx.status}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
