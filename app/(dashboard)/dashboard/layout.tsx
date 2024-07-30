import Sidebar from "@/components/sidebar/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen bg-transparent">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex h-full">
          <nav className="flex w-[380px] h-full !bg-blue-500">
            <div className="w-full flex mx-auto px-6 py-8">
              <div className="w-full h-full flex items-center justify-center text-gray-900 text-xl">
                {/* Sidebar */}
                <Sidebar />
              </div>
            </div>
          </nav>

          <main className="flex flex-col w-full bg-white overflow-x-hidden overflow-y-auto mb-14">
            <div className="flex w-full mx-auto px-6 py-8">
              <div className="flex flex-col w-full h-full text-gray-900 text-xl">
                {children}
              </div>
            </div>
          </main>
          {/* <main className="flex flex-col w-full bg-white overflow-x-hidden overflow-y-auto mb-14">
            <div className="flex w-full mx-auto px-6 py-8">
              <div className="flex flex-col w-full h-full text-gray-900 text-xl">
                <div className="flex w-full max-w-xl h-60 items-center justify-center mx-auto bg-green-400 border-b border-gray-600">
                  Post
                </div>
                <div className="flex w-full max-w-xl h-60 items-center justify-center mx-auto bg-green-400 border-b border-gray-600">
                  Post
                </div>
                <div className="flex w-full max-w-xl h-60 items-center justify-center mx-auto bg-green-400 border-b border-gray-600">
                  Post
                </div>
                <div className="flex w-full max-w-xl h-60 items-center justify-center mx-auto bg-green-400 border-b border-gray-600">
                  Post
                </div>
                <div className="flex w-full max-w-xl h-60 items-center justify-center mx-auto bg-green-400 border-b border-gray-600">
                  Post
                </div>
              </div>
            </div>
          </main> */}
        </div>
      </div>
    </div>
  );
}
