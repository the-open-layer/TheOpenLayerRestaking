import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { useStakeList } from '@/hooks/api/useStakeList';
import { REWARDTYPE } from '@/constant';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';

const tableColumns = 6;
export default function Restake() {
  const { data: stakeList = [], isLoading } = useStakeList();
  return (
    <main className="container mx-auto p-4">
      <div className="space-y-2 mb-6">
        <div className="leading-snug text-[28px] font-bold">
          Earn Even More with TheOpenLayer Restaking.
        </div>
        <p className="text-sm text-gray-500">
          Restake your liquid tokens. Earn More Than APY.
        </p>
      </div>

      <div className="mb-4 md:hidden bg-transparent shadow-none">
        <div className="p-4 px-0 text-sm text-gray-500 mb-">
          Restake and earn
        </div>
        <div className="p-0">
          {isLoading ? (
            <Skeleton className="h-4 w-20 bg-slate-200" />
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
                      src={asset.logo}
                      alt={asset.symbol}
                      className="size-10 rounded-full"
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
        </div>
      </div>

      <Table className="hidden md:table rounded-2xl">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>ASSETS</TableHead>
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
                        src={asset.logo}
                        alt={asset.symbol}
                        className="size-10 rounded-full"
                      />
                      <div>
                        <div>{asset.name}</div>
                        <div className="text-sm text-gray-500">
                          {asset.symbol}
                        </div>
                      </div>
                    </Link>
                  </TableCell>
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
