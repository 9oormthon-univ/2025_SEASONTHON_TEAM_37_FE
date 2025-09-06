'use client';

import Header from '@/components/layouts/header';
import Sidebar from './ui/sidebar';
import RecentListSection from './sections/recent-list-section';
import PopularListSection from './sections/popular-list-section';
import HeroSection from './sections/hero-section';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PATH } from '@/lib/path';

const Home = () => {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="lg:pl-25 flex flex-1 min-h-0">
        <Sidebar />
        <main className="p-4 lg:pr-25 pb-30 lg:p-10 lg:pb-30 flex-1 min-h-0 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <HeroSection />

            <PopularListSection />

            <RecentListSection />
          </div>

          <Link href={PATH.post.add} className="fixed bottom-16 right-16 z-50">
            <Button
              size="lg"
              className="rounded-full font-semibold py-2 h-auto text-lg shadow-lg"
            >
              실패담 작성하기
            </Button>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Home;
