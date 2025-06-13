"use client";
import Message from "@/components/Message";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const receiverId = params.receiverId as string;

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col">
      <Navbar />
      <div className="flex flex-1 w-full border-t border-slate-200/60 overflow-hidden">
        <Sidebar />
        <div className="flex-1 h-full overflow-hidden mx-6 py-8">
          <Message receiverId={receiverId} />
        </div>
      </div>
    </div>
  );
}
