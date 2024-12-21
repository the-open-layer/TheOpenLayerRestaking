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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import TXAction from '@/components/ux/txAction';
import { ACTION_TYPES } from '@/constant';
import { useNavigate } from 'react-router-dom';

const tableColumns = 6;
export default function Restake() {
  const { data: stakeList = [], isLoading } = useStakeList();
  const navigate = useNavigate();
  return (
    <main className="container p-4 mx-auto">
      <div className="mb-4 space-y-2">
        <div className="leading-snug text-2xl font-bold">
          Earn More With Restaking in TheOpenLayer
        </div>
        <p className="text-sm text-gray-500">
          Restake stTON and tsTON to unlock higher yields, and strengthen TON
          Network.
        </p>
      </div>

      <div className="mb-4 bg-transparent shadow-none md:hidden">
        <div className="p-4 px-0 text-sm text-gray-500 mb-">ASSETS</div>
        <div className="p-0">
          {isLoading ? (
            <Skeleton className="w-20 h-4 bg-slate-200" />
          ) : stakeList.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-1">
              {stakeList.map((asset, index) => {
                return (
                  <AccordionItem
                    value={index.toString()}
                    key={index}
                    className="mb-2 bg-[#C9D4F2] rounded-3xl border-none"
                  >
                    <div className="flex p-4 items-center justify-between rounded-3xl gap-x-4">
                      <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => {
                          navigate(`/restake/${asset.symbol}`);
                        }}
                      >
                        <img
                          src={asset.logo}
                          alt={asset.symbol}
                          className="rounded-full size-10"
                        />
                        <div>{asset.symbol} Restaking</div>
                      </div>

                      <AccordionTrigger className="py-0" hideIcon>
                        <Button className="rounded-2xl text-sm" asChild>
                          <span>Restake</span>
                        </Button>
                      </AccordionTrigger>
                    </div>

                    <AccordionContent className="bg-white rounded-3xl">
                      <TXAction
                        action={ACTION_TYPES.STAKE}
                        token={asset.symbol}
                      />
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
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
                        className="rounded-full size-10"
                      />
                      <div>{asset.symbol} Restaking</div>
                    </Link>
                  </TableCell>
                  <TableCell className="text-[#828898]">
                    {REWARDTYPE.POINTS}
                  </TableCell>
                  <TableCell className="rounded-r-2xl">
                    <Link
                      to={`/restake/stake/${asset.symbol}`}
                      className="text-sm text-primary"
                    >
                      <Button
                        variant="link"
                        className="p-0 text-blue-500 hover:text-blue-600"
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

      <div
        id="advice-card"
        className="fixed bottom-4 left-4 right-4 p-4 bg-white shadow-md rounded-lg flex flex-col items-center transition-all duration-500 ease-in-out"
        style={{ transform: 'translateX(0)', opacity: 1 }}
      >
        <p className="text-sm text-gray-700 mb-4 text-center">
          Our product is currently undergoing auditing, and there may be risks
          associated with interactions. If you'd like to become an early
          adopter, please{' '}
          <a
            href="https://t.me/the_open_layer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            subscribe to our channel
          </a>
          .
        </p>
        <button
          onClick={() => {
            const adviceCard = document.getElementById('advice-card');
            if (adviceCard) {
              // Apply slide animation
              adviceCard.style.transform = 'translateX(100%)'; // Moves the card right
              adviceCard.style.opacity = '0'; // Fades out the card
              setTimeout(() => {
                adviceCard.style.display = 'none'; // Completely hides the card after animation
              }, 500); // Matches the duration of the transition
            }
          }}
          className="px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800"
        >
          I Understand
        </button>
      </div>
    </main>
  );
}
