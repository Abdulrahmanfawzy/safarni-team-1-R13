type AuthFormHeadingProps = {
  title: string;
  description: string;
};

export function AuthFormHeading({ title, description }: AuthFormHeadingProps) {
  return (
    <div className="flex flex-col justify-between gap-2">
      <h1 className="text-center text-2xl font-medium leading-[100%] text-gray-900">
        {title}
      </h1>
      <p className="text-center text-[21px] leading-[150%] text-gray-600">
        {description}
      </p>
    </div>
  );
}
