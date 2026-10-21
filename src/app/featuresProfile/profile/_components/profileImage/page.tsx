
export default function ProfileImage() {
  return (
    <section className="mt-5 rounded-xl border border-[#3F52B4] p-4 sm:p-6">
      <div className="flex min-w-0 items-center gap-4">
        <img
          src="/profileImage.png"
          alt="Knee Due"
          className="size-16 shrink-0 rounded-full object-cover sm:size-20"
        />

        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold sm:text-xl">
            Knee Due
          </h2>
          <span className="block truncate text-sm text-gray-500 sm:text-base">
            Kneedue@gmail.com
          </span>
 
 
 
 
        </div>
      </div>
    </section>
  );
}