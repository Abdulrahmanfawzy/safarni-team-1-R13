type AuthFormHeadingProps = {
  title: string;
  description: string;
  spanText?: string;
};

export function AuthFormHeading({ title, description, spanText }: AuthFormHeadingProps) {
  return (
    <div className="flex flex-col justify-between gap-2">
      <h1 className="text-center text-xl font-medium leading-tight text-gray-900 sm:text-2xl">
        {title}
      </h1>
      <p className="text-center text-sm leading-[150%] text-gray-600 sm:text-lg lg:text-base">
        {description}
        {spanText &&
          <span className="text-center text-sm leading-[150%] text-gray-800 sm:text-lg lg:text-base">
            {spanText}
          </span>}
      </p>
    </div>
  );
}
