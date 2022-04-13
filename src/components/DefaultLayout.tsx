import Head from 'next/head';
import { ReactNode } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>Prisma Starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex w-full h-full text-gray-700 p-20">{children}</div>

      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  );
};
