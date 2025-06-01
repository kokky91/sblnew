'use client';                // ← zonder onbedoelde '1='

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ValidateEmailSuccess() {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  /* 
   * ✅ 1. router toegevoegd aan de dependency-array  
   * ✅ 2. functionele update (prev ⇒ prev - 1) → voorkomt “stalen” state  
   * ✅ 3. setTimeout i.p.v. setInterval, zodat er maar één timer tegelijk draait  
   * ✅ 4. stopt meteen zodra countdown 0 is  
   */
  useEffect(() => {
    if (countdown <= 0) {
      router.replace('/sign-in');
      return;                 // geen timer meer starten
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router]);    // ← ESLint is nu tevreden

  return (
    <div className="container min-h-screen w-full flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Your email has been validated</h2>
      <p className="text-sm text-gray-500">
        You will be redirected to the login page in {countdown} second{countdown !== 1 && 's'}.
      </p>

      {/* Button → Link is beter voor semantics; zo voorkom je onnodige <a> in <button> */}
      <Link href="/sign-in" passHref legacyBehavior>
        <Button asChild>
          <a>Go to Login</a>
        </Button>
      </Link>
    </div>
  );
}
