import { BookOpen, Users } from 'lucide-react';

export default function Icons() {
  return (
    <>
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-yellow-300/20 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-blue-300/30 blur-3xl"></div>

      <div className="absolute top-10 right-10 w-16 h-16 rounded-lg bg-yellow-400/30 rotate-12 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 rounded-full bg-blue-500/20 animate-pulse"></div>

      <div className="absolute top-1/4 left-[5%] text-primary/50 -rotate-12 z-0">
        <BookOpen size={120} />
      </div>
      <div className="absolute bottom-20 right-[5%] text-primary/50 rotate-12 z-0">
        <Users size={120} />
      </div>
    </>
  );
}
