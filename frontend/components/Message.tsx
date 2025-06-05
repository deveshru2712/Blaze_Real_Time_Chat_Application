import { Send } from "lucide-react";
import { Input } from "./ui/input";
import MessageBubble from "./MessageBubble";
import SkeletonBubble from "./skeletons/SkeletonBubble";

export default function Message() {
  const isLoading = true;

  return (
    <div className="h-full flex flex-col mx-6 py-4">
      <div className="flex-1 flex-col flex gap-1">
        {/* message bubble  */}
        {isLoading ? (
          <>
            <SkeletonBubble isMyMessage={false} />
            <SkeletonBubble isMyMessage={true} />
            <SkeletonBubble isMyMessage={false} />
          </>
        ) : (
          <>
            <MessageBubble isMine={true} />
            <MessageBubble isMine={false} />
            <MessageBubble isMine={true} />
          </>
        )}
      </div>
      <div className="w-full">
        <form className="w-full flex items-center gap-1">
          <Input placeholder="Type here..." type="text" className="" />
          <button
            type="submit"
            className="relative p-2 rounded-md overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-1.5 bg-slate-400 dark:bg-white/80 rounded-md group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-red-400 transition-all duration-300" />
            <div className="relative z-10 p-1 bg-white dark:bg-black rounded-sm group-hover:bg-opacity-0 transition-colors duration-300">
              <Send className="text-gray-700 dark:text-white/80 group-hover:text-orange-400 dark:group-hover:text-orange-400 transition-colors duration-300" />
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
