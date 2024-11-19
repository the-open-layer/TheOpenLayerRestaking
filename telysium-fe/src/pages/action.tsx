import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useParams } from 'react-router-dom';
import TonscanIcon from '@/assets/images/icon/tonscan.svg?react';
import { useAccount } from '@/hooks/useAccount';
import useTonPrice from '@/hooks/api/useTonPrice';
import Big from 'big.js';
import { HelpCircle } from 'lucide-react';
import { DepositStateEnum } from '@/types/action';
import DepositModal from '@/components/ux/modals/deposit';
import { Navigate } from 'react-router-dom';
import { ACTION_TYPES, ACTION_TYPES_LIST } from '@/constant';
import { useStakeList } from '@/hooks/api/useStakeList';
import { getStakeTx } from '@/constant/stake';
import { useBalance } from '@/hooks/useBalance';
export default function Action() {
  const { action, token } = useParams();
  const { data: stakeList = [] } = useStakeList();
  const { connected, tonConnectUI, rawAddress, address } = useAccount();
  const [amount, setAmount] = useState('');
  const { data: tonPrice } = useTonPrice();
  const [depositState, setDepositState] = useState<DepositStateEnum>(
    DepositStateEnum.IDLE
  );
  const restakeToken = stakeList.find((v) => v.symbol === token);
  const { data: tokenAmount } = useBalance(restakeToken!.address);
  console.log({tokenAmount})
  const { USDTPrice, DepositList } = useMemo(() => {
    let USDTPrice: string = '0';
    let DepositList: Array<{ text: string; value: JSX.Element }> = [];
    if (Number(amount) > 0 && tonPrice) {
      USDTPrice = new Big(amount).times(tonPrice?.price).toFixed(4);
      DepositList = [
        {
          text: 'You get',
          value: (
            <div className="flex items-center gap-x-1">
              69.53 tsTON{' '}
              <HelpCircle className="w-4 h-4 text-muted-foreground" />
            </div>
          ),
        },
        {
          text: 'Available to stake',
          value: (
            <div className="flex items-center gap-x-1">
              69.53 tsTON{' '}
              <HelpCircle className="w-4 h-4 text-muted-foreground" />
            </div>
          ),
        },
        {
          text: 'Your balance',
          value: (
            <div className="flex items-center gap-x-1">
              69.53 tsTON{' '}
              <HelpCircle className="w-4 h-4 text-muted-foreground" />
            </div>
          ),
        },
        {
          text: 'tsTON Exchange Rate',
          value: (
            <div className="flex items-center gap-x-1">
              1 tsTON = 1.0403 TON
            </div>
          ),
        },
      ];
    }

    return {
      USDTPrice,
      DepositList: DepositList,
    };
  }, [tonPrice, amount]);

  const handleSubmit = async () => {
    setDepositState(DepositStateEnum.CONFIRMING);
    const result = await tonConnectUI.sendTransaction(
      await getStakeTx(amount, rawAddress, restakeToken!.address)
    );
    console.log({ result });
    // setDepositState(DepositStateEnum.ERROR);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleConfirm = () => {
    // Simulate random success/error
    const success = Math.random() > 0.5;
    setDepositState(
      success ? DepositStateEnum.SUCCESS : DepositStateEnum.ERROR
    );
  };

  const handleTryAgain = () => {
    setDepositState(DepositStateEnum.CONFIRMING);
  };

  const handleClose = () => {
    setDepositState(DepositStateEnum.IDLE);
  };
  if (
    !ACTION_TYPES_LIST.includes(action as ACTION_TYPES) ||
    !stakeList.some((v) => v.symbol === token)
  ) {
    return <Navigate to="/404" />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Deposit</h1>
      <Card className="mb-8">
        <CardHeader className="flex flex-row justify-between items-center space-y-0 ">
          <div className="flex items-center gap-x-4">
            <img
              src={restakeToken?.image}
              alt={restakeToken?.name}
              className="size-10"
            />
            <div>
              <CardTitle className="text-xl">{restakeToken?.name}</CardTitle>
              <CardDescription>{restakeToken?.symbol}</CardDescription>
            </div>
          </div>
          <a
            href={
              restakeToken?.testnet
                ? `https://testnet.tonscan.org/${restakeToken?.address}`
                : `https://tonscan.org/address/${restakeToken?.address}`
            }
            target="_blank"
          >
            <TonscanIcon className="text-8 cursor-pointer" />
          </a>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 pt-5">
            <div className="flex flex-col">
              <div className="flex justify-between gap-x-2 items-center">
                <div className="flex items-end gap-x-2 max-w-80">
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) =>
                      setAmount(
                        e.target.value ? Number(e.target.value) + '' : ''
                      )
                    }
                    placeholder="0.0000"
                    className="text-6xl h-20"
                  />
                  <span className="text-base text-muted-foreground ">
                    {restakeToken?.symbol}
                  </span>
                </div>
                <Button
                  variant="secondary"
                  className="px-3 py-1 leading-none rounded-2xl text-sm font-medium h-7"
                  onClick={() => {
                    if (connected) {
                      setAmount(tokenAmount!.toString() ?? 0);
                    } else {
                      tonConnectUI.openModal();
                    }
                  }}
                  disabled={tokenAmount === undefined}
                >
                  MAX
                </Button>
              </div>
            </div>
            <span className="text-sm text-muted-foreground">${USDTPrice}</span>

            {connected ? (
              <Button
                className="w-full rounded-2xl"
                size="lg"
                onClick={handleSubmit}
                disabled={Number(amount) <= 0}
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
        <Card className="bg-transparent shadow-none">
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

      <DepositModal
        amount={amount}
        status={depositState}
        handleClose={handleClose}
        handleTryAgain={handleTryAgain}
      />
    </div>
  );
}
