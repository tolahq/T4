import NextError from 'next/error';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '~/pages/_app';
import { trpc } from '~/utils/trpc';

const PostViewPage: NextPageWithLayout = () => {
  const id = useRouter().query.id as string;
  const billQuery = trpc.useQuery(['bill.info', { id }]);

  if (billQuery.error) {
    return (
      <NextError
        title={billQuery.error.message}
        statusCode={billQuery.error.data?.httpStatus ?? 500}
      />
    );
  }

  if (billQuery.status !== 'success') {
    return <>Loading...</>;
  }
  const { data } = billQuery;
  return (
    <>
      <h1>{data.vendor.name}</h1>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </>
  );
};

export default PostViewPage;
