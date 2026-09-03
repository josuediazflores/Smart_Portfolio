import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-3 py-10 ">{children}</main>
      <Footer />
    </>
  );
}
