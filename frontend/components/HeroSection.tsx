export default function Hero() {
  return (
    <div className="my-40 w-full h-full bg-gradient-to-b from-white to-orange-100 dark:from-black/95 dark:via-orange-400/10 dark:to-orange-500/80">
      <main className="max-w-5xl mx-auto flex flex-col justify-center items-center text-center px-4 text-slate-700 dark:text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="mr-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-600 bg-clip-text text-transparent cursor-pointer hover:from-yellow-500 hover:to-red-500 transition-colors duration-500">
            Blaze
          </span>
          Where Every Message Ignites the Conversation.
        </h1>
        <p className="text-lg md:text-xl text-slate-500 dark:text-white max-w-2xl mt-4 font-semibold">
          Experience lightning-fast messaging with AI-powered smarts.
          <br className="hidden md:block" />
          Connect effortlessly—no fluff, just meaningful chats that spark and
          flow.
        </p>
      </main>
    </div>
  );
}
