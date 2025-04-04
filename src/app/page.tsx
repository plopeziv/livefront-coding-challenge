import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen flex justify-center items-center bg-[url('/background_images/soccer_pitch.jpg')] bg-cover bg-center">
      <div className='w-[28rem] h-[20rem] mx-3 flex justify-center bg-gray-800 p-8 rounded-lg border border-gray-600 shadow-[inset_4px_4px_8px_rgba(255,255,255,0.1),_inset_-4px_-4px_8px_rgba(0,0,0,0.5)]'>
        <main className='flex justify-center flex-col gap-8 row-start-2 items-center sm:items-start'>
          <div className='w-full flex justify-center'>
            <Image
              className='dark:invert'
              src='/next.svg'
              alt='Next.js logo'
              width={180}
              height={38}
              priority
            />
          </div>
          <ol className='list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]'>
            <li className='mb-2'>
              Get started by editing{" "}
              <code className='bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold'>
                src/app/page.tsx
              </code>
              .
            </li>
            <li>Save and see your changes instantly.</li>
          </ol>

          <div className='flex gap-4 items-center flex-col sm:flex-row'>
            <a
              className='rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
              href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Image
                className='dark:invert'
                src='/vercel.svg'
                alt='Vercel logomark'
                width={20}
                height={20}
              />
              Deploy now
            </a>
            <a
              className='rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44'
              href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
              target='_blank'
              rel='noopener noreferrer'
            >
              Read our docs
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
