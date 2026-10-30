interface IProps {
  message?: string;
}

export default function SelectedItemsError({ message }: IProps) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
      <p className="text-sm text-red-500">
        {message || "Failed to load tours. Please try again."}
      </p>
    </div>
  );
}