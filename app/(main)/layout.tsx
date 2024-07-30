import Footer from "@/components/sidebar/Footer";
import Navbar from "@/components/sidebar/Navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="max-w-[1440px] m-auto">{children}</div>
      <Footer />
    </>
  );
}
