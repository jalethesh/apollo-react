import { useState } from 'react';

import { useQuery } from '@apollo/client';
import { Box, Typography, Skeleton } from '@mui/material';
import { useRouter } from 'next/router';
import numeral from 'numeral';

import { TabSelect } from '$application/components/atoms/TabSelect';
import { StyledSkip } from '$application/components/pages/Main/Intro';
import { NFTTab } from '$application/components/pages/Wallet/NFTTab';
import { TransactionsTab } from '$application/components/pages/Wallet/TransactionsTab';
import { walletQuery } from '$application/lib/repoQueries/queries';

export interface WalletStepData {
  name: string;
}

const tabs = [
  { name: 'nft', label: 'NFT' },
  { name: 'transactions', label: 'Transactions' },
];
export const Wallet = () => {
  const router = useRouter();

  const { data: walletData, loading: walletLoading } = useQuery(walletQuery);
  const [activeTab, setActiveTab] = useState('nft');

  return (
    <Box
      sx={{
        background: '#fff',
        height: '100%',
        width: '100%',
        position: 'relative',
      }}
    >
      <StyledSkip onClick={() => router.push('/events')}>View Shows</StyledSkip>
      <Box
        sx={{
          height: '35%',
          backgroundImage: 'url("/bgWallet.png")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          p: '88px 0 47px 16px',
        }}
      >
        <Typography
          sx={{
            pb: 2,
            fontWeight: 'bolder',
            color: (theme) => theme.palette.grey[900],
          }}
          variant="body1"
        >
          My Wallet
        </Typography>
        <Typography
          sx={{ textTransform: 'uppercase', color: 'rgba(235, 235, 245, 0.6)' }}
        >
          Balance
        </Typography>

        <Typography
          variant="h1"
          sx={{
            fontWeight: '900',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: (theme) => theme.palette.grey[900],
          }}
        >
          {walletLoading ? (
            <Skeleton variant="text" width={160} height={50} />
          ) : (
            numeral(walletData?.wallet.amount! / 100).format('0,0')
          )}{' '}
          SET
        </Typography>
      </Box>
      <Box
        sx={{
          borderRadius: 6,
          position: 'absolute',
          pt: '1rem',
          px: '1rem',
          bottom: '31px',
          width: '100%',
          height: '65%',
          background: '#fff',
        }}
      >
        <TabSelect
          tabs={tabs}
          activeTab={activeTab}
          setSelected={setActiveTab}
        />
        <Box
          sx={{
            mt: 2,
            flex: 1,
            height: 1,
            overflow: 'auto',
            scrollbarWidth: 'none',
            '::-webkit-scrollbar': {
              display: 'none' /* Chrome and Safari */,
            },
          }}
        >
          {activeTab === 'transactions' ? <TransactionsTab /> : <NFTTab />}
        </Box>
      </Box>
    </Box>
  );
};
