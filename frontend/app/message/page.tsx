import Message from "@/components/Message";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Page() {
  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col">
      <Navbar />
      <div className="flex flex-1 w-full border-t overflow-hidden">
        <Sidebar />
        <div className="flex-1 h-full overflow-hidden">
          <Message />
        </div>
      </div>
    </div>
  );
}
