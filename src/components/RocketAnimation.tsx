import { useEffect, useState } from 'react'

interface RocketAnimationProps {
  onComplete: () => void
}

const RocketAnimation = ({ onComplete }: RocketAnimationProps) => {
  const [phase, setPhase] = useState<'launch' | 'ascending' | 'success'>('launch')

  useEffect(() => {
    // Phase 1: Launch (0-1s)
    const launchTimer = setTimeout(() => {
      setPhase('ascending')
    }, 1000)

    // Phase 2: Ascending (1-3s)
    const ascendingTimer = setTimeout(() => {
      setPhase('success')
    }, 3000)

    // Phase 3: Success message shown, complete after 2s
    const completeTimer = setTimeout(() => {
      onComplete()
    }, 5000)

    return () => {
      clearTimeout(launchTimer)
      clearTimeout(ascendingTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {/* Rocket Container */}
      {(phase === 'launch' || phase === 'ascending') && (
        <div
          className={`absolute left-1/2 ${
            phase === 'launch' ? 'bottom-40' : ''
          } ${
            phase === 'ascending' ? 'animate-rocket-ascend' : ''
          }`}
          style={{
            animation: phase === 'ascending' ? 'rocketAscend 2s ease-out forwards' : undefined,
            transform: phase === 'launch' ? 'translateX(-50%)' : undefined
          }}
        >
          {/* Rocket SVG */}
          <svg
            width="60"
            height="80"
            viewBox="0 0 60 80"
            className={`transition-all duration-1000 ${
              phase === 'ascending' ? 'scale-75 opacity-90' : 'scale-100'
            }`}
          >
            {/* Rocket Body */}
            <ellipse cx="30" cy="50" rx="12" ry="25" fill="#E20074" />
            <ellipse cx="30" cy="45" rx="10" ry="20" fill="#ffffff" />
            
            {/* Rocket Nose */}
            <path d="M 30 20 L 20 35 L 40 35 Z" fill="#E20074" />
            <path d="M 30 22 L 22 35 L 38 35 Z" fill="#ffffff" />
            
            {/* Rocket Window */}
            <circle cx="30" cy="45" r="5" fill="#323232" />
            
            {/* Rocket Fins */}
            <path d="M 18 55 L 10 70 L 18 65 Z" fill="#E20074" />
            <path d="M 42 55 L 50 70 L 42 65 Z" fill="#E20074" />
            
            {/* Flame */}
            <g className="animate-flame">
              <ellipse cx="30" cy="72" rx="8" ry="12" fill="#ff6b00" opacity="0.8" />
              <ellipse cx="30" cy="75" rx="6" ry="10" fill="#ffaa00" opacity="0.9" />
              <ellipse cx="30" cy="78" rx="4" ry="8" fill="#ffff00" opacity="0.7" />
            </g>
          </svg>

          {/* Smoke Particles */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
            {[...Array(12)].map((_, i) => {
              const offset = (Math.random() * 40 - 20)
              return (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-gray-300 rounded-full opacity-60"
                  style={{
                    left: `${-20 + (i % 6) * 7}px`,
                    '--smoke-offset': `${offset}px`,
                    animation: `smokeParticle ${0.8 + Math.random() * 0.4}s ease-out forwards`,
                    animationDelay: `${i * 0.08}s`
                  } as React.CSSProperties & { '--smoke-offset': string }}
                />
              )
            })}
          </div>
        </div>
      )}

      {/* Success Overlay */}
      {phase === 'success' && (
        <div className="absolute inset-0 bg-white animate-fade-in flex items-center justify-center pointer-events-auto">
          <div className="text-center animate-scale-in max-w-md px-6">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto bg-telekom-magenta rounded-full flex items-center justify-center animate-bounce-gentle">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-telekom-magenta mb-4">
              Bewerbung gesendet!
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Vielen Dank für Ihre Bewerbung. Sie erhalten eine Bestätigungs-E-Mail.
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes rocketAscend {
          0% {
            transform: translate(-50%, 0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -200px) scale(0.8);
            opacity: 0.9;
          }
          100% {
            transform: translate(-50%, -400px) scale(0.3);
            opacity: 0;
          }
        }

        @keyframes flame {
          0%, 100% {
            transform: scaleY(1);
            opacity: 0.8;
          }
          50% {
            transform: scaleY(1.2);
            opacity: 1;
          }
        }

        @keyframes smokeParticle {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100px) translateX(${Math.random() * 40 - 20}px) scale(0.3);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-rocket-ascend {
          animation: rocketAscend 2s ease-out forwards;
        }

        .animate-flame {
          animation: flame 0.3s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-rocket-ascend,
          .animate-flame,
          .animate-fade-in,
          .animate-scale-in {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}

export default RocketAnimation

