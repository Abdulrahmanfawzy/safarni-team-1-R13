interface IProps {
  count: number;
}

export default function SelectedItemsHeader({ count }: IProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold text-gray-900">
        Available Tours
      </h2>

      <span className="text-sm text-gray-500">
        {count} Tours
      </span>
    </div>
  );
}