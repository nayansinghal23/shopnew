import Navbar from "@/components/Navbar";
import Products from "@/components/Products";

export default async function Home() {
  return (
    <div className="flex flex-col h-full min-h-screen gap-[1px]">
      <Navbar />
      <Products />
    </div>
  );
}
