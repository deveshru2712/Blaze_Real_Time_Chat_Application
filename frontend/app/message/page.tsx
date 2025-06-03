import Message from "@/components/Message";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Page() {
  return (
    <div className="w-screen h-screen">
      <Navbar />
      <div className="flex border-t">
        <Sidebar />
        <Message />
      </div>
    </div>
  );
}
