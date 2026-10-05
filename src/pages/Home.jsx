import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CtaEcosystemVisual from '../components/CtaEcosystemVisual';
import {
  ArrowRight,
  Shield,
  Activity,
  Users,
  Globe,
  Zap,
  Sparkles,
  Mail,
  Briefcase,
  UserCheck,
  User,
  Star,
  Cpu,
  Database,
  Lock,
  Terminal,
  Code2,
  Workflow,
  Network,
  Award,
  Lightbulb,
  Handshake,
  Rocket,
  Quote,
  TrendingUp,
  Puzzle
} from 'lucide-react';

// ==========================================
// 3D FLOATING PHILOSOPHY SHOWCASE COMPONENT
// ==========================================
function Philosophy3DShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const cards = [
    {
      id: 'build',
      title: 'What We Build',
      desc: 'At Beta Softnet, we develop intelligent software products that help businesses improve efficiency, automate workflows, and accelerate digital transformation. Our products are designed with scalability, security, and user experience at their core, enabling organizations to adapt and grow in an ever-changing digital world.',
      icon: Cpu,
      iconBg: 'bg-blue-50 text-blue-600 border-blue-100',
      titleHover: 'group-hover:text-blue-600',
      glow: 'from-blue-500/10 to-cyan-500/10',
      actionText: 'View our products suite',
      actionColor: 'text-blue-600',
      badge: 'Product Suite',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200/70',
      accentBorder: 'hover:border-blue-300',
      accentBg: 'bg-blue-500',
      link: '#products'
    },
    {
      id: 'engineering',
      title: 'Engineering Excellence',
      desc: 'We believe that great products are built with strong engineering practices. Our teams focus on clean architecture, modern technologies, continuous improvement, and high-quality code to deliver reliable and innovative software solutions.',
      icon: Terminal,
      iconBg: 'bg-amber-50 text-amber-600 border-amber-100',
      titleHover: 'group-hover:text-amber-600',
      glow: 'from-amber-500/10 to-orange-500/10',
      actionText: 'Explore our codebase standards',
      actionColor: 'text-amber-600',
      badge: 'Engineering Standards',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200/70',
      accentBorder: 'hover:border-amber-300',
      accentBg: 'bg-amber-500',
      link: '#careers'
    },
    {
      id: 'innovation',
      title: 'Technology & Innovation',
      desc: 'Innovation drives everything we do. We continuously explore emerging technologies, modern development practices, and creative ideas to build products that solve real-world business challenges and create lasting value.',
      icon: Workflow,
      iconBg: 'bg-purple-50 text-purple-600 border-purple-100',
      titleHover: 'group-hover:text-purple-600',
      glow: 'from-purple-500/10 to-pink-500/10',
      actionText: 'See our roadmap',
      actionColor: 'text-purple-600',
      badge: 'Innovation & R&D',
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200/70',
      accentBorder: 'hover:border-purple-300',
      accentBg: 'bg-purple-500',
      link: '#about'
    },
    {
      id: 'grow',
      title: 'Grow With Us',
      desc: "We provide an environment where learning never stops. Through real-world projects, mentorship, and collaborative teamwork, you'll gain valuable experience, expand your technical expertise, and build a successful career in product development.",
      icon: Users,
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      titleHover: 'group-hover:text-emerald-600',
      glow: 'from-emerald-500/10 to-teal-500/10',
      actionText: 'Explore active career roles',
      actionColor: 'text-emerald-600',
      badge: 'Culture & Careers',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
      accentBorder: 'hover:border-emerald-300',
      accentBg: 'bg-emerald-500',
      link: '/careers'
    }
  ];

  const totalCards = cards.length;

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  const DISPLAY_TIME = 3000; // 3 seconds display time
  const TRANSITION_TIME = 800; // 800ms animation transition
  const isInitialMount = useRef(true);
  const wasHoveredRef = useRef(false);

  // Exact 3-second display time autoplay lifecycle
  useEffect(() => {
    if (isHovered) {
      wasHoveredRef.current = true;
      return;
    }

    // On initial load or after un-hovering, card is already in center, so wait DISPLAY_TIME (3000ms).
    // During automatic transition or manual navigation, wait TRANSITION_TIME (800ms) + DISPLAY_TIME (3000ms) = 3800ms.
    const isStationary = isInitialMount.current || wasHoveredRef.current;
    const delay = isStationary ? DISPLAY_TIME : (DISPLAY_TIME + TRANSITION_TIME);

    isInitialMount.current = false;
    wasHoveredRef.current = false;

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % totalCards);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex, isHovered, totalCards]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalCards);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  const goToCard = (idx) => {
    setCurrentIndex(idx);
  };

  // Touch swipe gestures for mobile
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (touchDeltaX.current > 45) {
      goToPrev();
    } else if (touchDeltaX.current < -45) {
      goToNext();
    }
    touchDeltaX.current = 0;
  };

  // Calculate 3D styling per card relative to currentIndex
  const getCardStyle = (index) => {
    let offset = (index - currentIndex) % totalCards;
    if (offset > totalCards / 2) offset -= totalCards;
    if (offset < -totalCards / 2) offset += totalCards;

    // Reduced motion fallback
    if (reducedMotion) {
      if (offset === 0) {
        return {
          transform: 'translateX(0) scale(1)',
          opacity: 1,
          zIndex: 30,
          pointerEvents: 'auto',
          visibility: 'visible',
          transition: 'opacity 300ms ease, transform 300ms ease'
        };
      }
      return {
        transform: `translateX(${offset * 80}%) scale(0.9)`,
        opacity: 0,
        zIndex: 10,
        pointerEvents: 'none',
        visibility: 'hidden',
        transition: 'opacity 300ms ease, transform 300ms ease'
      };
    }

    // Modern 3D Carousel Positioning
    if (offset === 0) {
      // Main Center Card
      return {
        transform: 'translateX(0%) translateZ(0px) rotateY(0deg) scale(1)',
        opacity: 1,
        zIndex: 30,
        pointerEvents: 'auto',
        visibility: 'visible',
        boxShadow: '0 25px 50px -12px rgba(0, 74, 173, 0.16), 0 0 0 1px rgba(0, 74, 173, 0.08)',
        transition: 'transform 800ms cubic-bezier(0.25, 1, 0.4, 1), opacity 800ms cubic-bezier(0.25, 1, 0.4, 1), box-shadow 800ms ease'
      };
    } else if (offset === -1) {
      // Left Card (partially visible, scaled down, angled outward)
      return {
        transform: 'translateX(-70%) translateZ(-80px) rotateY(16deg) scale(0.86)',
        opacity: 0.65,
        zIndex: 20,
        pointerEvents: 'auto',
        visibility: 'visible',
        boxShadow: '0 15px 30px -10px rgba(15, 23, 42, 0.08)',
        transition: 'transform 800ms cubic-bezier(0.25, 1, 0.4, 1), opacity 800ms cubic-bezier(0.25, 1, 0.4, 1), box-shadow 800ms ease'
      };
    } else if (offset === 1) {
      // Right Card (partially visible, scaled down, angled outward)
      return {
        transform: 'translateX(70%) translateZ(-80px) rotateY(-16deg) scale(0.86)',
        opacity: 0.65,
        zIndex: 20,
        pointerEvents: 'auto',
        visibility: 'visible',
        boxShadow: '0 15px 30px -10px rgba(15, 23, 42, 0.08)',
        transition: 'transform 800ms cubic-bezier(0.25, 1, 0.4, 1), opacity 800ms cubic-bezier(0.25, 1, 0.4, 1), box-shadow 800ms ease'
      };
    } else {
      // Back / Far Card (Smooth depth exit)
      const exitDir = offset > 0 ? 1 : -1;
      return {
        transform: `translateX(${exitDir * 110}%) translateZ(-180px) rotateY(${exitDir * -24}deg) scale(0.72)`,
        opacity: 0,
        zIndex: 10,
        pointerEvents: 'none',
        visibility: 'hidden',
        transition: 'transform 800ms cubic-bezier(0.25, 1, 0.4, 1), opacity 800ms cubic-bezier(0.25, 1, 0.4, 1)'
      };
    }
  };

  return (
    <div
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 overflow-hidden py-6 bg-transparent"
      style={{ background: 'transparent' }}
    >

      {/* Section Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#004AAD] text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Our Core Philosophy</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
          How We Shape the Future
        </h2>
        <p className="text-slate-500 text-base sm:text-lg leading-relaxed font-medium">
          Driven by innovation, engineering excellence, clean code, and continuous growth.
        </p>
      </div>

      {/* 3D Floating Cards Carousel Stage */}
      <div
        className="relative z-10 w-full py-4 sm:py-8 select-none"
        style={{ perspective: '1200px' }}
        onPointerEnter={(e) => {
          if (e.pointerType !== 'touch') setIsHovered(true);
        }}
        onPointerLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="relative h-[440px] sm:h-[400px] md:h-[390px] w-full flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {cards.map((card, idx) => {
            const Icon = card.icon;
            const style = getCardStyle(idx);
            let offset = (idx - currentIndex) % totalCards;
            if (offset > totalCards / 2) offset -= totalCards;
            if (offset < -totalCards / 2) offset += totalCards;
            const isCenter = offset === 0;

            return (
              <div
                key={card.id}
                style={style}
                onClick={() => {
                  if (!isCenter) {
                    if (offset === -1) goToPrev();
                    if (offset === 1) goToNext();
                  }
                }}
                className={`absolute top-0 bottom-0 left-0 right-0 m-auto w-[90vw] max-w-[340px] sm:max-w-[440px] md:max-w-[480px] lg:max-w-[520px] h-[430px] sm:h-[390px] md:h-[380px] rounded-3xl p-7 sm:p-9 bg-white border border-slate-200/90 flex flex-col justify-between transition-colors duration-300 ${
                  isCenter ? 'cursor-default ring-1 ring-blue-500/10' : 'cursor-pointer hover:border-blue-300'
                }`}
              >
                {/* Ambient Glow Pill on Card Top Right */}
                <div className={`absolute -right-16 -top-16 w-40 h-40 rounded-full bg-gradient-to-br ${card.glow} blur-3xl opacity-80 pointer-events-none`} />

                {/* Top Section: Icon & Category Tag */}
                <div className="space-y-5 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center border shadow-sm ${card.iconBg} transition-transform duration-300 ${isCenter ? 'scale-105' : ''}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${card.badgeBg}`}>
                      {card.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2.5">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                      {card.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Link */}
                <div className="relative z-10 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={card.link}
                    className={`inline-flex items-center text-xs sm:text-sm font-bold ${card.actionColor} hover:underline group`}
                    onClick={(e) => {
                      if (!isCenter) e.preventDefault();
                    }}
                  >
                    <span>{card.actionText}</span>
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>

                  {!isCenter && (
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider hidden sm:inline">
                      Click to focus
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 4-Item Pill Navigation Bar (Matches Reference Design) */}
        <div className="flex items-center justify-center mt-10 relative z-20">
          <div className="inline-flex items-center p-1.5 rounded-full bg-slate-200/70 backdrop-blur-md border border-slate-300/40 shadow-sm max-w-full">
            {[
              { label: 'PRODUCT', cardIndex: 0, title: 'What We Build' },
              { label: 'ENGINEERING', cardIndex: 1, title: 'Engineering Excellence' },
              { label: 'R&D', cardIndex: 2, title: 'Technology & Innovation' },
              { label: 'CAREER', cardIndex: 3, title: 'Grow With Us' }
            ].map((item) => {
              const isActive = currentIndex === item.cardIndex;
              return (
                <button
                  key={item.label}
                  onClick={() => goToCard(item.cardIndex)}
                  aria-label={`Show ${item.title}`}
                  className={`relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold tracking-wider transition-colors duration-300 cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                    isActive ? 'text-white' : 'text-slate-700 hover:text-slate-950'
                  }`}
                >
                  {/* Sliding Dark Navy / Black Capsule behind Active Item */}
                  {isActive && (
                    <motion.div
                      layoutId="activePhilosophyPill"
                      className="absolute inset-0 bg-slate-950 rounded-full shadow-md pointer-events-none"
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 34
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [heroIntroDone, setHeroIntroDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroIntroDone(true);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };



  const features = [
    {
      title: 'Security-First Architecture',
      description: 'All interactions, mailboxes, and databases are encrypted with AES-256 and verified through JWT claims.',
      icon: Shield,
      bg: 'bg-blue-50 text-[#004AAD] border-blue-100'
    },
    {
      title: 'Instant WebSocket Sync',
      description: 'Instant updates across devices — no reloads needed.',
      icon: Zap,
      bg: 'bg-amber-50 text-amber-600 border-amber-100'
    },
    {
      title: 'Unified Database Layer',
      description: 'A centralized data ecosystem. Shift mail threads directly into sprint tasks or team discussion boards.',
      icon: Sparkles,
      bg: 'bg-purple-50 text-purple-600 border-purple-100'
    }
  ];

  const stats = [
    { label: 'Active Users', value: '1000+', icon: Users, color: 'text-blue-600' },
    { label: 'Uptime SLA', value: '99.99%', icon: Activity, color: 'text-emerald-600' },
    { label: 'Enterprise Clients', value: '50+', icon: Globe, color: 'text-indigo-600' },
    { label: 'Data Protected', value: '25 PB', icon: Shield, color: 'text-cyan-600' },
  ];

  const testimonials = [
    {
      quote: "Switching our corporate authentication to B2 Auth Security was the best engineering decision we made this year. We achieved SSO with MFA compatibility within days, and the security audit was seamless.",
      author: "Jonathan Sterling",
      title: "VP of Security, CloudSphere Inc.",
      initials: "JS",
      gradient: "from-cyan-400 to-[#004AAD]"
    },
    {
      quote: "BNX Mail's collaborative workspace allowed our support agents to respond to high-priority client mail threads simultaneously. The shared conversations layout has reduced our response time by 40%.",
      author: "Miranda Rodes",
      title: "Operations Director, ApexLogistics",
      initials: "MR",
      gradient: "from-violet-400 to-indigo-600"
    }
  ];

  const techStack = [
    {
      name: 'React 18',
      description: 'Modern front-end framework rendering declarative, state-driven interfaces with high responsiveness.',
      icon: Code2,
      category: 'Frontend',
      bg: 'bg-cyan-50 text-cyan-600 border-cyan-100',
      gradient: 'from-cyan-400 to-blue-500'
    },
    {
      name: 'Vite',
      description: 'Ultra-fast bundler and dev server powering blazing fast builds and Hot Module Replacement.',
      icon: Terminal,
      category: 'Build System',
      bg: 'bg-amber-50 text-amber-600 border-amber-100',
      gradient: 'from-amber-400 to-orange-500'
    },
    {
      name: 'Tailwind CSS',
      description: 'Utility-first styling library supporting rich design systems and layouts natively.',
      icon: Globe,
      category: 'Styling',
      bg: 'bg-sky-50 text-sky-600 border-sky-100',
      gradient: 'from-sky-400 to-indigo-500'
    },
    {
      name: 'Node.js & Express',
      description: 'Robust server architecture supporting scalable RESTful APIs and rapid routing services.',
      icon: Cpu,
      category: 'Backend Server',
      bg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      gradient: 'from-emerald-400 to-teal-500'
    },
    {
      name: 'MongoDB',
      description: 'Scalable NoSQL database engine storage for flexible team workspaces, notes, and task backlogs.',
      icon: Database,
      category: 'Database',
      bg: 'bg-green-50 text-green-600 border-green-100',
      gradient: 'from-green-400 to-emerald-600'
    },
    {
      name: 'OAuth 2.0 & JWT',
      description: 'Cryptographically secure auth protocols powering SSO gateways and API access controls.',
      icon: Lock,
      category: 'Security',
      bg: 'bg-rose-50 text-rose-600 border-rose-100',
      gradient: 'from-rose-400 to-red-500'
    },
    {
      name: 'WebSockets',
      description: 'Bi-directional real-time channels syncing collaborative task boards and email clients.',
      icon: Network,
      category: 'Communication',
      bg: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      gradient: 'from-indigo-400 to-violet-500'
    },
    {
      name: 'Framer Motion',
      description: 'High-performance layout transitions and fluid micro-animations for an interactive UX.',
      icon: Workflow,
      category: 'Animation',
      bg: 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100',
      gradient: 'from-fuchsia-400 to-pink-500'
    }
  ];

  const principlesMarquee = [
    { title: 'Performance First', desc: 'Sub-millisecond latency', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
    { title: 'Security by Default', desc: 'End-to-end encryption', icon: Lock, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { title: 'Designed to Scale', desc: 'Elastic infrastructure', icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Built for Simplicity', desc: 'Effortless user workflows', icon: Puzzle, color: 'text-purple-500', bg: 'bg-purple-50' },
    { title: 'High Availability', desc: '99.99% uptime SLA', icon: Activity, color: 'text-cyan-500', bg: 'bg-cyan-50' },
    { title: 'Zero-Trust Protocol', desc: 'Cryptographic SSO gates', icon: Shield, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { title: 'Real-Time Sync', desc: 'WebSocket live pipeline', icon: Workflow, color: 'text-rose-500', bg: 'bg-rose-50' },
    { title: 'Global Architecture', desc: 'Edge-distributed workloads', icon: Globe, color: 'text-sky-500', bg: 'bg-sky-50' }
  ];

  return (
    <div className="relative min-h-screen bg-transparent z-10 pt-0 pb-20">
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes auroraShift {
          0% { background-position: 0% 50%; filter: hue-rotate(0deg); }
          50% { background-position: 100% 50%; filter: hue-rotate(180deg); }
          100% { background-position: 0% 50%; filter: hue-rotate(360deg); }
        }
        .aurora-bg-animate {
          background: linear-gradient(135deg, #3b82f6, #06b6d4, #8b5cf6, #3b82f6);
          background-size: 300% 300%;
          animation: auroraShift 12s ease infinite;
        }
        .group:hover .aurora-bg-animate {
          animation-duration: 4s !important;
        }
        .animated-gradient-text {
          background: linear-gradient(90deg, #60a5fa, #2dd4bf, #c084fc, #60a5fa);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: borderGradientShift 3s linear infinite;
        }
        @keyframes borderGradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes floatQuote {
          0% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0); }
        }
        @keyframes gradientSwirl {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        @keyframes rotateOrbit1 {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes rotateOrbit2 {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes logoPulseGlow {
          0% { transform: scale(1); box-shadow: 0 0 20px rgba(59, 130, 246, 0.4), inset 0 0 15px rgba(59, 130, 246, 0.2); }
          50% { transform: scale(1.04); box-shadow: 0 0 45px rgba(6, 182, 212, 0.7), inset 0 0 25px rgba(6, 182, 212, 0.4); }
          100% { transform: scale(1); box-shadow: 0 0 20px rgba(59, 130, 246, 0.4), inset 0 0 15px rgba(59, 130, 246, 0.2); }
        }
        @keyframes floatParticle {
          0% { transform: translateY(0) scale(0.5); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-160px) scale(1.2); opacity: 0; }
        }
        .animated-gradient-bg {
          background: linear-gradient(-45deg, #004AAD, #0b66c2, #1e3a8a, #4f46e5);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }
        .hero-blue-banner h1, .hero-blue-banner h2, .hero-blue-banner h3 {
          color: #ffffff !important;
        }
        .hero-blue-banner p {
          color: rgba(241, 245, 249, 0.95) !important;
        }
        .cta-colored-section h2, .cta-colored-section h3, .cta-colored-section h4 {
          color: #ffffff !important;
        }
        .cta-colored-section p {
          color: rgba(241, 245, 249, 0.95) !important;
        }
        .showcase-white-text h3, 
        .showcase-white-text p, 
        .showcase-white-text span {
          color: #ffffff !important;
        }
        @keyframes marqueeLeftToRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .marquee-track-lr {
          display: flex;
          width: max-content;
          animation: marqueeLeftToRight 30s linear infinite;
          will-change: transform;
        }
        .marquee-track-lr:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track-lr {
            animation: none !important;
          }
        }

        /* 4.5-SECOND 3D CINEMATIC INTRO ANIMATION */
        .hero-3d-stage {
          perspective: 1200px;
          perspective-origin: center 40%;
          transform-style: preserve-3d;
        }

        /* 0.0s - 0.8s: Opening Technical Grid & Soft Blue Center Glow */
        @keyframes techCenterGlow {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.65);
          }
          17.8% { /* 0.8s: Form soft blue lighting */
            opacity: 0.9;
            transform: translate(-50%, -50%) scale(1.0);
          }
          51.1% { /* 2.3s */
            opacity: 0.7;
            transform: translate(-50%, -50%) scale(1.05);
          }
          80.0% { /* 3.6s: Converging toward center */
            opacity: 0.45;
            transform: translate(-50%, -50%) scale(1.0);
          }
          100% { /* 4.5s: Stable ambient backing */
            opacity: 0.25;
            transform: translate(-50%, -50%) scale(1.0);
          }
        }

        /* Subtle technical baseline datum line */
        @keyframes techDatumLine {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scaleX(0);
          }
          17.8% { /* 0.8s: Forms across */
            opacity: 0.8;
            transform: translate(-50%, -50%) scaleX(1);
          }
          80.0% { /* 3.6s: Remains crisp guide */
            opacity: 0.5;
            transform: translate(-50%, -50%) scaleX(0.9);
          }
          100% { /* 4.5s: Settles into delicate underline */
            opacity: 0.25;
            transform: translate(-50%, -50%) scaleX(0.7);
          }
        }

        /* Subtle technical corner brackets */
        @keyframes techBrackets {
          0% {
            opacity: 0;
            transform: scale(1.15);
          }
          17.8% {
            opacity: 0.75;
            transform: scale(1.0);
          }
          80.0% {
            opacity: 0.4;
            transform: scale(0.98);
          }
          100% {
            opacity: 0.15;
            transform: scale(0.95);
          }
        }

        /* 0.8s - 1.6s: "Where" Entrance with 3D depth & perspective */
        @keyframes animWordWhere {
          0%, 17.8% { /* 0.0s - 0.8s: Hidden */
            opacity: 0;
            transform: translate3d(0, 28px, -70px) rotateX(22deg);
            filter: blur(4px);
            text-shadow: 0 0 0 transparent;
          }
          35.6% { /* 1.6s: Assembled into place */
            opacity: 1;
            transform: translate3d(0, 0, 0) rotateX(0deg);
            filter: blur(0);
            text-shadow: 0 1px 0 #002266, 0 2px 0 #001b52, 0 4px 12px rgba(7, 87, 184, 0.16);
          }
          80.0% { /* 3.6s */
            opacity: 1;
            transform: translate3d(0, 0, 0) rotateX(0deg);
            filter: blur(0);
            text-shadow: 0 1px 0 #002266, 0 2px 0 #001b52, 0 4px 12px rgba(7, 87, 184, 0.16);
          }
          100% { /* 4.5s: Final stable typography */
            opacity: 1;
            transform: translate3d(0, 0, 0) rotateX(0deg);
            filter: blur(0);
            text-shadow: 0 1px 0 #002266, 0 2px 0 #001b52, 0 3px 10px rgba(7, 87, 184, 0.12);
          }
        }

        /* 1.6s - 2.3s: "Technology" Entrance - Mechanical/digital technical assembly */
        @keyframes animWordTechnology {
          0%, 35.6% { /* 0.0s - 1.6s: Hidden */
            opacity: 0;
            transform: translate3d(0, 32px, -85px) rotateX(24deg) scale(0.92);
            clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
            filter: blur(4px);
            text-shadow: 0 0 0 transparent;
          }
          43.3% { /* ~1.95s: Digital construction slice reveal */
            opacity: 1;
            clip-path: polygon(0 0, 65% 0, 55% 100%, 0 100%);
            transform: translate3d(0, 12px, -35px) rotateX(10deg) scale(0.97);
            filter: blur(1px);
            text-shadow: 0 1px 0 #002266, 0 2px 0 #001b52, 0 6px 14px rgba(7, 87, 184, 0.22);
          }
          51.1% { /* 2.3s: Solid assembled 3D structure */
            opacity: 1;
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            transform: translate3d(0, 0, 0) rotateX(0deg) scale(1.0);
            filter: blur(0);
            text-shadow: 0 1px 0 #002266, 0 2px 0 #001b52, 0 4px 14px rgba(7, 87, 184, 0.16);
          }
          80.0% { /* 3.6s */
            opacity: 1;
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            transform: translate3d(0, 0, 0) rotateX(0deg) scale(1.0);
            filter: blur(0);
            text-shadow: 0 1px 0 #002266, 0 2px 0 #001b52, 0 4px 14px rgba(7, 87, 184, 0.16);
          }
          100% { /* 4.5s: Final stable typography */
            opacity: 1;
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            transform: translate3d(0, 0, 0) rotateX(0deg) scale(1.0);
            filter: blur(0);
            text-shadow: 0 1px 0 #002266, 0 2px 0 #001b52, 0 3px 10px rgba(7, 87, 184, 0.12);
          }
        }

        /* 2.3s - 2.9s: "Meets" Entrance - Elegant 3D transition */
        @keyframes animWordMeets {
          0%, 51.1% { /* 0.0s - 2.3s: Hidden */
            opacity: 0;
            transform: translate3d(0, 24px, -60px) rotateX(18deg);
            filter: blur(3px);
            text-shadow: 0 0 0 transparent;
          }
          64.4% { /* 2.9s: Settled in place beside Technology */
            opacity: 1;
            transform: translate3d(0, 0, 0) rotateX(0deg);
            filter: blur(0);
            text-shadow: 0 1px 0 #002266, 0 2px 0 #001b52, 0 4px 12px rgba(7, 87, 184, 0.16);
          }
          80.0% { /* 3.6s */
            opacity: 1;
            transform: translate3d(0, 0, 0) rotateX(0deg);
            filter: blur(0);
            text-shadow: 0 1px 0 #002266, 0 2px 0 #001b52, 0 4px 12px rgba(7, 87, 184, 0.16);
          }
          100% { /* 4.5s: Final stable */
            opacity: 1;
            transform: translate3d(0, 0, 0) rotateX(0deg);
            filter: blur(0);
            text-shadow: 0 1px 0 #002266, 0 2px 0 #001b52, 0 3px 10px rgba(7, 87, 184, 0.12);
          }
        }

        /* 2.9s - 3.6s: "Possibility" - Visual highlight, natural 3D expansion and gradient reveal */
        @keyframes animWordPossibility {
          0%, 64.4% { /* 0.0s - 2.9s: Hidden */
            opacity: 0;
            transform: translate3d(0, 30px, -70px) scale(0.92);
            filter: blur(6px) drop-shadow(0 0 0 transparent);
            letter-spacing: -0.02em;
          }
          80.0% { /* 3.6s: Expanded into prominent luminous position */
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1.0);
            filter: blur(0) drop-shadow(0 4px 18px rgba(147, 51, 234, 0.25));
            letter-spacing: normal;
          }
          100% { /* 4.5s: Settle cleanly into composition */
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1.0);
            filter: blur(0) drop-shadow(0 3px 14px rgba(147, 51, 234, 0.20));
            letter-spacing: normal;
          }
        }

        /* 3.6s - 4.5s: Final Combination Convergence */
        @keyframes headlineConvergence {
          0%, 80.0% {
            transform: scale(1.0);
          }
          90.0% {
            transform: scale(1.01);
          }
          100% {
            transform: scale(1.0);
          }
        }

        .hero-glow-anim {
          animation: techCenterGlow 4.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hero-datum-line {
          animation: techDatumLine 4.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hero-brackets-anim {
          animation: techBrackets 4.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hero-word-where {
          animation: animWordWhere 4.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity, filter;
        }
        .hero-word-technology {
          animation: animWordTechnology 4.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity, clip-path, filter;
        }
        .hero-word-meets {
          animation: animWordMeets 4.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity, filter;
        }
        .hero-word-possibility {
          animation: animWordPossibility 4.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity, filter;
        }
        .hero-headline-group {
          animation: headlineConvergence 4.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Post-4.5s Static Composition - Zero CPU/GPU paint cycles */
        .hero-intro-static .hero-glow-anim {
          animation: none !important;
          opacity: 0.25 !important;
          transform: translate(-50%, -50%) scale(1.0) !important;
        }
        .hero-intro-static .hero-datum-line {
          animation: none !important;
          opacity: 0.25 !important;
          transform: translate(-50%, -50%) scaleX(0.7) !important;
        }
        .hero-intro-static .hero-brackets-anim {
          animation: none !important;
          opacity: 0.15 !important;
          transform: scale(0.95) !important;
        }
        .hero-intro-static .hero-word-where,
        .hero-intro-static .hero-word-technology,
        .hero-intro-static .hero-word-meets {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
          filter: none !important;
          clip-path: none !important;
          text-shadow: 0 1px 0 #002266, 0 2px 0 #001b52, 0 3px 10px rgba(7, 87, 184, 0.12) !important;
        }
        .hero-intro-static .hero-word-possibility {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
          filter: drop-shadow(0 3px 14px rgba(147, 51, 234, 0.20)) !important;
        }
        .hero-intro-static .hero-headline-group {
          animation: none !important;
          transform: none !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-glow-anim,
          .hero-datum-line,
          .hero-brackets-anim,
          .hero-word-where,
          .hero-word-technology,
          .hero-word-meets,
          .hero-word-possibility,
          .hero-headline-group {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            clip-path: none !important;
            filter: none !important;
          }
        }
      `}</style>

      {/* HERO SECTION: SIDE-BY-SIDE LAYOUT */}
      <div className="relative w-full mb-16 pt-6 pb-12 overflow-hidden">

        {/* Hero Content Layer */}
        <div className="relative z-10">
          {/* Central main title / 3D Cinematic Intro Area */}
          <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center pt-4 pb-2 relative select-none hero-3d-stage ${heroIntroDone ? 'hero-intro-static' : ''}`}>
            
            {/* 0.0-0.8s: Subtle soft blue center glow */}
            <div
              className="hero-glow-anim absolute top-1/2 left-1/2 w-[380px] sm:w-[560px] md:w-[720px] h-[240px] sm:h-[320px] pointer-events-none rounded-full"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(7, 87, 184, 0.15) 0%, rgba(147, 51, 234, 0.05) 45%, rgba(248, 250, 252, 0) 75%)',
                zIndex: 0
              }}
            />

            {/* 0.0-0.8s: Technical precision datum line */}
            <div
              className="hero-datum-line absolute top-1/2 left-1/2 w-[280px] sm:w-[480px] md:w-[640px] h-[1px] pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(7, 87, 184, 0.35) 20%, rgba(7, 87, 184, 0.6) 50%, rgba(7, 87, 184, 0.35) 80%, transparent)',
                zIndex: 1
              }}
            />

            {/* Technical corner alignment brackets (Subtle engineering aesthetic) */}
            <div className="hero-brackets-anim absolute inset-x-8 sm:inset-x-16 md:inset-x-28 inset-y-0 pointer-events-none flex flex-col justify-between z-1">
              <div className="flex justify-between items-center text-[10px] font-mono text-blue-400/50 tracking-wider">
                <span className="inline-block border-t border-l border-blue-400/40 w-2.5 h-2.5"></span>
                <span className="hidden sm:inline-block opacity-40">SYS.ENGINEER // CORE.v4</span>
                <span className="inline-block border-t border-r border-blue-400/40 w-2.5 h-2.5"></span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-blue-400/50 tracking-wider">
                <span className="inline-block border-b border-l border-blue-400/40 w-2.5 h-2.5"></span>
                <span className="hidden sm:inline-block opacity-40">COORDINATE // 00:04:50</span>
                <span className="inline-block border-b border-r border-blue-400/40 w-2.5 h-2.5"></span>
              </div>
            </div>

            {/* Headline Group: 3D Typography */}
            <div className="hero-headline-group relative z-10 space-y-2 sm:space-y-3 py-2">
              {/* Line 1: Where Technology Meets */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-[#002D7A] flex items-center justify-center flex-wrap gap-x-3 gap-y-1">
                {/* 0.8-1.6s: Where */}
                <span className="hero-word-where inline-block">
                  Where
                </span>

                {/* 1.6-2.3s: Technology */}
                <span className="hero-word-technology inline-block">
                  Technology
                </span>

                {/* 2.3-2.9s: Meets */}
                <span className="hero-word-meets inline-block">
                  Meets
                </span>
              </h1>

              {/* Line 2: Possibility */}
              <div className="pt-0.5">
                <span className="hero-word-possibility inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight bg-gradient-to-r from-[#0757B8] via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Possibility
                </span>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center lg:items-end gap-6 w-full">
            {/* Left Column: Heading and description */}
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:pb-16">
              <div className="space-y-6 w-full flex flex-col items-center lg:items-start text-center lg:text-left">
                <h2 className="w-full text-slate-900 leading-tight tracking-tight flex flex-col items-center lg:items-start text-center lg:text-left">
                  <span className="block text-3xl sm:text-4xl lg:text-[54px] font-black text-slate-900 tracking-wide">
                    Unified Software for
                  </span>

                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-3xl sm:text-4xl lg:text-[48px] font-extrabold mt-1 lg:whitespace-nowrap whitespace-normal">
                    Connected Generation
                  </span>
                </h2>

                <p className="mt-2 text-slate-700 text-lg leading-9 text-center lg:text-left w-full max-w-4xl tracking-wide font-medium">
                  Beta builds secure, real-time corporate applications. SMTP mail threads,
                  live authentication protocols, and agile sprints under one dashboard.
                </p>
              </div>
            </div>

            {/* Right Column: Enterprise suite */}
            <div className="w-full lg:w-1/2 h-full flex flex-col justify-center text-left">
              <div className="glass-card bg-white/80 hover:bg-white/95 backdrop-blur-md border border-slate-200/90 p-4 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 w-full">
                <div className="border-b border-slate-100 pb-2.5 w-full mb-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                    Enterprise Suite
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
                  {/* Left Side inside Box: Styled BNX Showcase Card */}
                  <div className="lg:col-span-1 w-full h-72 text-center overflow-hidden relative select-none flex flex-col items-center justify-center bg-gradient-to-b from-blue-50/70 via-slate-50/50 to-indigo-50/40 border border-blue-100/80 rounded-2xl p-5">
                    <div className="relative z-10 flex flex-col items-center justify-center">
                      <div className="bg-white border border-blue-100 p-3.5 rounded-2xl shadow-xs mb-3 transition-transform duration-300 hover:scale-105">
                        <img src="/logo.png" alt="Beta Logo" className="h-16 w-auto object-contain select-none" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#004AAD]">
                        BETA Core Platform
                      </span>
                      <p className="text-xs text-slate-500 mt-1 font-medium">
                        Unified Business Ecosystem
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Vertical list of products (BNXmail and Cliks Business) */}
                  <div className="lg:col-span-1 flex flex-col gap-4 h-full justify-between items-stretch lg:border-l lg:border-slate-200/80 lg:pl-4">
                    {/* BNXmail */}
                    <a
                      href="https://www.bnxmail.com/login"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex flex-col justify-center p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/70 hover:bg-slate-100 transition-all duration-300 group cursor-pointer text-left gap-1"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                          <img src="/bnx_mail_logo.png" alt="BNX Mail" className="h-14 w-14 object-contain" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#004AAD] transition-colors duration-200">
                          BNXmail
                        </h4>
                      </div>
                      <p className="text-slate-500 text-xs font-medium leading-normal mt-0.5">
                        Real time mail, always <span className="whitespace-nowrap">in sync.</span> “Instant mail, Connected work.”
                      </p>
                    </a>

                    {/* Cliks Business */}
                    <a
                      href="https://www.cliksbusiness.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex flex-col justify-center p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/70 hover:bg-slate-100 transition-all duration-300 group cursor-pointer text-left gap-1"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                          <img src="/cliks_business_logo.png" alt="Cliks Business" className="h-12 w-12 object-contain" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#004AAD] transition-colors duration-200">
                          Cliks Business
                        </h4>
                      </div>
                      <p className="text-slate-500 text-xs font-medium leading-normal mt-0.5">
                        "Connecting businesses, creating opportunities, and enabling growth."
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: KEY FEATURES */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 text-center">
        <div className="max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#E9F4FF] border border-[#004AAD]/20 text-[#004AAD] text-xs font-semibold uppercase tracking-wider">
            <UserCheck className="h-3.5 w-3.5" />
            <span>Key Advantages</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">
            Engineered for High Performance
          </h2>
          <p className="text-slate-500 text-lg">
            A secure foundation optimized for modern companies that require high availability and compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card glass-card-hover p-8 rounded-3xl border border-slate-200 text-left flex flex-col items-start"
              >
                <div className={`p-3 rounded-2xl border mb-6 flex-shrink-0 ${feat.bg}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feat.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feat.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* SECTION 4: STATISTICS COUNTER */}
      <div className="relative z-0 w-full bg-[#004AAD] -mt-[220px] pt-[175px] pb-16 sm:pb-20 mb-24 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* SINGLE LARGE WHITE ROUNDED CONTAINER */}
          <div className="bg-white rounded-[28px] sm:rounded-[36px] shadow-sm py-10 px-6 sm:py-12 sm:px-10 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 items-center">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="text-center space-y-2 flex flex-col items-center justify-center py-2"
                  >
                    <div className="inline-flex p-3 bg-blue-50 rounded-2xl mb-2 border border-blue-100">
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className="text-3xl md:text-4xl font-extrabold text-[#004AAD]">{stat.value}</div>
                    <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>



      {/* SECTION: INNOVATION & PHILOSOPHY (PREMIUM 3D FLOATING SHOWCASE) */}
      <Philosophy3DShowcase />

      {/* SECTION: WHY CHOOSE OUR PRODUCTS */}
      <div className="w-full bg-[#EAF6FF] py-20 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#E9F4FF] border border-[#004AAD]/20 text-[#004AAD] text-xs font-semibold uppercase tracking-wider">
              <Award className="h-3.5 w-3.5" />
              <span>Product Highlights</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">
              Why Choose Our Products?
            </h2>
            <p className="text-slate-500 text-lg">
              Engineered for low-latency synchronization, enterprise-grade security, and seamless workflow integration.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            {/* Left Column: Visual Growth Roadmap */}
            <div className="lg:col-span-5 w-full">
              <div
                className="relative p-6 sm:p-7 rounded-3xl border border-[#D5E5F9]/80 shadow-[0_20px_50px_rgba(30,58,138,0.08)] overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #F7FBFF 0%, #EEF6FF 50%, #F5F1FF 100%)',
                }}
              >
                {/* Subtle soft bottom wave accent from the reference image */}
                <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden rounded-b-3xl pointer-events-none opacity-40">
                  <svg viewBox="0 0 500 120" preserveAspectRatio="none" className="w-full h-full">
                    <path d="M0,60 C150,110 320,20 500,75 L500,120 L0,120 Z" fill="url(#bottomWaveGrad)" />
                    <defs>
                      <linearGradient id="bottomWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                        <stop offset="60%" stopColor="#818cf8" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#c084fc" stopOpacity="0.5" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div className="relative z-10 space-y-5">
                  {/* Window Controls Header */}
                  <div className="flex items-center justify-between pb-1">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-[#FF5F56]" />
                      <div className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                      <div className="h-3 w-3 rounded-full bg-[#27C93F]" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">product_architecture.json</span>
                  </div>

                  {/* Pipeline visual steps */}
                  <div className="space-y-3.5">
                    {[
                      {
                        phase: 'Layer 1',
                        title: 'Secure SMTP & Real-Time Sync',
                        status: 'ACTIVE',
                        lineColor: 'bg-[#0088FF]',
                        dotColor: 'bg-emerald-500',
                        pillColor: 'text-emerald-600 bg-emerald-50 border border-emerald-200/60'
                      },
                      {
                        phase: 'Layer 2',
                        title: 'SSO & Multi-Factor Auth Gateway',
                        status: 'VERIFIED',
                        lineColor: 'bg-[#6366F1]',
                        dotColor: 'bg-blue-500',
                        pillColor: 'text-blue-600 bg-blue-50 border border-blue-200/60'
                      },
                      {
                        phase: 'Layer 3',
                        title: 'Live WebSocket Channels & Boards',
                        status: 'CONNECTED',
                        lineColor: 'bg-[#EC4899]',
                        dotColor: 'bg-pink-500',
                        pillColor: 'text-pink-600 bg-pink-50 border border-pink-200/60'
                      },
                      {
                        phase: 'Layer 4',
                        title: 'Centralized Scalable Workspace DB',
                        status: 'SYNCED',
                        lineColor: 'bg-[#F59E0B]',
                        dotColor: 'bg-amber-500',
                        pillColor: 'text-amber-600 bg-amber-50 border border-amber-200/60'
                      }
                    ].map((step, idx) => (
                      <motion.div
                        key={step.phase}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.12 }}
                        className="flex items-center justify-between p-3.5 rounded-2xl bg-white/80 hover:bg-white/95 backdrop-blur-sm border border-white/90 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-200"
                      >
                        <div className="flex items-center space-x-3 overflow-hidden mr-2">
                          <div className={`w-1 h-5 rounded-full ${step.lineColor} flex-shrink-0`} />
                          <span className="text-xs font-medium text-slate-400 w-12 flex-shrink-0">{step.phase}</span>
                          <span className="text-xs sm:text-sm font-bold text-slate-800 truncate">{step.title}</span>
                        </div>
                        <span className={`text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full flex items-center space-x-1.5 flex-shrink-0 ${step.pillColor}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${step.dotColor}`} />
                          <span>{step.status}</span>
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Key Benefits */}
            <div className="lg:col-span-7 space-y-4">
              {[
                {
                  title: 'Real-Time Collaboration',
                  desc: 'Sync team messages, sprint boards, and document revisions instantly across teams using optimized bi-directional WebSocket protocols.',
                  icon: Zap,
                  bg: 'bg-amber-50 text-amber-600 border-amber-100'
                },
                {
                  title: 'Enterprise Security & SSO',
                  desc: 'Protect corporate workloads with cryptographically signed JSON Web Tokens (JWT) and multi-factor validation flows.',
                  icon: Users,
                  bg: 'bg-blue-50 text-blue-600 border-blue-100'
                },
                {
                  title: 'High Availability Relays',
                  desc: 'Our BNX mail relays feature a 99.99% uptime SLA with active load balancers and robust queue managers.',
                  icon: Workflow,
                  bg: 'bg-emerald-50 text-emerald-600 border-emerald-100'
                },
                {
                  title: 'Centralized Workspaces',
                  desc: 'Consolidate your business toolchain. Seamlessly bridge email threads into sprint tasks or live discussion boards.',
                  icon: Award,
                  bg: 'bg-purple-50 text-purple-600 border-purple-100'
                }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="glass-card hover:bg-white/90 p-5 rounded-2xl border border-slate-200/80 flex items-start space-x-4 shadow-sm hover:shadow-md transition-all duration-300 group cursor-default"
                  >
                    <div className={`p-3 rounded-xl border flex-shrink-0 mt-0.5 transition-colors ${item.bg}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1 text-left">
                      <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-[#004AAD] transition-colors duration-200">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5: CUSTOMER TESTIMONIALS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 text-center">
        <div className="max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#E9F4FF] border border-[#004AAD]/20 text-[#004AAD] text-xs font-semibold uppercase tracking-wider">
            <Users className="h-3.5 w-3.5" />
            <span>Success Stories</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">
            Trusted by Innovation Leaders
          </h2>
          <p className="text-slate-500 text-lg">
            Hear from engineering and security leaders running critical corporate systems on our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((test, idx) => (
            <motion.div
              key={test.author}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card p-8 rounded-3xl border border-slate-200 text-left flex flex-col justify-between space-y-6 shadow-sm"
            >
              {/* Star rating */}
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-650 italic text-sm md:text-base leading-relaxed">
                "{test.quote}"
              </p>

              {/* User Info */}
              <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
                <div className={`h-11 w-11 rounded-full bg-gradient-to-tr ${test.gradient} flex items-center justify-center font-bold text-white text-sm shadow-sm`}>
                  {test.initials}
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">{test.author}</h4>
                  <p className="text-xs text-slate-500">{test.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SECTION 5.5: THE PRINCIPLES BEHIND EVERY PRODUCT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 text-center">
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-4 animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            The Principles Behind Every Product
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold">
            Discover the core foundations of performance, security, scaling, and simplicity that dictate our engineering standards.
          </p>
        </div>

        {/* CONTINUOUS HORIZONTAL MARQUEE (LEFT -> RIGHT) */}
        <div className="relative w-full overflow-hidden py-8 mb-12 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="marquee-track-lr flex items-center">
            {[...principlesMarquee, ...principlesMarquee].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`${item.title}-${idx}`}
                  className="flex items-center space-x-3.5 mx-8 flex-shrink-0 select-none cursor-default group"
                >
                  <div className={`h-11 w-11 rounded-2xl ${item.bg} border border-slate-200/80 flex items-center justify-center ${item.color} shadow-xs transition-transform duration-300 group-hover:scale-110 flex-shrink-0`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <span className="block text-sm sm:text-base font-extrabold text-slate-900 tracking-tight group-hover:text-[#004AAD] transition-colors whitespace-nowrap">
                      {item.title}
                    </span>
                    <span className="block text-xs text-slate-500 font-medium whitespace-nowrap">
                      {item.desc}
                    </span>
                  </div>
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-300 ml-8 flex-shrink-0" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 6: CALL TO ACTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="cta-colored-section animated-gradient-bg relative rounded-3xl p-8 sm:p-10 md:p-12 lg:p-14 border border-blue-500/20 overflow-hidden text-left shadow-2xl">
          {/* Decorative patterns */}
          <div className="absolute inset-0 bg-mesh-pattern bg-mesh opacity-10 pointer-events-none" />
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px] pointer-events-none" />

          {/* 2-Column Grid: Left Content (Unchanged) + Right Animated Ecosystem Visual */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            
            {/* Left Content (Unchanged) */}
            <div className="lg:col-span-6 xl:col-span-5 space-y-6">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Ready to Upgrade Your Corporate Software?
              </h2>
              <p className="text-slate-200 max-w-xl text-sm md:text-base">
                Unify your group mailbox, auth logs, dashboard notes, and project backlogs under one centralized and secure portal.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4 pt-4 sm:pt-6">
                <button
                  type="button"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold bg-white text-[#004AAD] cursor-pointer flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
                >
                  Browse Product Suites <span>→</span>
                </button>
                <Link
                  to="/support"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  Contact Support <span>→</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Unique Futuristic Software Ecosystem Animation */}
            <div className="lg:col-span-6 xl:col-span-7 flex items-center justify-center w-full overflow-hidden lg:overflow-visible pt-4 lg:pt-0">
              <CtaEcosystemVisual />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
