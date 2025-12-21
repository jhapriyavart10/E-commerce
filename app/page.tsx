import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Empty content area - to be filled later */}
      <main className="flex-grow bg-[#F6D8AB]">
        {/* Featured Products Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 style={{ 
            fontFamily: 'var(--font-manrope)', 
            fontSize: '40px', 
            fontWeight: 700,
            color: '#280F0B',
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            Featured Products
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Product Card */}
            <Link href="/product/sphere-crystal-pendulum">
              <div style={{
                background: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.3s, box-shadow 0.3s',
                border: '1px solid #E8D5B7'
              }}
              className="hover:transform hover:scale-105 hover:shadow-xl"
              >
                <div style={{ position: 'relative', width: '100%', paddingTop: '100%' }}>
                  <img
                    src="/assets/images/f1931560e8f947b5b51be3ba5535c1d4313d27f6.png"
                    alt="Sphere Crystal Pendulum"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                
                <div style={{ padding: '20px' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-manrope)',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#280F0B',
                    marginBottom: '8px'
                  }}>
                    Sphere Crystal Pendulums
                  </h3>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ color: '#FFC107', fontSize: '16px' }}>★</span>
                    ))}
                    <span style={{ fontSize: '14px', color: '#666', marginLeft: '4px' }}>(7)</span>
                  </div>
                  
                  <p style={{
                    fontFamily: 'var(--font-manrope)',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#280F0B'
                  }}>
                    $35.00 AUD
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
