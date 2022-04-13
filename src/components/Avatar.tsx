export function Avatar(props: { name: string }) {
  const letters = props.name
    .split(/\s+/)
    .map((ele) => ele.charAt(0))
    .slice(0, 2)
    .join('');

  return (
    <div className="text-center items-center justify-center overflow-hidden rounded-lg text-gray-100 flex h-12 w-12 bg-purple-500">
      <span className="font-medium text-white uppercase items-center">
        {letters}
      </span>
    </div>
  );
}
