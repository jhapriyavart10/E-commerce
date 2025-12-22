'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const DesktopProduct = dynamic(() => import('./desktop_pro'), { ssr: false });
const MobileProduct = dynamic(() => import('./mobile_pro'), { ssr: false });

function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

export default function Page() {
  const isMobile = useIsMobile();

  if (isMobile === null) return null;

  return isMobile ? <MobileProduct /> : <DesktopProduct />;
}
