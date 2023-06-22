import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export async function getServerSideProps() {
  const data = JSON.stringify({ time: new Date() });
  return { props: { data } };
}

export default function Home({ data }: { data: { time: string } }) {
  console.log('🚀 ~ file: index.tsx:12 ~ Home ~ data:', data);
  const [time, setTime] = useState<Date | null>(null);
  console.log('🚀 ~ file: index.tsx:14 ~ Home ~ time:', time);
  useEffect(() => {
    fetch('/api/time')
      .then((res) => res.json())
      .then((json) => setTime(new Date(json.time!)));
  }, []);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1>
          Welcome to{' '}
          <a href="https://nextjs.org">
            Next.js! The time is {time?.toDateString()}
          </a>
        </h1>
      </div>
    </main>
  );
}
