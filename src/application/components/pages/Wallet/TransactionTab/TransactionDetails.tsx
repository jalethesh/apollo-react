import { useEffect, useState } from 'react';

import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Box,
  Divider,
  Skeleton,
  Stack,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { get } from 'lodash-es';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import numeral from 'numeral';

import { Query, Transaction } from '$application/lib/generated/gqlTypes';
import { transactionsQuery } from '$application/lib/repoQueries/queries';
import { hideScrollBar } from '$application/utils/css/hideScrollBar';

const TransactionDetails = () => {
  const { data: transactionData, loading: transactionDataLoading } = useQuery<{
    transactions: Query['transactions'];
  }>(transactionsQuery);

  const theme = useTheme();
  const router = useRouter();
  const [transaction, setTransaction] = useState<Transaction>();
  const backHandler = () => {
    router.push('/wallet');
  };

  useEffect(() => {
    const tran = transactionData?.transactions.find(
      (t) => t.id === router.query.id
    );
    if (tran) setTransaction(tran);
  }, [router.query.id, transactionData?.transactions]);

  return (
    <StyledBox
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        overflow: 'scroll',
        background: '#fff',
      }}
    >
      <Box
        sx={{
          width: 1,
          background: theme.palette.grey.A100,
        }}
      >
        <ArrowBackIosIcon
          sx={{
            color: 'blue',
            position: 'absolute',
            zIndex: 1,
            top: '1.5rem',
            cursor: 'pointer',
            left: '1.5rem',
          }}
          onClick={backHandler}
        />
        <Box sx={{ mt: 6, mr: 'auto', px: '1.5rem', pt: '1.5rem', pb: 1 }}>
          <Typography variant="h2">Transaction Details</Typography>
        </Box>
        <Divider />
      </Box>
      <Stack sx={{ width: 1, p: '1.5rem' }}>
        <Box sx={{ pt: 2 }}>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.disabled,
              fontWeight: 900,
            }}
          >
            AMOUNT TRANSFERRED
          </Typography>
          <Typography
            variant="h6"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            {transactionDataLoading ? (
              <Skeleton variant="text" width={100} height={30} />
            ) : (
              numeral(transaction?.amount! / 100).format('0,0')
            )}
            SET
          </Typography>
        </Box>
        <Card
          name="TRANSACTION ID"
          value={get(transaction, 'id', '')}
          theme={theme}
          haveCopy
          color={theme.palette.primary.main}
          loading={transactionDataLoading}
        />
        <Card
          name="FROM"
          value={get(transaction, 'sender', '')}
          theme={theme}
          haveCopy
          color={theme.palette.primary.main}
          loading={transactionDataLoading}
        />
        <Card
          name="TO"
          value={get(transaction, 'receiver', '')}
          theme={theme}
          haveCopy
          color={theme.palette.primary.main}
          loading={transactionDataLoading}
        />
        <Card
          name="DATE"
          value={`${new Date(
            get(transaction, 'roundTime', 0) * 1000
          ).toLocaleDateString()} ${new Date(
            get(transaction, 'roundTime', 0) * 1000
          ).toLocaleTimeString()}`}
          theme={theme}
          loading={transactionDataLoading}
        />
        <Card
          name="FEE"
          value={`${numeral(get(transaction, 'fee', 0)! / 100).format(
            '0,0'
          )} SET`}
          theme={theme}
          loading={transactionDataLoading}
        />
      </Stack>
    </StyledBox>
  );
};
export default TransactionDetails;

const StyledBox = styled(Box)`
  ${hideScrollBar};
  overflow-y: scroll;
`;

interface CardProps {
  name: string;
  value: string;
  theme: Theme;
  haveCopy?: boolean;
  color?: string;
  loading?: boolean;
}

const Card = ({ name, value, theme, haveCopy, color, loading }: CardProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    enqueueSnackbar('Copied to clipboard', { variant: 'success' });
  };
  return (
    <Box sx={{ pt: 2 }}>
      <Typography
        variant="subtitle2"
        sx={{ color: theme.palette.text.disabled, fontWeight: 900 }}
      >
        {name}
      </Typography>
      <Stack direction="row">
        {loading ? (
          <Skeleton variant="text" width={400} />
        ) : (
          <Typography sx={{ color }} noWrap variant="subtitle2">
            {value}
          </Typography>
        )}
        {haveCopy && (
          <ContentCopyIcon
            onClick={handleCopy}
            sx={{
              fontSize: 20,
              color: theme.palette.text.disabled,
              ml: 1,
              '&:active': { color: theme.palette.text.primary },
            }}
          />
        )}
      </Stack>
    </Box>
  );
};
