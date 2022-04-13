import { BillStatus } from '@prisma/client';

export function BillStatusLabel(props: { value: BillStatus }) {
  const labels: Record<BillStatus, string> = {
    NotPaid: 'Not Paid',
    Paid: 'Paid',
  };
  return (
    <span className="text-sm rounded-xl bg-gray-100 py-2 px-3">
      {labels[props.value]}
    </span>
  );
}
