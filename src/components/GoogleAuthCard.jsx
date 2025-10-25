import React from 'react';
import { User } from 'lucide-react';

export default function GoogleAuthCard() {
  const handleContinue = () => {
    alert('Continuing with Google...');
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-8 shadow-xl">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
          <User className="h-5 w-5 text-white/80" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Continue with Google</h2>
          <p className="text-sm text-white/60">Sign in to sync and save your sounds.</p>
        </div>
      </div>
      <button
        onClick={handleContinue}
        className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-white text-black font-medium py-3 hover:bg-white/90 transition"
        aria-label="Continue with Google"
      >
        <img
          alt="Google"
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          className="h-5 w-5"
        />
        Continue with Google
      </button>
    </div>
  );
}
