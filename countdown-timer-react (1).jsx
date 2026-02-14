import { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const [darkMode, setDarkMode] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set your target date here (New Year 2027 as example)
  const targetDate = new Date('2027-01-01T00:00:00').getTime();

  // Confetti launcher function
  const launchConfetti = () => {
    const newConfetti = [];
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
    
    for (let i = 0; i < 50; i++) {
      newConfetti.push({
        id: Date.now() + i,
        left: Math.random() * 100,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        animationDuration: 2 + Math.random() * 2,
        animationDelay: Math.random() * 0.5
      });
    }
    
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 4000);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Moon Icon Component
  const MoonIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  );

  // Sun Icon Component
  const SunIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  );

  // Party Popper Icon Component
  const PartyPopperIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.8 11.3 2 22l10.7-3.79"></path>
      <path d="M4 3h.01"></path>
      <path d="M22 8h.01"></path>
      <path d="M15 2h.01"></path>
      <path d="M22 20h.01"></path>
      <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"></path>
      <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17"></path>
      <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7"></path>
      <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"></path>
    </svg>
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Confetti Pieces */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-3 h-3 animate-fall"
          style={{
            left: `${piece.left}%`,
            top: '-20px',
            backgroundColor: piece.backgroundColor,
            animationDuration: `${piece.animationDuration}s`,
            animationDelay: `${piece.animationDelay}s`,
            transform: 'rotate(45deg)'
          }}
        />
      ))}
      
      {/* Gradient Background */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        darkMode 
          ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
          : 'bg-gradient-to-br from-blue-400 via-cyan-300 to-blue-500'
      }`} />
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: darkMode 
            ? "url('https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1920&q=80')"
            : "url('https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1920&q=80')",
          filter: darkMode ? 'brightness(0.4)' : 'brightness(0.6)'
        }}
      />
      
      {/* Overlay */}
      <div className={`absolute inset-0 transition-colors duration-500 ${
        darkMode ? 'bg-black/50' : 'bg-white/20'
      }`} />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`absolute top-8 right-8 p-3 rounded-full transition-all duration-300 ${
            darkMode 
              ? 'bg-white/10 hover:bg-white/20 text-white' 
              : 'bg-black/10 hover:bg-black/20 text-gray-900'
          }`}
          aria-label="Toggle theme"
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </button>

        {/* Title */}
        <h1 className={`text-4xl md:text-6xl font-bold mb-16 text-center transition-colors duration-500 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          New Year Countdown
        </h1>

        {/* Countdown Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds }
          ].map((item, index) => (
            <div 
              key={index}
              className={`flex flex-col items-center p-6 md:p-8 rounded-2xl backdrop-blur-md transition-all duration-500 ${
                darkMode 
                  ? 'bg-white/10 border border-white/20' 
                  : 'bg-white/40 border border-gray-300/50'
              }`}
            >
              <div className={`text-5xl md:text-7xl font-bold mb-2 transition-colors duration-500 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {String(item.value).padStart(2, '0')}
              </div>
              <div className={`text-sm md:text-lg uppercase tracking-wider transition-colors duration-500 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <p className={`mt-12 text-xl md:text-2xl text-center transition-colors duration-500 ${
          darkMode ? 'text-gray-300' : 'text-gray-800'
        }`}>
          Until the ball drops in Times Square
        </p>
      </div>

      {/* Confetti Cannon Button */}
      <button
        onClick={launchConfetti}
        className={`fixed bottom-8 right-8 p-4 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 ${
          darkMode 
            ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/50' 
            : 'bg-yellow-400 hover:bg-yellow-300 text-gray-900 shadow-lg shadow-yellow-400/50'
        }`}
        aria-label="Launch confetti"
      >
        <PartyPopperIcon />
      </button>

      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear forwards;
        }
      `}</style>
    </div>
  );
}