"use client";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <div className=" flex items-center flex-col">

      <div className="w-full max-w-[110rem] sm:px-12 px-4 p-0 py-0 pb-2">
        {children}
      </div>
    </div>
  );
}
