"use client";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <div className="min-h-full flex items-center flex-col">

      <div className="min-w-full min-h-full justify-center flex sm:px-12 px-4 p-0 py-0 pb-2">
        {children}
      </div>
    </div>
  );
}
