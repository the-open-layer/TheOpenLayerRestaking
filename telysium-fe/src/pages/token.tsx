import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { STAKEICONS } from '@/constant/urls';
import { Button } from '@/components/ui/button';
import { formatNumber } from '@/lib/numbers';

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
  return (
    <main className="container mx-auto p-4 space-y-6 lg:space-y-8">
      <div className="items-center gap-3 hidden md:flex mb-7">
        <img
          src={STAKEICONS.TONSTAKERS.icon}
          alt="Tonstakers TON"
          width={48}
          height={48}
          className="rounded-full"
        />
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Tonstakers TON</h1>
          <Badge variant="outline">tsTON</Badge>
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
          <Button
            size="lg"
            className="w-full bg-white text-black hover:bg-gray-100 rounded-3xl md:mb-5"
          >
            Restake
          </Button>
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
              <Button variant="outline" size="sm">
                Unstake
              </Button>
            </div>
            <div className="text-2xl font-semibold">
              0.001 <span className="text-muted-foreground">tsTON</span>
            </div>
          </div>

          <div className="p-4 bg-slate-100 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-muted-foreground">
                AVAILABLE TO WITHDRAW
              </div>
            </div>
            <div className="text-2xl font-semibold mb-4">
              0.01 <span className="text-muted-foreground">tsTON</span>
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
          <div className="space-y-4">
            {mockTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-medium">{tx.type}</div>
                    <div className="text-sm text-muted-foreground">
                      {tx.amount} {tx.token}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">{tx.date}</div>
                  <Badge
                    variant={
                      tx.status === 'completed' ? 'default' : 'secondary'
                    }
                    className="mt-1"
                  >
                    {tx.status === 'completed' ? 'Completed' : tx.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
