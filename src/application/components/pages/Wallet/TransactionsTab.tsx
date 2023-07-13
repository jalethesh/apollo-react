import { Fragment, useEffect, useState } from 'react';

import { useQuery } from '@apollo/client';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import TimeAgo from 'javascript-time-ago';
import { useRouter } from 'next/router';
import numeral from 'numeral';

import Loading from '$application/components/atoms/Loading';
import { Transaction } from '$application/lib/generated/gqlTypes';
import {
  transactionsQuery,
  walletQuery,
} from '$application/lib/repoQueries/queries';

export const TransactionsTab = () => {
  const { push } = useRouter();

  const { data: walletData } = useQuery(walletQuery);
  const { data: transactionData, loading: transactionLoading } =
    useQuery(transactionsQuery);

  const [sortedTransaction, setSortedTransaction] = useState<Transaction[]>([]);

  useEffect(() => {
    if (transactionData) {
      const newTransaction = [...transactionData.transactions];
      newTransaction.sort((a, b) => b.roundTime - a.roundTime);
      setSortedTransaction([...newTransaction]);
    }
  }, [transactionData]);

  const handelRedirect = (id: string) => {
    push(`/wallet/transaction/${id}`);
  };
  const timeAgo = new TimeAgo('en-US');
  return (
    <List sx={{ height: 1, pb: 2 }}>
      {transactionLoading && <Loading />}
      {sortedTransaction.map((item, idx) => (
        <Fragment key={idx}>
          <ListItem
            sx={{
              cursor: 'pointer',
              '&:hover': {
                background: 'rgba(200,200,200,.5)',
                borderRadius: '6px',
              },
            }}
            onClick={() => handelRedirect(item.id)}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: deepOrange[800] }}>
                {item.sender.charAt(1)}
                {/*  TODO if sender address equal to app wallet return <CardGiftcardIcon /> */}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Stack direction="row" alignItems="center">
                  {item.receiver === walletData?.wallet.walletAddress ? (
                    <AddIcon sx={{ fontSize: '15px', fill: 'green' }} />
                  ) : (
                    <RemoveIcon sx={{ fontSize: '15px', fill: 'red' }} />
                  )}
                  <Typography variant="body2">
                    {numeral(item.amount / 100).format('0,0')} SET
                  </Typography>
                </Stack>
              }
              secondary={timeAgo.format(new Date(item.roundTime * 1000))}
              secondaryTypographyProps={{
                variant: 'body2',
                fontWeight: 400,
                color: 'rgba(60, 60, 67, 0.6)',
              }}
            />
          </ListItem>
          <Divider sx={{ color: '#f3f5f7', borderColor: '#f3f5f7' }} />
        </Fragment>
      ))}
    </List>
  );
};
