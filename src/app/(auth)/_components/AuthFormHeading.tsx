type AuthFormHeadingProps = {
  title: string;
  description: string;
};

export function AuthFormHeading({ title, description }: AuthFormHeadingProps) {
  return (
    <div className="flex flex-col justify-between gap-2">
      <h1 className="text-center text-xl font-medium leading-tight text-gray-900 sm:text-2xl">
        {title}
      </h1>
      <p className="text-center text-base leading-[150%] text-gray-600 sm:text-lg lg:text-[21px]">
        {description}
      </p>
    </div>
  );
}
