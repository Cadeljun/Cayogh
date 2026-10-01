"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MediaRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground font-mono text-sm">
      Redirecting to Admin Media Panel...
    </div>
  );
}
