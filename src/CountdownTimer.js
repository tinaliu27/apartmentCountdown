import React, { useEffect, useState } from "react";
import "./countdown.css";

import bulb from "./img/bulb.png";
import night from "./img/morning.jpg";
import morning from "./img/night.jpg";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isNight, setIsNight] = useState(true);
  const [confetti, setConfetti] = useState([]);
  const [progress, setProgress] = useState(0); // <-- New

  // Target date (October 1)
  useEffect(() => {
    const getTargetDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      let target = new Date(year, 9, 1); // October is month 9

      if (today > target) {
        target = new Date(year + 1, 9, 1);
      }

      return target;
    };

    const targetDate = getTargetDate();

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
          ),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });

        // Calculate progress
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const totalTime = targetDate - startOfYear;
        const elapsed = now - startOfYear;
        setProgress((elapsed / totalTime) * 100);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);


  const launchBulbasaurConfetti = () => {
    const pieces = [];

    for (let i = 0; i < 30; i++) {
      pieces.push({
        id: Date.now() + i,
        left: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 0.3,
        size: 40 + Math.random() * 30,
        rotation: Math.random() * 360,
      });
    }

    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 5000);
  };

  const bgImage = isNight ? night : morning;

  const items = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <div className="app">
      {/* Background */}
      <div
        className="background"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="overlay" />

      {/* Confetti */}
      {confetti.map((piece) => (
        <img
          key={piece.id}
          src={bulb}
          alt="bulbasaur"
          className="confetti"
          style={{
            left: `${piece.left}%`,
            width: `${piece.size}px`,
            animationDuration: `${piece.duration}s`,
            animationDelay: `${piece.delay}s`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        />
      ))}

    {/* Progress Bar */}
    <div className="progress-container">
      <div
        className="progress-bar"
        style={{ width: `${progress.toFixed(2)}%` }}
      />
    </div>

      {/* Toggle */}
      <button
        className="dark-toggle"
        onClick={() => setIsNight(!isNight)}
      >
        {isNight ? "🌙" : "☀️"}
      </button>

      {/* Content */}
      <div className="content">
        <h1 className="title">Kyle & Sam's Apartment Countdown</h1>

        <p className="subtitle">#OctoberComeSooner</p>

        {/* Countdown Cards */}
        <div className="countdown-grid">
          {items.map((item, index) => (
            <div
              key={item.label}
              className="count-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="count-number">
                {item.value.toString().padStart(2, "0")}
              </div>
              <div className="count-label">
                {item.label}
              </div>
            </div>
          ))}
        </div>
        {/* Spotify Widget */}


        {/* Confetti Button */}
        <div className="confetti-btn-container">
          <button
            className="bulba-btn"
            onClick={launchBulbasaurConfetti}
          >
            YIPEE!! 🎉
          </button>
        </div>
      </div>
    </div>
  );
}
