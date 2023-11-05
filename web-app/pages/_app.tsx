import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';
import Head from 'next/head';
import { Box, MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import { ListProvider } from '@/context/FoodCartContext';
import { Notifications } from '@mantine/notifications';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface Props extends AppProps {
  Component: NextPageWithLayout;
}

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <MantineProvider theme={theme}>
      <Notifications w={200} position="bottom-left" />
      <ListProvider>
        <Head>
          <title>Mantine Template</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
          <link rel="shortcut icon" href="/favicon.svg" />
        </Head>
        <Box h={700}>
          <Component {...pageProps} />
        </Box>
      </ListProvider>
    </MantineProvider>
  );
}
