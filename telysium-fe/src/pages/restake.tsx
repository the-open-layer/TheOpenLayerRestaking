import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useStakeList } from '@/hooks/api/useStakeList';
import { REWARDTYPE } from '@/constant';
import { Link } from 'react-router-dom';
import { formatNumber } from '@/lib/numbers';
import { Fragment } from 'react';

const tableColumns = 6;
export default function Restake() {
  const { data: stakeList = [], isLoading } = useStakeList();
  return (
    <main className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2 hidden md:block">Restake</h1>
        <div className="text-sm text-muted-foreground">TOTAL TVL</div>
        <div className="text-4xl font-bold md:text-5xl">
          ${formatNumber(10000000)}
        </div>
      </div>

      <Card className="mb-4 md:hidden">
        <CardContent className="p-4">
          <div className="text-sm text-gray-500 mb-2">ASSETS</div>
          {isLoading ? (
            <div>x</div>
          ) : stakeList.length > 0 ? (
            <div className="space-y-1">
              {stakeList.map((asset, index) => (
                <Link
                  key={index}
                  to={`/restake/${asset.symbol}`}
                  className="flex items-center justify-between p-4 bg-[#C9D4F2] rounded-2xl"
                >
                  <div className="flex items-center gap-x-4">
                    <img
                      src={asset.image}
                      alt={asset.symbol}
                      className="size-10"
                    />
                    <div>
                      <div>{asset.name}</div>
                      <div className="text-sm text-gray-500">
                        {asset.symbol}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div> No Data.</div>
          )}
        </CardContent>
      </Card>

      <Table className="hidden md:table rounded-2xl">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>ASSETS</TableHead>
            <TableHead>WALLET BALANCE</TableHead>
            <TableHead>RESTAKING BALANCE</TableHead>
            <TableHead>TVL</TableHead>
            <TableHead>REWARD</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-[80px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[60px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[100px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[100px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[100px]" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-4 w-[80px] ml-auto" />
                </TableCell>
              </TableRow>
            ))
          ) : stakeList.length > 0 ? (
            stakeList.map((asset, index) => (
              <Fragment key={index}>
                <TableRow className="bg-white">
                  <TableCell className="font-medium rounded-l-2xl">
                    <Link
                      to={`/restake/${asset.symbol}`}
                      className="flex items-center gap-x-4 hover:-translate-y-0.5"
                    >
                      <img
                        src={asset.image}
                        alt={asset.symbol}
                        className="size-10"
                      />
                      <div>
                        <div>{asset.name}</div>
                        <div className="text-sm text-gray-500">
                          {asset.symbol}
                        </div>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>{asset.balance ?? 0}</TableCell>
                  <TableCell>{asset.restaking ?? 0}</TableCell>
                  <TableCell>{asset.tvl ?? 0}</TableCell>
                  <TableCell className="text-[#828898]">
                    {REWARDTYPE.POINTS}
                  </TableCell>
                  <TableCell className="rounded-r-2xl">
                    <Link
                      to={`/restake/deposit/${asset.symbol}`}
                      className="text-primary text-sm"
                    >
                      <Button
                        variant="link"
                        className="text-blue-500 hover:text-blue-600 p-0"
                      >
                        Restake
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
                {index !== stakeList.length - 1 && <TableRow className="h-6" />}
              </Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={tableColumns} className="h-24 text-center">
                No Data.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </main>
  );
}