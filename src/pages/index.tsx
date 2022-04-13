import { trpc } from '../utils/trpc';
import format from '~/utils/format';
import { NextPageWithLayout } from './_app';
import { Avatar } from '~/components/Avatar';
import { BillStatusLabel } from '~/components/BillStatusLabel';

const IndexPage: NextPageWithLayout = () => {
  const utils = trpc.useContext();
  const billsQuery = trpc.useQuery(['bill.list']);

  // TODO: Use payMutation in your code!
  const payMutation = trpc.useMutation('bill.pay', {
    onSuccess: () => {
      utils.invalidateQueries('bill.list');
    },
  });

  if (billsQuery.status === 'success') {
    return (
      <div className="w-full">
        <h1 className="text-4xl text-gray-900 my-4">
          Action required{' '}
          <span className="text-gray-400">
            {format.currency(
              billsQuery.data.reduce((p, c) => {
                return p + c.amount;
              }, 0),
            )}
          </span>
        </h1>

        <table className="table w-full">
          <thead className="border-b">
            <tr>
              {['Vendor', 'Due', 'Status', 'Amount'].map((ele, idx) => (
                <th
                  key={idx}
                  className="py-3 font-normal text-left last:text-right text-sm text-gray-500"
                >
                  {ele}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {billsQuery.data.map((item) => (
              <tr key={item.id}>
                <td className="flex items-center gap-x-4 py-4 text-gray-900">
                  <Avatar name={item.vendor.name} />
                  {item.vendor.name}
                </td>
                <td className="py-4">{format.date(item.dueOn)}</td>
                <td className="py-4">
                  <BillStatusLabel value={item.status} />
                </td>
                <td className="py-4 text-right">
                  {format.currency(item.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (billsQuery.status === 'error') {
    return (
      <div className="p-4">
        <h2>Something went wrong</h2>
        <pre>{JSON.stringify(billsQuery.error, null, 4)}</pre>
      </div>
    );
  }
  return <em>Loading...</em>;
};

export default IndexPage;
