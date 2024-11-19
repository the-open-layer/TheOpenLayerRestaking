import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatNumber } from '@/lib/numbers';
import { useUserRestaking } from '@/hooks/useUserRestaking';
import { useAccount } from '@/hooks/useAccount';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useStakeList } from '@/hooks/api/useStakeList';
import { fromNano } from '@ton/ton';
import dayjs from 'dayjs';
import { dateTimeFormat } from '@/constant';
import { Spinner } from '@/components/ui/spiner';
import { Skeleton } from '@/components/ui/skeleton';
const mockTransactions = [
  {
    id: '1',
    type: 'Withdraw',
    token: 'stTON',
    amount: '0.01',
    date: '2024-09-25 11:20:26',
    status: 'pending',
  },
  {
    id: '2',
    type: 'Withdraw',
    token: 'stTON',
    amount: '1.02',
    date: '2024-09-01 02:35:33',
    status: 'completed',
  },
];

export default function Token() {
  const { address } = useAccount();
  const { data: restakingInfo, isLoading } = useUserRestaking(address);
  const { token } = useParams();
  const { data: stakeList = [] } = useStakeList();
  const restakeToken = stakeList.find((v) => v.symbol === token);
  console.log({ restakingInfo });

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
        <CardHeader className="pb-0 md:hidden text-xl font-medium">
          <CardTitle className="text-xl font-medium">Tonstakers TON</CardTitle>
        </CardHeader>
        <CardContent className="p-6 md:max-w-md mx-auto space-y-7 md:space-y-14">
          <div className="text-4xl md:text-5xl mb-4 md:pt-5">
            ${formatNumber(100000000)}{' '}
            <span className="text-2xl font-normal text-white/60">TVL</span>
          </div>
          <Link to={`/restake/deposit/${token}`}>
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
              <Link to={`/restake/withdraw/${token}`}>
                <Button variant="outline" size="sm">
                  Unstake
                </Button>
              </Link>
            </div>
            <div className="text-2xl font-semibold">
              0.001 <span className="text-muted-foreground">{token}</span>
            </div>
          </div>

          <div className="p-4 bg-slate-100 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-muted-foreground">
                AVAILABLE TO WITHDRAW
              </div>
            </div>
            <div className="text-2xl font-semibold mb-4">
              0.01 <span className="text-muted-foreground">{token}</span>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1">Redeposit</Button>
              <Button variant="outline" className="flex-1">
                Withdraw
              </Button>
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
              {restakingInfo?.pendingJettons?.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center">
                  no data
                </div>
              ) : (
                restakingInfo?.pendingJettons.map((tx) => (
                  <div
                    key={tx.stakeIndex}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-medium">unstake</div>
                        <div className="text-sm text-muted-foreground">
                          {fromNano(tx.jettonAmount)} {token}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        {dayjs
                          .unix(Number(tx.unstakeTime))
                          .format(dateTimeFormat)}
                      </div>
                      {/* <Badge
                    variant={
                      tx.status === 'completed' ? 'default' : 'secondary'
                    }
                    className="mt-1"
                  >
                    {tx.status === 'completed' ? 'Completed' : tx.status}
                  </Badge> */}
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
