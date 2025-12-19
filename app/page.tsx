import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Empty content area - to be filled later */}
      <main className="flex-grow bg-[#F5E6D3]">
        {/* Home page content will go here */}
      </main>
      
      <Footer />
    </div>
  );
}
