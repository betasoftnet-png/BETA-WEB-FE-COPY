import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Award,
  Sparkles,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
  Quote,
  Code2,
  Search,
  User,
  Users,
  MapPin,
  CheckSquare,
  FileText,
  SlidersHorizontal,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Share2,
  MoreHorizontal,
  AlertTriangle,
  Lightbulb,
  BookOpen,
  MessageSquare,
  Handshake,
  Target,
  TrendingUp,
  Shield,
  UserCheck
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import api from '../api';



const JOB_BOARD_API_BASE =
  import.meta.env.DEV ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8081'
    : 'https://apply.beta-softnet.com';

const benefits = [
  { emoji: '💰', title: 'Bonus', desc: 'Competitive base package with performance bonuses tied to milestones.' },
  { emoji: '📚', title: 'Learning', desc: 'Annual education grant of $2,000 for courses and tech conferences.' },
  { emoji: '✈️', title: 'Trips', desc: 'Distributed team offsites and engineering hackathons worldwide.' },
  { emoji: '🎯', title: 'Mentorship', desc: 'Regular syncs with domain architects and technical roadmap reviews.' }
];

const processSteps = [
  { id: '1', title: 'Application', desc: 'Profile & PDF resume upload', icon: FileText, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
  { id: '2', title: 'Assessment', desc: 'Initial evaluation test', icon: Code2, color: 'text-pink-400', bg: 'bg-pink-500/10 border-pink-500/20' },
  { id: '3', title: 'Technical interview', desc: 'Systems architecture alignment', icon: User, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  { id: '4', title: 'Task Assessment', desc: 'GitHub task and code review', icon: CheckSquare, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
  { id: '5', title: 'HR interview', desc: 'Culture fit & team alignment', icon: Users, color: 'text-pink-400', bg: 'bg-pink-500/10 border-pink-500/20' },
  { id: '6', title: 'Offer', desc: 'Final proposal discussions', icon: Award, color: 'text-[#F59E0B]', bg: 'bg-amber-500/10 border-amber-500/20' }
];

const companyValues = [
  {
    title: 'Innovation',
    desc: 'Pushing the boundaries of technology, thinking outside the box to solve complex software engineering challenges.',
    icon: Sparkles,
    color: 'text-amber-500',
    bg: 'bg-amber-50/70 border-amber-100/50',
    glow: 'hover:shadow-amber-500/10 hover:border-amber-300'
  },
  {
    title: 'Ownership',
    desc: 'Acting like founders. We take full responsibility for our code, our products, and our users\' satisfaction.',
    icon: Target,
    color: 'text-rose-500',
    bg: 'bg-rose-50/70 border-rose-100/50',
    glow: 'hover:shadow-rose-500/10 hover:border-rose-300'
  },
  {
    title: 'Integrity',
    desc: 'Operating with absolute transparency, honesty, and professional ethics in all internal and external relations.',
    icon: Shield,
    color: 'text-indigo-500',
    bg: 'bg-indigo-50/70 border-indigo-100/50',
    glow: 'hover:shadow-indigo-500/10 hover:border-indigo-300'
  },
  {
    title: 'Customer First',
    desc: 'Empathizing with our customers and prioritizing their success and experience above all else.',
    icon: UserCheck,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50/70 border-emerald-100/50',
    glow: 'hover:shadow-emerald-500/10 hover:border-emerald-300'
  },
  {
    title: 'Teamwork',
    desc: 'Collaborating seamlessly, supporting one another, and achieving great things together as one unified force.',
    icon: Handshake,
    color: 'text-sky-500',
    bg: 'bg-sky-50/70 border-sky-100/50',
    glow: 'hover:shadow-sky-500/10 hover:border-sky-300'
  },
  {
    title: 'Continuous Learning',
    desc: 'Fostering curiosity, embracing growth, and constantly refining our skills and knowledge.',
    icon: BookOpen,
    color: 'text-purple-500',
    bg: 'bg-purple-50/70 border-purple-100/50',
    glow: 'hover:shadow-purple-500/10 hover:border-purple-300'
  },
  {
    title: 'Excellence',
    desc: 'Committing to the highest standards of quality, precision, and craftsmanship in everything we design and build.',
    icon: Award,
    color: 'text-[#F59E0B]',
    bg: 'bg-amber-50/70 border-amber-200/50',
    glow: 'hover:shadow-amber-500/10 hover:border-amber-400'
  }
];
const mapStatusToUI = (status) => {
  if (!status) return 'Applied';
  const s = String(status).trim();
  const lower = s.toLowerCase();

  // Numeric status mappings: 1=Application, 2=Assessment, 3=Technical, 4=Task, 5=HR, 6=Offer
  if (lower === '1') return 'Applied';
  if (lower === '2') return 'Assessment Sent';
  if (lower === '3') return 'Technical Interview';
  if (lower === '4') return 'Task Assessment';
  if (lower === '5') return 'HR Interview';
  if (lower === '6') return 'Selected';

  if (lower === 'pending' || lower === 'applied' || lower === 'under review' || lower === 'candidates' || lower === 'candidate') return 'Applied';
  if (lower === 'shortlisted') return 'Shortlisted';
  if (lower === 'assessment sent' || lower === 'round 1 test' || lower === 'round 1 aptitude' || lower === 'aptitude') return 'Assessment Sent';
  if (lower === 'technical interview' || lower === 'interview scheduled' || lower === 'scheduled' || lower === 'technical') return 'Technical Interview';
  if (lower === 'task assessment' || lower === 'task assigned' || lower === 'task submitted' || lower === 'task') return 'Task Assessment';
  if (lower === 'hr interview' || lower === 'hr scheduled' || lower === 'hr round' || lower === 'hr') return 'HR Interview';
  if (lower === 'accepted' || lower === 'selected' || lower === 'approved' || lower === 'joined' || lower === 'offer sent') return 'Selected';
  if (lower === 'rejected') return 'Rejected';
  return s;
};

const formatDate = (isoString) => {
  if (!isoString) return '';
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return isoString;
  }
};

const AppliedTime = ({ timestamp }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const parseLocalDateTime = (dateStr) => {
      if (!dateStr) return null;
      try {
        if (typeof dateStr !== 'string') {
          const d = new Date(dateStr);
          return isNaN(d.getTime()) ? null : d;
        }
        if (dateStr.includes('Z') || /[+-]\d{2}:?\d{2}$/.test(dateStr)) {
          const d = new Date(dateStr);
          return isNaN(d.getTime()) ? null : d;
        }
        let isoStr = dateStr.trim().replace(' ', 'T');
        const match = isoStr.match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2}))?/);
        if (match) {
          const year = parseInt(match[1], 10);
          const month = parseInt(match[2], 10) - 1;
          const day = parseInt(match[3], 10);
          const hour = match[4] ? parseInt(match[4], 10) : 0;
          const minute = match[5] ? parseInt(match[5], 10) : 0;
          const second = match[6] ? parseInt(match[6], 10) : 0;
          return new Date(year, month, day, hour, minute, second);
        }
        const d = new Date(isoStr);
        return isNaN(d.getTime()) ? null : d;
      } catch (e) {
        return null;
      }
    };

    const calculateTimeAgo = () => {
      if (!timestamp) return '';
      try {
        const date = parseLocalDateTime(timestamp);
        if (!date) return 'Applied';
        const now = new Date();
        const diffMs = now - date;
        // Guard against future clock skew
        if (diffMs < 0) return 'Applied just now';
        const diffSecs = Math.floor(diffMs / 1000);
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffSecs < 30) {
          return 'Applied just now';
        }
        if (diffSecs < 60) {
          return 'Applied less than a minute ago';
        }
        if (diffMins < 60) {
          return `Applied ${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
        }
        if (diffHours < 24) {
          return `Applied ${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
        }
        if (diffDays < 7) {
          return `Applied ${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
        }
        const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        return `Applied on ${formattedDate} at ${formattedTime}`;
      } catch {
        return 'Applied';
      }
    };

    setTimeAgo(calculateTimeAgo());

    const interval = setInterval(() => {
      setTimeAgo(calculateTimeAgo());
    }, 60000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return <span>{timeAgo || 'Applied'}</span>;
};

// Data for What We Look For / Our Culture 3x2 Grid
const whatWeLookForCards = [
  {
    id: 'problem-solver',
    titlePrimary: 'Problem',
    titleAccent: 'Solver',
    desc: 'Think critically and find smart solutions.',
    icon: Lightbulb,
    bgImage: '/culture/problem_solver.jpg',
    overlay: 'bg-gradient-to-r from-black/92 via-black/65 to-black/30',
    iconColor: 'text-amber-400',
    iconBadgeBg: 'bg-amber-400/15 border-amber-400/30',
    accentColor: 'text-amber-300',
    btnBorder: 'border-amber-400/60 text-amber-300 group-hover:bg-amber-500/20'
  },
  {
    id: 'continuous-learner',
    titlePrimary: 'Continuous',
    titleAccent: 'Learner',
    desc: 'Curious to explore new technologies and improve daily.',
    icon: BookOpen,
    bgImage: '/culture/continuous_learner.jpg',
    overlay: 'bg-gradient-to-r from-[#03152E]/94 via-[#06244C]/70 to-[#06244C]/30',
    iconColor: 'text-sky-400',
    iconBadgeBg: 'bg-sky-400/15 border-sky-400/30',
    accentColor: 'text-sky-300',
    btnBorder: 'border-sky-400/60 text-sky-300 group-hover:bg-sky-500/20'
  },
  {
    id: 'great-communicator',
    titlePrimary: 'Great',
    titleAccent: 'Communicator',
    desc: 'Share ideas and communicate clearly.',
    icon: MessageSquare,
    bgImage: '/culture/great_communicator.jpg',
    overlay: 'bg-gradient-to-r from-[#03201B]/94 via-[#06382E]/70 to-[#06382E]/30',
    iconColor: 'text-emerald-400',
    iconBadgeBg: 'bg-emerald-400/15 border-emerald-400/30',
    accentColor: 'text-emerald-300',
    btnBorder: 'border-emerald-400/60 text-emerald-300 group-hover:bg-emerald-500/20'
  },
  {
    id: 'team-player',
    titlePrimary: 'Team',
    titleAccent: 'Player',
    desc: 'Collaborate with others to build better products.',
    icon: Handshake,
    bgImage: '/culture/team_player.jpg',
    overlay: 'bg-gradient-to-r from-[#290715]/94 via-[#3D0A20]/70 to-[#3D0A20]/30',
    iconColor: 'text-rose-400',
    iconBadgeBg: 'bg-rose-400/15 border-rose-400/30',
    accentColor: 'text-rose-300',
    btnBorder: 'border-rose-400/60 text-rose-300 group-hover:bg-rose-500/20'
  },
  {
    id: 'ownership',
    titlePrimary: 'Ownership',
    titleAccent: '',
    desc: 'Take responsibility and deliver with confidence.',
    icon: Target,
    bgImage: '/culture/ownership.jpg',
    overlay: 'bg-gradient-to-r from-[#2B1003]/94 via-[#421905]/70 to-[#421905]/30',
    iconColor: 'text-orange-400',
    iconBadgeBg: 'bg-orange-400/15 border-orange-400/30',
    accentColor: 'text-orange-300',
    btnBorder: 'border-orange-400/60 text-orange-300 group-hover:bg-orange-500/20'
  },
  {
    id: 'growth-mindset',
    titlePrimary: 'Growth',
    titleAccent: 'Mindset',
    desc: 'Always improving skills and knowledge.',
    icon: TrendingUp,
    bgImage: '/culture/growth_mindset.jpg',
    overlay: 'bg-gradient-to-r from-[#170529]/94 via-[#250942]/70 to-[#250942]/30',
    iconColor: 'text-purple-400',
    iconBadgeBg: 'bg-purple-400/15 border-purple-400/30',
    accentColor: 'text-purple-300',
    btnBorder: 'border-purple-400/60 text-purple-300 group-hover:bg-purple-500/20'
  }
];

function WhatWeLookForCardsGrid() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {whatWeLookForCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.id}
              className="relative overflow-hidden rounded-[28px] md:rounded-[32px] min-h-[360px] md:min-h-[400px] p-7 md:p-8 flex flex-col justify-between group transition-all duration-500 hover:scale-[1.015] hover:shadow-[0_24px_50px_rgba(0,0,0,0.35)] border border-white/10 shadow-lg text-left"
            >
              {/* Background Photographic Visual */}
              <img
                src={card.bgImage}
                alt={`${card.titlePrimary} ${card.titleAccent || ''}`}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
              />

              {/* Tinted Protective Gradient Overlay */}
              <div className={`absolute inset-0 ${card.overlay} pointer-events-none`} />

              {/* Top Section: Glowing Icon Badge */}
              <div className="relative z-10">
                <div
                  className={`w-14 h-14 rounded-2xl ${card.iconBadgeBg} border backdrop-blur-md flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105`}
                >
                  <IconComponent className={`w-6 h-6 ${card.iconColor}`} />
                </div>
              </div>

              {/* Bottom Section: Title, Description, and Circular Arrow Action */}
              <div className="relative z-10 space-y-4 text-[#FFFFFF]">
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-black text-[#FFFFFF] tracking-tight font-['Plus_Jakarta_Sans',sans-serif] flex flex-wrap items-baseline gap-2">
                    <span className="text-[#FFFFFF] !text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">{card.titlePrimary}</span>
                    {card.titleAccent && (
                      <span className={`font-['Caveat',cursive] text-3xl md:text-4xl font-bold ${card.accentColor} -rotate-1 tracking-normal inline-block drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]`}>
                        {card.titleAccent}
                      </span>
                    )}
                  </h3>
                  <p className="text-[#FFFFFF] !text-white text-sm md:text-[15px] font-medium leading-relaxed max-w-[280px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-2">
                  <div
                    className={`w-10 h-10 rounded-full border ${card.btnBorder} bg-black/20 backdrop-blur-xs flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm cursor-pointer`}
                  >
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// React Bits Vertical Stacked Card Scroll Deck for Our Culture / Values
function OurValuesScrollStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartY = useRef(null);
  const isDragging = useRef(false);
  const dragStartY = useRef(0);
  const lastInteractionTime = useRef(0);
  const total = companyValues.length; // 7

  const nextCard = React.useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevCard = React.useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const triggerNext = React.useCallback(() => {
    const now = Date.now();
    if (now - lastInteractionTime.current < 700) return;
    lastInteractionTime.current = now;
    nextCard();
  }, [nextCard]);

  const triggerPrev = React.useCallback(() => {
    const now = Date.now();
    if (now - lastInteractionTime.current < 700) return;
    lastInteractionTime.current = now;
    prevCard();
  }, [prevCard]);

  // Continuous automatic card transition every 3 seconds
  // Temporarily paused when hovered or during manual interaction; resumes after 3s of inactivity
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      if (Date.now() - lastInteractionTime.current >= 2900) {
        nextCard();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, nextCard]);

  // Touch swipe handlers (Mobile)
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartY.current === null) return;
    const endY = e.changedTouches[0].clientY;
    const delta = touchStartY.current - endY;
    if (delta > 35) {
      triggerNext(); // Swiped up -> next card
    } else if (delta < -35) {
      triggerPrev(); // Swiped down -> prev card
    }
    touchStartY.current = null;
  };

  // Mouse drag handlers (Desktop)
  const handleMouseDown = (e) => {
    isDragging.current = true;
    dragStartY.current = e.clientY;
  };

  const handleMouseUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const delta = dragStartY.current - e.clientY;
    if (delta > 35) {
      triggerNext();
    } else if (delta < -35) {
      triggerPrev();
    }
  };

  // Mouse wheel & trackpad scroll handler (debounced to prevent skipping)
  const handleWheel = (e) => {
    if (Math.abs(e.deltaY) < 18) return;
    if (e.deltaY > 0) {
      triggerNext();
    } else {
      triggerPrev();
    }
  };

  return (
    <div
      className="relative w-full py-6 sm:py-10 select-none flex flex-col items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        isDragging.current = false;
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* Background Soft Ambient Light */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="absolute -left-12 top-1/4 w-80 h-80 rounded-full bg-purple-100/25 blur-3xl" />
        <div className="absolute -right-12 bottom-1/4 w-96 h-96 rounded-full bg-sky-100/30 blur-3xl" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-50/25 blur-[120px]" />
      </div>

      {/* Main Stack Deck Container — Centered, responsive: desktop 650–850px, tablet proportional, mobile full */}
      <div className="relative w-full max-w-[92vw] sm:max-w-[85vw] md:max-w-[740px] lg:max-w-[820px] h-[460px] sm:h-[480px] md:h-[500px] flex items-center justify-center">
        {companyValues.map((val, idx) => {
          const order = (idx - activeIndex + total) % total;
          const isActive = order === 0;
          const Icon = val.icon;

          // Realistic depth calculations for stacked cards:
          // Front card (order 0) is lowest and largest.
          // Cards 1, 2, 3 stack upward behind it, each slightly higher, smaller, and lower opacity.
          let translateY = 0;
          let scale = 1;
          let opacity = 1;
          let blur = 0;
          let zIndex = 10;
          let pointerEvents = 'none';

          if (order === 0) {
            // Front active card: large, prominent, sharp
            translateY = 60;
            scale = 1.0;
            opacity = 1;
            blur = 0;
            zIndex = 35;
            pointerEvents = 'auto';
          } else if (order === 1) {
            // 2nd card: directly behind active, slightly smaller, header/title tab clearly peeking above
            translateY = 8;
            scale = 0.94;
            opacity = 0.92;
            blur = 0;
            zIndex = 28;
            pointerEvents = 'auto';
          } else if (order === 2) {
            // 3rd card: behind 2nd card, further up
            translateY = -40;
            scale = 0.88;
            opacity = 0.70;
            blur = 0.6;
            zIndex = 22;
            pointerEvents = 'auto';
          } else if (order === 3) {
            // 4th card: far back
            translateY = -82;
            scale = 0.82;
            opacity = 0.42;
            blur = 1.8;
            zIndex = 16;
          } else if (order === 4) {
            // 5th card: very far back
            translateY = -118;
            scale = 0.76;
            opacity = 0.18;
            blur = 3.2;
            zIndex = 10;
          } else if (order === 6) {
            // Exiting card that was previously active — smoothly glides upward, dissolves into back
            translateY = -165;
            scale = 0.82;
            opacity = 0;
            blur = 4;
            zIndex = 40;
          } else {
            // Hidden in back
            translateY = -135;
            scale = 0.72;
            opacity = 0;
            blur = 5;
            zIndex = 2;
          }

          return (
            <motion.div
              key={val.title}
              onClick={() => {
                if (order === 1) triggerNext();
                else if (order === 2) {
                  lastInteractionTime.current = Date.now();
                  setActiveIndex((prev) => (prev + 2) % total);
                }
              }}
              animate={{
                y: translateY,
                scale,
                opacity,
                filter: `blur(${blur}px)`,
                zIndex
              }}
              transition={{
                duration: 0.95,
                ease: [0.25, 1, 0.5, 1]
              }}
              style={{ pointerEvents }}
              className="absolute w-full origin-center cursor-grab active:cursor-grabbing"
            >
              <div
                className={`relative w-full bg-white rounded-[26px] sm:rounded-[32px] md:rounded-[36px] p-6 sm:p-8 md:p-10 text-left overflow-hidden transition-shadow duration-500 flex flex-col justify-between min-h-[240px] sm:min-h-[260px] md:min-h-[280px] ${
                  isActive
                    ? 'border-2 border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08),0_0_0_1px_rgba(255,255,255,0.9)_inset]'
                    : 'border border-slate-200/70 shadow-[0_10px_32px_-10px_rgba(0,0,0,0.05)]'
                }`}
              >
                {/* Subtle Organic Background Corner Glow */}
                <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-gradient-to-tl from-slate-100/60 to-transparent pointer-events-none" />

                {/* Card Top Row: Icon Container + Title + Step Counter */}
                {/* Positioned at the very top so when stacked behind, the icon and title are visible tabs */}
                <div className="flex items-center justify-between relative z-10 gap-3">
                  <div className="flex items-center space-x-3.5 sm:space-x-4 min-w-0">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl md:rounded-[20px] border flex items-center justify-center shadow-sm shrink-0 transition-transform duration-300 ${val.bg} ${
                        isActive ? 'scale-105 shadow-md' : ''
                      }`}
                    >
                      <Icon className={`h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 ${val.color}`} />
                    </div>

                    <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug truncate">
                      {val.title}
                    </h3>
                  </div>

                  <span className="text-xs sm:text-sm font-bold tracking-widest text-slate-400 uppercase bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200/60 shrink-0">
                    0{idx + 1} / 07
                  </span>
                </div>

                {/* Card Body: Description */}
                <div className="mt-5 sm:mt-6 relative z-10 pr-2">
                  <p className="text-sm sm:text-base md:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
                    {val.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function Careers() {
  const navigate = useNavigate();
  const { user, redirectToSSO } = useContext(AuthContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const candidateToken = queryParams.get('token');
  const candidateId = candidateToken || queryParams.get('id');
  const isTaskAssessmentRoute = location.pathname.startsWith('/careers/task-assessment') || ((location.pathname === '/careers' || location.pathname === '/careers/') && candidateId);
  const isSavedJobsRoute = location.pathname.startsWith('/careers/saved-jobs');

  const [taskData, setTaskData] = useState(null);
  const [loadingTask, setLoadingTask] = useState(false);
  const [taskError, setTaskError] = useState('');
  const [gitLinkInput, setGitLinkInput] = useState('');
  const [submittingTask, setSubmittingTask] = useState(false);
  const [taskSubmitSuccess, setTaskSubmitSuccess] = useState(false);

  useEffect(() => {
    if (isTaskAssessmentRoute && candidateId) {
      const fetchTask = async () => {
        setLoadingTask(true);
        setTaskError('');
        try {
          const res = await axios.get(`${JOB_BOARD_API_BASE}/api/task-assessment/${candidateId}`);
          setTaskData(res.data);
          if (res.data?.candidate?.githubLink) {
            setGitLinkInput(res.data.candidate.githubLink);
          }
        } catch (err) {
          console.error(err);
          setTaskError('No task assessment found for this candidate, or the link is invalid.');
        } finally {
          setLoadingTask(false);
        }
      };
      fetchTask();
    }
  }, [isTaskAssessmentRoute, candidateId]);

  useEffect(() => {
    setJobsPage(1);
  }, [location.pathname]);

  useEffect(() => {
    if (isSavedJobsRoute && !user) {
      setShowLoginPrompt(true);
    }
  }, [isSavedJobsRoute, user]);

  const handleTaskSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!gitLinkInput.trim() || !candidateId) return;

    setSubmittingTask(true);
    setTaskError('');
    try {
      await axios.post(
        `${JOB_BOARD_API_BASE}/api/task-assessment/${candidateId}/submit`,
        { githubLink: gitLinkInput.trim() }
      );
      setTaskSubmitSuccess(true);
      const res = await axios.get(`${JOB_BOARD_API_BASE}/api/task-assessment/${candidateId}`);
      setTaskData(res.data);
    } catch (err) {
      console.error(err);
      setTaskError('Failed to submit GitHub repository. Please verify the link and try again.');
    } finally {
      setSubmittingTask(false);
    }
  };

  const [jobsList, setJobsList] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [jobsError, setJobsError] = useState('');

  const [selectedJob, setSelectedJob] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState('Fresher / 0-1 Years');
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState(null);
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  const [shouldSchedule, setShouldSchedule] = useState(false);

  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  // Live Job Search & Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // My Jobs Applications Tracking State
  const [showMyJobs, setShowMyJobs] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [myJobsLoading, setMyJobsLoading] = useState(false);
  const [myJobsError, setMyJobsError] = useState('');
  const [userApplications, setUserApplications] = useState([]);

  // Save, Share, Report states & handlers
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      if (user?.email) {
        try {
          const res = await axios.get(`${JOB_BOARD_API_BASE}/api/liked-jobs?email=${encodeURIComponent(user.email)}`);
          const ids = res.data.map(item => item.jobId);
          setSavedJobs(ids);
        } catch (err) {
          console.error('Failed to fetch saved jobs from backend:', err);
        }
        fetchUserApplications();
      } else {
        setSavedJobs([]);
        setUserApplications([]);
      }
    };
    fetchSavedJobs();
  }, [user]);

  const [activeReportJobId, setActiveReportJobId] = useState(null);

  const handleSaveJob = async (jobId) => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    const isSaved = savedJobs.some(id => Number(id) === Number(jobId));
    try {
      if (isSaved) {
        await axios.delete(`${JOB_BOARD_API_BASE}/api/liked-jobs?email=${encodeURIComponent(user.email)}&jobId=${jobId}`);
        setSavedJobs(prev => prev.filter(id => Number(id) !== Number(jobId)));
      } else {
        await axios.post(`${JOB_BOARD_API_BASE}/api/liked-jobs`, {
          email: user.email,
          jobId: jobId
        });
        setSavedJobs(prev => {
          if (prev.some(id => Number(id) === Number(jobId))) return prev;
          return [...prev, jobId];
        });
        // Navigate to the Saved Jobs page/section immediately
        navigate('/careers/saved-jobs');
        setShowMyJobs(false);
      }
    } catch (err) {
      console.error('Failed to update saved job on backend:', err);
    }
  };

  const handleSavedJobsClick = () => {
    if (!user) {
      setShowLoginPrompt(true);
    } else {
      navigate('/careers/saved-jobs');
      // If candidate workspace is active (showMyJobs is true), switch back to search-roles view
      setShowMyJobs(false);
      setTimeout(() => {
        document.getElementById('search-roles')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleShareJob = (job) => {
    const shareUrl = `https://www.beta-softnet.com/share/jobs/${job.id}`;
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        alert(`Link to share "${job.title}" copied to clipboard!`);
      })
      .catch(() => {
        alert(`Failed to copy share link.`);
      });
  };

  const handleToggleReportMenu = (jobId) => {
    setActiveReportJobId(prev => prev === jobId ? null : jobId);
  };

  const handleReportJob = async (job) => {
    setActiveReportJobId(null);
    const reason = prompt(`Please enter your reason for reporting the "${job.title}" job posting:`);
    if (reason && reason.trim()) {
      try {
        const userEmail = user ? (user.email || user.username || '') : 'anonymous@visitor.com';
        const candidateName = user ? (user.fullName || 'Anonymous') : 'Anonymous';
        // Locate candidate application if one exists for this job, else use null/temp identifier
        const userApp = userApplications.find(app => String(app.jobId) === String(job.id));
        const candidateId = userApp ? userApp.id : (user ? Date.now() : null);

        await axios.post(`${JOB_BOARD_API_BASE}/api/reports`, {
          candidateId,
          jobId: job.id,
          candidateName,
          email: userEmail,
          message: reason.trim(),
          status: 'PENDING'
        });
        alert(`Thank you for your report. Our recruitment compliance team will investigate this job posting.`);
      } catch (err) {
        console.error('Failed to submit job report to backend:', err);
        alert(`Thank you for your report. Our recruitment compliance team will investigate this job posting.`);
      }
    }
  };

  const [expandedJobDescs, setExpandedJobDescs] = useState({});
  const toggleJobDesc = (jobId) => {
    setExpandedJobDescs(prev => ({
      ...prev,
      [jobId]: !prev[jobId]
    }));
  };

  // GitHub task submission state
  const [gitLinks, setGitLinks] = useState({});
  const [submittingGit, setSubmittingGit] = useState({});
  const [gitErrors, setGitErrors] = useState({});

  const handleSubmittingGit = async (appId) => {
    const link = gitLinks[appId];
    if (!link || !link.trim()) return;

    setSubmittingGit(prev => ({ ...prev, [appId]: true }));
    setGitErrors(prev => ({ ...prev, [appId]: '' }));

    try {
      await axios.put(
        `${JOB_BOARD_API_BASE}/api/jobs/applications/${appId}/github?githubLink=${encodeURIComponent(link.trim())}`
      );
      // Refresh applications list
      await fetchUserApplications();
    } catch (err) {
      console.error('Error submitting GitHub link:', err);
      const msg = err.response?.data?.message || err.response?.data || 'Failed to submit GitHub link. Please check the URL and try again.';
      setGitErrors(prev => ({ ...prev, [appId]: typeof msg === 'string' ? msg : JSON.stringify(msg) }));
    } finally {
      setSubmittingGit(prev => ({ ...prev, [appId]: false }));
    }
  };

  // Extract unique filter options dynamically from jobsList
  const teams = Array.from(new Set(jobsList.map(job => job.team).filter(Boolean)));
  const locations = Array.from(new Set([...jobsList.map(job => job.location).filter(Boolean), 'Tiruvallur', 'Vellore']));
  const types = Array.from(new Set(jobsList.map(job => job.type).filter(Boolean)));

  // Fetch active job openings from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setJobsError('');
        const response = await axios.get(`${JOB_BOARD_API_BASE}/api/jobs`);
        const data = response.data.data || response.data || [];
        const fetched = data.map((job) => ({
          ...job,
          location: job.location || 'Remote',
          team: job.department || job.team || 'Engineering',
          experience: job.experience || '2+ Years',
          skills: Array.isArray(job.skills) ? job.skills : []
        }));
        if (fetched.length > 0) {
          setJobsList(fetched);
        }
      } catch (err) {
        console.error('Error fetching jobs silently:', err);
      }
    };
    fetchJobs();
  }, []);

  // Pre-populate fullName and email when user is logged in
  useEffect(() => {
    if (user) {
      const computedName = user.fullName || [user.firstName, user.lastName].filter(Boolean).join(' ') || localStorage.getItem('beta_fullName') || '';
      setFullName(computedName);
      setEmail(user.email || localStorage.getItem('beta_email') || user.username || '');
    } else {
      setFullName('');
      setEmail('');
    }
  }, [user]);

  // Reset form when selectedJob changes
  useEffect(() => {
    if (!selectedJob) {
      setPhone('');
      setExperience('Fresher / 0-1 Years');
      setCoverLetter('');
      setResume(null);
      setStatus('idle');
      setMessage('');
      setInterviewDate('');
      setInterviewTime('');
      setShouldSchedule(false);
    }
  }, [selectedJob]);


  const [jobsPage, setJobsPage] = useState(1);
  const [myJobsPage, setMyJobsPage] = useState(1);

  // Reset pagination on filter change
  useEffect(() => {
    setJobsPage(1);
  }, [searchQuery, selectedTeam, selectedLocation, selectedType]);

  // Reset my jobs pagination when applications reload or view toggled
  useEffect(() => {
    setMyJobsPage(1);
  }, [userApplications.length, showMyJobs]);

  // Auto-select job from URL query parameter (e.g. ?job=5) or switch to My Jobs view
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const jobId = params.get('job');
    if (jobId && jobsList.length > 0) {
      const match = jobsList.find(j => String(j.id) === String(jobId));
      if (match) {
        setSelectedJob(match);
      }
    }
    if (params.get('view') === 'my-jobs' || params.get('tab') === 'my-jobs') {
      setShowMyJobs(true);
      setSelectedJob(null); // Clear selected job details view if open
    }
  }, [jobsList, location.search]);

  // Filter logic
  const filteredJobs = jobsList.filter(job => {
    const matchesSearch = !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.skills && job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      (job.team && job.team.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTeam = !selectedTeam || job.team === selectedTeam;
    const matchesLocation = !selectedLocation || job.location === selectedLocation;
    const matchesType = !selectedType || job.type === selectedType;

    return matchesSearch && matchesTeam && matchesLocation && matchesType;
  });

  const displayedJobs = isSavedJobsRoute
    ? filteredJobs.filter(job => savedJobs.some(id => Number(id) === Number(job.id)))
    : filteredJobs;

  const jobsPerPage = 3;
  const indexOfLastJob = jobsPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = displayedJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalJobsPages = Math.ceil(displayedJobs.length / jobsPerPage);

  const myJobsPerPage = 3;
  const indexOfLastMyJob = myJobsPage * myJobsPerPage;
  const indexOfFirstMyJob = indexOfLastMyJob - myJobsPerPage;
  const currentMyJobs = userApplications.slice(indexOfFirstMyJob, indexOfLastMyJob);
  const totalMyJobsPages = Math.ceil(userApplications.length / myJobsPerPage);

  const handleApply = async (e, jobOverride = null) => {
    e.preventDefault();

    const activeJob = jobOverride || selectedJob;

    // Debug logs
    console.log("Active Job:", activeJob);
    console.log("Job ID:", activeJob?.id);

    if (!fullName || !email || !phone || !resume || !activeJob) {
      console.log("Validation failed");
      return;
    }

    if (phone.replace(/\D/g, '').length !== 10) {
      setStatus("error");
      setMessage("Phone number must be exactly 10 digits.");
      return;
    }

    // Check for duplicate application locally
    const emailToCheck = email.trim().toLowerCase();
    const jobIdToCheck = activeJob.id;

    let localApps = [];
    try {
      const stored = localStorage.getItem('beta_applications');
      localApps = stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error('Local storage read failed:', err);
    }

    const hasAppliedLocally = localApps.some(app =>
      (app.email || '').toLowerCase() === emailToCheck &&
      Number(app.jobId) === Number(jobIdToCheck)
    );

    const hasAppliedInState = userApplications.some(app =>
      (app.email || '').toLowerCase() === emailToCheck &&
      Number(app.jobId) === Number(jobIdToCheck)
    );

    if (hasAppliedLocally || hasAppliedInState) {
      setStatus("error");
      setMessage("You have already applied for this job using this email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    const formData = new FormData();
    formData.append("jobId", activeJob.id);
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("experience", experience);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("interviewDate", shouldSchedule ? interviewDate : "");
    formData.append("interviewTime", shouldSchedule ? interviewTime : "");

    // Print all FormData values
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await axios.post(
        `${JOB_BOARD_API_BASE}/api/jobs/apply`,
        formData
      );

      console.log("Success:", response.data);
      setStatus("success");
      setMessage(response.data?.message || "Your application was submitted successfully!");
      localStorage.setItem('candidateEmail', email.trim().toLowerCase());

      // Save locally to track in Candidate Workspace / My Jobs
      const newApp = {
        id: response.data?.id || response.data?.data?.id || `local-${Date.now()}`,
        fullName,
        email,
        phone,
        experience: experience || activeJob.experience || 'Fresher / 0-1 Years',
        coverLetter,
        resumeUrl: resume ? resume.name : '',
        status: shouldSchedule && interviewDate ? 'Interview Scheduled' : 'Applied',
        createdAt: new Date().toISOString(),
        appliedDate: new Date().toISOString(),
        appliedTime: new Date().toISOString(),
        jobTitle: activeJob.title,
        jobDepartment: activeJob.team || 'Engineering',
        jobLocation: activeJob.location || 'Tiruvallur',
        interviewDate: shouldSchedule ? interviewDate : '',
        interviewTime: shouldSchedule ? interviewTime : '',
        experience: activeJob.experience || '3 Years',
        jobId: activeJob.id
      };

      try {
        const stored = localStorage.getItem('beta_applications');
        const currentLocal = stored ? JSON.parse(stored) : [];
        currentLocal.push(newApp);
        localStorage.setItem('beta_applications', JSON.stringify(currentLocal));
      } catch (err) {
        console.error('Error saving local application backup:', err);
      }

      // Refresh applications list dynamically
      fetchUserApplications();

    } catch (error) {
      console.error("Error:", error);
      console.error("Response:", error.response);
      console.error("Data:", error.response?.data);

      setStatus("error");
      const errData = error.response?.data;
      let errMsg = "Failed to submit application.";
      if (errData) {
        if (typeof errData === 'string') {
          errMsg = errData;
        } else if (typeof errData === 'object') {
          errMsg = errData.message || errData.error || JSON.stringify(errData);
        }
      } else {
        errMsg = error.message || errMsg;
      }
      setMessage(errMsg);
    }
  };

  async function fetchUserApplications() {
    if (!user) return;
    setMyJobsLoading(true);
    setMyJobsError('');
    try {
      const userEmail = (user.email || user.username || '').toLowerCase();
      let apiApps = [];
      try {
        const response = await axios.get(`${JOB_BOARD_API_BASE}/api/jobs/my-applications?email=${encodeURIComponent(userEmail)}`);
        apiApps = response.data?.data || response.data || [];
        console.log('[Careers TRACE] Raw API Response for my-applications:', response.data);
      } catch (err) {
        console.error('API /api/jobs/my-applications failed:', err);
      }

      // Load local storage apps
      let localApps = [];
      try {
        const stored = localStorage.getItem('beta_applications');
        localApps = stored ? JSON.parse(stored) : [];
      } catch (err) {
        console.error('Local storage read failed:', err);
      }

      const apiFiltered = apiApps.filter(
        (app) => (app.email || '').toLowerCase() === userEmail
      );
      const localFiltered = localApps.filter(
        (app) => (app.email || '').toLowerCase() === userEmail
      );

      const mergedApps = [];
      const seenIds = new Set();
      const seenJobKeys = new Set();

      // Normalize API apps and match with local storage
      apiFiltered.forEach((app) => {
        console.log('[Careers TRACE] Pre-mapped application status from backend:', { id: app.id, status: app.status });
        const normalized = {
          id: app.id,
          fullName: app.fullName || app.fullname || '',
          email: app.email || '',
          phone: app.phone || '',
          resume: app.resume || app.resumeUrl || app.resumeurl || '',
          resumeUrl: app.resumeUrl || app.resumeurl || (app.resume ? (app.resume.startsWith('http') || app.resume.startsWith('/') ? app.resume : `${JOB_BOARD_API_BASE}/uploads/${encodeURIComponent(app.resume)}`) : ''),
          coverLetter: app.coverLetter || app.coverletter || '',
          status: mapStatusToUI(app.status),
          createdAt: app.createdAt || app.createdat || '',
          appliedDate: app.appliedDate || app.applieddate || app.createdAt || app.createdat || '',
          jobTitle: app.jobTitle || app.jobtitle || '',
          jobDepartment: app.jobDepartment || app.jobdepartment || '',
          jobLocation: app.jobLocation || app.joblocation || '',
          interviewDate: app.interviewDate || app.interviewdate || '',
          interviewTime: app.interviewTime || app.interviewtime || '',
          interviewLink: app.interviewLink || app.interviewlink || '',
          aptitudeStatus: app.aptitudeStatus || app.aptitudestatus || '',
          aptitudeScore: app.aptitudeScore || app.aptitudescore || '',
          experience: app.experience || '3 Years',
          githubLink: app.githubLink || app.githublink || '',
          taskAssigned: app.taskAssigned !== undefined ? app.taskAssigned : (app.taskassigned || false),
          hrInterviewDate: app.hrInterviewDate || app.hrinterviewdate || '',
          hrInterviewTime: app.hrInterviewTime || app.hrinterviewtime || '',
          hrInterviewLocation: app.hrInterviewLocation || app.hrinterviewlocation || '',
          jobId: app.jobId || app.jobid || '',
          appliedTime: app.appliedTime || app.appliedtime || '',
          pipelineStage: app.pipelineStage !== undefined && app.pipelineStage !== null ? app.pipelineStage : null
        };

        const jobKey = `${(normalized.email || '').toLowerCase()}-${(normalized.jobTitle || '').toLowerCase()}-${normalized.jobId || ''}`;
        seenJobKeys.add(jobKey);

        const localMatch = localFiltered.find((l) => l.id === app.id || (l.jobTitle === normalized.jobTitle && l.email === normalized.email));
        if (localMatch) {
          if (localMatch.createdAt) {
            normalized.createdAt = localMatch.createdAt;
          }
          if (localMatch.appliedDate) {
            normalized.appliedDate = localMatch.appliedDate;
          }
          if (localMatch.appliedTime) {
            normalized.appliedTime = localMatch.appliedTime;
          }
          if (localMatch.aptitudeStatus && !normalized.aptitudeStatus) {
            normalized.aptitudeStatus = localMatch.aptitudeStatus;
          }
          if (localMatch.aptitudeScore !== undefined && localMatch.aptitudeScore !== null && normalized.aptitudeScore === '') {
            normalized.aptitudeScore = localMatch.aptitudeScore;
          }
          if (localMatch.status && localMatch.status !== normalized.status && localMatch.status !== 'Applied') {
            normalized.status = localMatch.status;
          }
          if (localMatch.pipelineStage !== undefined && localMatch.pipelineStage !== null && normalized.pipelineStage === null) {
            normalized.pipelineStage = localMatch.pipelineStage;
          }
          if (localMatch.interviewDate && !normalized.interviewDate) normalized.interviewDate = localMatch.interviewDate;
          if (localMatch.interviewTime && !normalized.interviewTime) normalized.interviewTime = localMatch.interviewTime;
          if (localMatch.interviewLink && !normalized.interviewLink) normalized.interviewLink = localMatch.interviewLink;
          if (localMatch.githubLink && !normalized.githubLink) normalized.githubLink = localMatch.githubLink;
          if (localMatch.taskAssigned && !normalized.taskAssigned) normalized.taskAssigned = localMatch.taskAssigned;
          if (localMatch.hrInterviewDate && !normalized.hrInterviewDate) normalized.hrInterviewDate = localMatch.hrInterviewDate;
          if (localMatch.hrInterviewTime && !normalized.hrInterviewTime) normalized.hrInterviewTime = localMatch.hrInterviewTime;
          if (localMatch.hrInterviewLocation && !normalized.hrInterviewLocation) normalized.hrInterviewLocation = localMatch.hrInterviewLocation;
        }

        console.log('[Careers TRACE] Normalized application pushed to mergedApps:', normalized);
        mergedApps.push(normalized);
        seenIds.add(app.id);
      });

      // Include local apps that are not yet on backend
      localFiltered.forEach((localApp) => {
        const jobKey = `${(localApp.email || '').toLowerCase()}-${(localApp.jobTitle || '').toLowerCase()}-${localApp.jobId || localApp.jobid || ''}`;
        if (!seenIds.has(localApp.id) && !seenJobKeys.has(jobKey)) {
          mergedApps.push({
            id: localApp.id,
            jobId: localApp.jobId || localApp.jobid || '',
            fullName: localApp.fullName || '',
            email: localApp.email || '',
            phone: localApp.phone || '',
            resumeUrl: localApp.resumeUrl || '',
            coverLetter: localApp.coverLetter || '',
            status: localApp.status || 'Applied',
            createdAt: localApp.createdAt || new Date().toISOString(),
            appliedDate: localApp.appliedDate || localApp.applieddate || localApp.createdAt || new Date().toISOString(),
            appliedTime: localApp.appliedTime || localApp.appliedTime || localApp.createdAt || new Date().toISOString(),
            jobTitle: localApp.jobTitle || '',
            jobDepartment: localApp.jobDepartment || 'Engineering',
            jobLocation: localApp.jobLocation || 'Tiruvallur',
            interviewDate: localApp.interviewDate || '',
            interviewTime: localApp.interviewTime || '',
            interviewLink: localApp.interviewLink || '',
            githubLink: localApp.githubLink || '',
            taskAssigned: localApp.taskAssigned !== undefined ? localApp.taskAssigned : (localApp.taskassigned || false),
            hrInterviewDate: localApp.hrInterviewDate || '',
            hrInterviewTime: localApp.hrInterviewTime || '',
            hrInterviewLocation: localApp.hrInterviewLocation || '',
            aptitudeStatus: localApp.aptitudeStatus || '',
            aptitudeScore: localApp.aptitudeScore !== undefined && localApp.aptitudeScore !== null ? localApp.aptitudeScore : '',
            experience: localApp.experience || '3 Years',
            pipelineStage: localApp.pipelineStage !== undefined && localApp.pipelineStage !== null ? localApp.pipelineStage : 0
          });
          seenJobKeys.add(jobKey);
        }
      });

      // Sort by date created desc
      mergedApps.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setUserApplications(mergedApps);
    } catch (err) {
      console.error('Failed to parse or merge user applications:', err);
      setMyJobsError('Failed to load application details.');
    } finally {
      setMyJobsLoading(false);
    }
  };

  const handleMyJobsClick = () => {
    if (!user) {
      setShowLoginPrompt(true);
    } else {
      setShowMyJobs(true);
      fetchUserApplications();
    }
  };

  if (isTaskAssessmentRoute) {
    return (
      <div className="auth-white-theme min-h-screen flex items-center justify-center px-4 py-12 bg-slate-50 relative overflow-hidden w-full">
        <style>{`
          .auth-white-theme {
            background-image: url('/careers_bg.svg') !important;
            background-size: cover !important;
            background-position: center top !important;
            background-repeat: no-repeat !important;
            background-attachment: scroll !important;
            color: #1E293B !important;
          }
        `}</style>
        {/* Decorative background blobs */}
        <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[30%] right-[20%] w-[300px] h-[300px] bg-pink-600/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-2xl bg-white p-8 rounded-3xl border border-slate-200 shadow-xl relative z-10 text-left">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/10">
              <Code2 className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Task Assessment</h2>
              <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">BETA Recruitment Portal</p>
            </div>
          </div>

          {loadingTask ? (
            <div className="py-12 text-center text-slate-500 text-sm font-semibold">
              <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-3 text-purple-600" />
              Loading task details...
            </div>
          ) : taskError ? (
            <div className="py-6 text-center space-y-4">
              <div className="h-16 w-16 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto text-rose-500">
                <AlertCircle className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Task Loading Failed</h3>
                <p className="text-slate-500 text-sm mt-1">{taskError}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Candidate Info Card */}
              {taskData?.candidate && (
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900">{taskData.candidate.fullName}</h4>
                      <p className="text-slate-500 text-xs mt-0.5">Applied for <strong>{taskData.candidate.jobTitle || 'Developer'}</strong></p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${taskData.status === 'SUBMITTED'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-purple-50 text-purple-700 border-purple-200'
                      }`}>
                      {taskData.status}
                    </span>
                  </div>
                </div>
              )}

              {/* Task Details Card */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Task Description</h4>
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl font-sans text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                  {taskData?.taskDescription}
                </div>
              </div>

              {/* Submission Status */}
              {taskData?.candidate?.githubLink || taskData?.status === 'SUBMITTED' ? (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Submitted Task Solution</h4>
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-between">
                    <a
                      href={taskData?.candidate?.githubLink && (taskData.candidate.githubLink.startsWith('http://') || taskData.candidate.githubLink.startsWith('https://')) ? taskData.candidate.githubLink : `https://${taskData?.candidate?.githubLink || ''}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-violet-650 hover:underline break-all"
                    >
                      {taskData?.candidate?.githubLink || taskData?.githubLink}
                    </a>
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-wider">
                      ✓ Submitted
                    </span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleTaskSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">GitHub Repository Link</label>
                    <input
                      type="url"
                      required
                      value={gitLinkInput}
                      onChange={(e) => setGitLinkInput(e.target.value)}
                      placeholder="https://github.com/yourusername/yourproject"
                      disabled={submittingTask}
                      className="w-full bg-white text-slate-900 placeholder-slate-400 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-purple-500 text-sm transition"
                    />
                  </div>

                  {taskSubmitSuccess && (
                    <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center space-x-2 text-emerald-700 text-xs font-semibold">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                      <span>GitHub repository link submitted successfully! Your task status is updated to SUBMITTED.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submittingTask || !gitLinkInput.trim()}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-[1.01] active:scale-[0.99] text-white text-xs font-black transition flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/10 border-none cursor-pointer"
                  >
                    {submittingTask ? 'Submitting Repository...' : 'Submit Task Assessment'}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="careers-purple-pink-theme min-h-screen relative overflow-hidden pb-20 pt-4">
      <style>{`
        .careers-purple-pink-theme {
          background: #f8fafc !important;
          color: #1E293B !important;
          position: relative;
          z-index: 10;
        }
        .careers-purple-pink-theme h1:not(.text-transparent), 
        .careers-purple-pink-theme h2:not(.text-transparent), 
        .careers-purple-pink-theme h3:not(.text-transparent), 
        .careers-purple-pink-theme h4:not(.text-transparent), 
        .careers-purple-pink-theme h5:not(.text-transparent), 
        .careers-purple-pink-theme h6:not(.text-transparent) {
          color: #0F172A !important;
        }
        .careers-purple-pink-theme h1.text-white:not(.text-transparent), 
        .careers-purple-pink-theme h2.text-white:not(.text-transparent), 
        .careers-purple-pink-theme h3.text-white:not(.text-transparent), 
        .careers-purple-pink-theme h4.text-white:not(.text-transparent), 
        .careers-purple-pink-theme h5.text-white:not(.text-transparent), 
        .careers-purple-pink-theme h6.text-white:not(.text-transparent),
        .careers-purple-pink-theme div.text-white {
          color: #0F172A !important;
        }
        .careers-purple-pink-theme p {
          color: #475569 !important;
        }
        .careers-purple-pink-theme span {
          color: inherit;
        }
        .careers-purple-pink-theme a {
          color: inherit;
        }
        .careers-purple-pink-theme label {
          color: #334155 !important;
        }
        .careers-purple-pink-theme input,
        .careers-purple-pink-theme textarea {
          background-color: #ffffff !important;
          color: #0F172A !important;
          border-color: rgba(139, 92, 246, 0.2) !important;
        }
        .careers-purple-pink-theme input::placeholder,
        .careers-purple-pink-theme textarea::placeholder {
          color: #94A3B8 !important;
        }
        .careers-purple-pink-theme .cta-block h2,
        .careers-purple-pink-theme .cta-block p {
          color: #000000 !important;
        }

        /* Animated gradient blobs */
        @keyframes floatBlobPink {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes floatBlobPurple {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(-40px, 40px) scale(0.9); }
          66% { transform: translate(30px, -20px) scale(1.05); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .blob-pink {
          animation: floatBlobPink 16s ease-in-out infinite;
        }
        .blob-purple {
          animation: floatBlobPurple 20s ease-in-out infinite;
        }

        /* Floating geometric shapes */
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .shape-spin-slow {
          animation: spinSlow 30s linear infinite;
        }

        /* Floating Benefits Circles */
        @keyframes benefitFloatEven {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-12px) scale(1.03); }
          100% { transform: translateY(0) scale(1); }
        }
        @keyframes benefitFloatOdd {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-18px) scale(0.98); }
          100% { transform: translateY(0) scale(1); }
        }
        .float-circle-even {
          animation: benefitFloatEven 6s ease-in-out infinite;
        }
        .float-circle-odd {
          animation: benefitFloatOdd 8s ease-in-out infinite;
        }

        /* Purple glowing cards */
        .glass-card-purple {
          background: rgba(255, 255, 255, 1) !important;
          backdrop-filter: blur(12px) !important;
          border: 1px solid rgba(139, 92, 246, 0.2) !important;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.06) !important;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
        }
        .glass-card-purple:hover {
          background: rgba(255, 255, 255, 0.92) !important;
          border-color: rgba(236, 72, 153, 0.4) !important; /* Secondary border pink */
          box-shadow: 0 0 25px rgba(139, 92, 246, 0.15) !important; /* Purple glow */
          transform: translateY(-5px);
        }

        /* Scrollbar hidden */
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Hacker-style double borders for jobs */
        // .hacker-layout-box {
        //   background: rgba(255, 255, 255, 0.75) !important;
        //   border: 1px solid rgba(139, 92, 246, 0.25) !important;
        //   position: relative;
        // }
        .hacker-layout-box::before {
          content: '';
          position: absolute;
          inset: 2px;
          border: 1px solid rgba(236, 72, 153, 0.12);
          pointer-events: none;
        }
        .unified-openings-box {
          background: rgba(255, 255, 255, 0.78) !important;
          backdrop-filter: blur(16px) !important;
          border: 1px solid rgba(255, 255, 255, 0.85) !important;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.06) !important;
        }
      `}</style>




      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 space-y-16 md:space-y-20 relative z-10">
        {!showMyJobs ? (
          <>
            {/* COMBINED HERO & OPEN ROLES GROUP */}
            <div className="space-y-6">
              {/* HERO SECTION */}
              <div className="text-center max-w-3xl mx-auto pt-2 pb-4 space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center space-x-3 text-xs font-bold uppercase tracking-widest text-slate-400 select-none mb-2"
                >
                  <span className="w-8 h-[1px] bg-slate-300"></span>
                  <span>JOIN OUR TEAM</span>
                  <span className="w-8 h-[1px] bg-slate-300"></span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-900"
                >
                  Shape Tomorrow
                  <span className="block bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-purple-600 bg-clip-text text-transparent mt-1">
                    With Us
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
                >
                  At Beta, we design and deliver high-performance real-time enterprise software. We respect developer focus, async workflow, and premium user experience design.
                </motion.p>
              </div>

              <div id="search-roles" className="space-y-4">
                <div className="w-full max-w-5xl mx-auto hacker-layout-box unified-openings-box p-6 sm:p-8 rounded-2xl shadow-xl shadow-purple-500/5 text-left space-y-6">
                  {/* Header inside Box with Centered Title, and Search Bar + Filter Button */}
                  <div className="flex flex-col items-center justify-center gap-4 border-b border-purple-500/10 pb-6 w-full">
                    <div className="text-center">
                      <h3 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
                        {isSavedJobsRoute ? 'Saved Roles' : 'Open Roles'}
                      </h3>
                      <span className="text-xs md:text-sm font-extrabold text-[#F59E0B] uppercase tracking-widest block mt-1">
                        {isSavedJobsRoute ? 'Your Saved Jobs' : 'Explore Opportunities'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 w-full">
                      {isSavedJobsRoute && (
                        <button
                          type="button"
                          onClick={() => {
                            navigate('/careers');
                          }}
                          className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-purple-500/20 bg-white text-slate-700 hover:bg-slate-50 hover:border-purple-500/40 hover:shadow-purple-500/10 transition-all duration-300 text-xs font-bold shadow-sm cursor-pointer whitespace-nowrap"
                        >
                          <ArrowLeft className="h-3.5 w-3.5" />
                          <span>All Jobs</span>
                        </button>
                      )}
                      <div className="relative flex-grow max-w-md flex items-center">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search roles..."
                          className="w-full bg-white text-slate-900 placeholder-slate-400 border border-purple-500/20 rounded-xl py-2 pl-9 pr-8 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] text-sm shadow-sm transition duration-300"
                        />
                        <Search className="absolute left-3 h-4 w-4 text-slate-400 pointer-events-none" />
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 p-0.5 hover:bg-slate-100 rounded-full transition text-slate-400 cursor-pointer"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </div>



                      <button
                        type="button"
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all duration-300 text-xs font-bold shadow-sm cursor-pointer whitespace-nowrap ${showFilters
                          ? 'bg-[#8B5CF6] border-transparent text-white shadow-[#8B5CF6]/20'
                          : 'bg-white border-purple-500/20 text-slate-700 hover:bg-slate-50 shadow-purple-500/5'
                          }`}
                      >
                        <SlidersHorizontal className="h-3.5 w-3.5" />
                        <span>Filters</span>
                        {(selectedTeam || selectedLocation || selectedType) && (
                          <span className="flex h-1.5 w-1.5 rounded-full bg-[#EC4899] animate-pulse"></span>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleMyJobsClick}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-purple-500/20 bg-white text-slate-700 hover:bg-slate-50 hover:border-purple-500/40 hover:shadow-purple-500/10 transition-all duration-300 text-xs font-bold shadow-sm cursor-pointer whitespace-nowrap"
                      >
                        <Briefcase className="h-3.5 w-3.5 text-purple-600" />
                        <span>My Jobs</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleSavedJobsClick}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-purple-500/20 bg-white text-slate-700 hover:bg-slate-50 hover:border-purple-500/40 hover:shadow-purple-500/10 transition-all duration-300 text-xs font-bold shadow-sm cursor-pointer whitespace-nowrap"
                      >
                        <Bookmark className="h-3.5 w-3.5 text-purple-600" fill={savedJobs.length > 0 ? "currentColor" : "none"} />
                        <span>Saved Jobs</span>
                      </button>
                    </div>
                  </div>

                  {/* Expandable Filter Panel inside Box */}
                  <AnimatePresence>
                    {showFilters && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 0 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden w-full border-b border-purple-500/10 pb-6"
                      >
                        <div className="bg-white/80 border border-purple-500/10 rounded-xl p-4 shadow-sm flex flex-col gap-4">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* Department Filter */}
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Department</label>
                              <select
                                value={selectedTeam}
                                onChange={(e) => setSelectedTeam(e.target.value)}
                                className="w-full bg-white text-slate-800 border border-purple-200 rounded-xl py-2 px-3 focus:outline-none focus:border-[#8B5CF6] text-xs transition cursor-pointer"
                              >
                                <option value="">All Departments</option>
                                {teams.map(team => (
                                  <option key={team} value={team}>{team}</option>
                                ))}
                              </select>
                            </div>

                            {/* Location Filter */}
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Location</label>
                              <select
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                                className="w-full bg-white text-slate-800 border border-purple-200 rounded-xl py-2 px-3 focus:outline-none focus:border-[#8B5CF6] text-xs transition cursor-pointer"
                              >
                                <option value="">All Locations</option>
                                {locations.map(loc => (
                                  <option key={loc} value={loc}>{loc}</option>
                                ))}
                              </select>
                            </div>

                            {/* Job Type Filter */}
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Job Type</label>
                              <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="w-full bg-white text-slate-800 border border-purple-200 rounded-xl py-2 px-3 focus:outline-none focus:border-[#8B5CF6] text-xs transition cursor-pointer"
                              >
                                <option value="">All Types</option>
                                {types.map(type => (
                                  <option key={type} value={type}>{type}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Active Filter Pills and Clear Button */}
                          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-purple-500/10 pt-3">
                            <div className="flex flex-wrap gap-2">
                              {selectedTeam && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-700 text-[10px] font-semibold">
                                  Dept: {selectedTeam}
                                  <button onClick={() => setSelectedTeam('')} className="hover:text-purple-900 cursor-pointer">
                                    <X className="h-3 w-3" />
                                  </button>
                                </span>
                              )}
                              {selectedLocation && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-500/10 text-pink-700 text-[10px] font-semibold">
                                  Loc: {selectedLocation}
                                  <button onClick={() => setSelectedLocation('')} className="hover:text-pink-900 cursor-pointer">
                                    <X className="h-3 w-3" />
                                  </button>
                                </span>
                              )}
                              {selectedType && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 text-[10px] font-semibold">
                                  Type: {selectedType}
                                  <button onClick={() => setSelectedType('')} className="hover:text-amber-900 cursor-pointer">
                                    <X className="h-3 w-3" />
                                  </button>
                                </span>
                              )}
                            </div>

                            {(selectedTeam || selectedLocation || selectedType) && (
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedTeam('');
                                  setSelectedLocation('');
                                  setSelectedType('');
                                }}
                                className="text-xs font-semibold text-[#EC4899] hover:underline cursor-pointer"
                              >
                                Clear All Filters
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Job list inside container */}
                  <div className="flex flex-col gap-4 w-full">
                    <AnimatePresence mode="wait">
                      {currentJobs.length > 0 ? (
                        currentJobs.map((job) => (
                          <motion.div
                            key={job.id}
                            layout
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="relative p-5 rounded-xl border border-blue-500/20 bg-[#dbeafe]/60 hover:bg-[#dbeafe]/85 hover:border-blue-500/35 hover:shadow-sm transition-all duration-300 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-6 group"
                          >
                            {/* Action Row: Location, Salary, Save, Share, Report - flex on mobile, absolute on desktop */}
                            <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-0 sm:absolute sm:top-4 sm:right-4 z-10">
                              {job.location && (
                                <span className="px-2.5 py-1 rounded-xl text-[10px] font-black text-blue-600 bg-blue-50 border border-blue-500/10 mr-1 shadow-sm uppercase tracking-wider flex items-center gap-1">
                                  <MapPin className="h-3 w-3 text-blue-500" />
                                  {job.location}
                                </span>
                              )}
                              {job.salary && (
                                <span className="px-2.5 py-1 rounded-xl text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-500/10 mr-1 shadow-sm uppercase tracking-wider">
                                  {job.salary.startsWith('₹') || job.salary.startsWith('Rs') ? job.salary : `₹${job.salary}`}
                                </span>
                              )}
                              {/* Save button */}
                              <button
                                type="button"
                                onClick={() => handleSaveJob(job.id)}
                                className={`p-2 rounded-xl border transition-all duration-300 flex items-center justify-center cursor-pointer ${savedJobs.includes(job.id)
                                  ? 'bg-purple-50 border-purple-200 text-purple-600 hover:bg-purple-100'
                                  : 'bg-white border-slate-200 text-slate-400 hover:text-purple-600 hover:border-purple-200 hover:bg-purple-50/30'
                                  }`}
                                title="Save Job"
                              >
                                <Bookmark className="h-4 w-4" fill={savedJobs.includes(job.id) ? "currentColor" : "none"} />
                              </button>

                              {/* Share button */}
                              <button
                                type="button"
                                onClick={() => handleShareJob(job)}
                                className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-blue-50/30 hover:border-blue-200 text-slate-400 hover:text-blue-500 transition-all duration-300 flex items-center justify-center cursor-pointer"
                                title="Share Job"
                              >
                                <Share2 className="h-4 w-4" />
                              </button>

                              {/* Three dots (Report) menu */}
                              <div className="relative">
                                <button
                                  type="button"
                                  onClick={() => handleToggleReportMenu(job.id)}
                                  className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-350 text-slate-400 hover:text-slate-700 transition-all duration-300 flex items-center justify-center cursor-pointer"
                                  title="Options"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </button>
                                {activeReportJobId === job.id && (
                                  <div className="absolute right-0 mt-1 w-28 bg-white border border-slate-200 rounded-xl shadow-lg z-30 p-1 animate-fadeIn">
                                    <button
                                      type="button"
                                      onClick={() => handleReportJob(job)}
                                      className="w-full text-left px-3 py-1.5 hover:bg-rose-50 text-rose-600 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border-none bg-transparent"
                                    >
                                      <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />
                                      Report Job
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="space-y-4 flex-grow">
                              <div className="pr-0 sm:pr-72 text-left">
                                <h3 className="text-lg font-black tracking-tight group-hover:text-[#EC4899] transition-colors duration-300 flex flex-wrap items-center gap-2">
                                  {job.title}
                                </h3>
                                <div className="flex flex-wrap items-center gap-2 mt-0.5 mb-2">
                                  <span className="text-[9px] font-extrabold text-[#F59E0B] uppercase tracking-widest block">
                                    {job.team}
                                  </span>
                                  {job.type && (
                                    <>
                                      <span className="text-slate-350 text-[9px] font-extrabold">•</span>
                                      <span className="text-[9px] font-extrabold text-[#10B981] uppercase tracking-widest block">
                                        {job.type}
                                      </span>
                                    </>
                                  )}
                                  {job.experience && (
                                    <>
                                      <span className="text-slate-350 text-[9px] font-extrabold">•</span>
                                      <span className="text-[9px] font-extrabold text-[#8B5CF6] uppercase tracking-widest block">
                                        {job.experience}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>

                              {/* Role Description Block */}
                              {(() => {
                                const descriptionText = job.description || '';
                                const limit = 220;
                                return (
                                  <div className="mt-3.5 text-xs text-left">
                                    <span className="font-extrabold text-[#8B5CF6] text-[10px] uppercase tracking-wider block mb-1">
                                      Role Description
                                    </span>
                                    {expandedJobDescs[job.id] ? (
                                      <p className="text-slate-600 leading-relaxed font-semibold">
                                        {descriptionText}
                                      </p>
                                    ) : (
                                      <p className="text-slate-600 leading-relaxed font-semibold">
                                        {descriptionText.length > limit ? (
                                          <>
                                            {descriptionText.slice(0, limit)}...{" "}
                                            <button
                                              type="button"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                toggleJobDesc(job.id);
                                              }}
                                              className="text-[#EC4899] hover:text-[#db3c8b] font-bold text-[11px] hover:underline cursor-pointer bg-transparent border-none p-0 inline-block transition-colors duration-200"
                                            >
                                              See More
                                            </button>
                                          </>
                                        ) : (
                                          descriptionText
                                        )}
                                      </p>
                                    )}
                                  </div>
                                );
                              })()}

                              {/* Required Skills Block */}
                              {((job.description || '').length <= 220 || expandedJobDescs[job.id]) && job.skills && job.skills.length > 0 && (
                                <div className="mt-3.5 text-left">
                                  <span className="font-extrabold text-[#EC4899] text-[10px] uppercase tracking-wider block mb-1.5">
                                    Required Skills
                                  </span>
                                  <div className="flex flex-wrap gap-1.5">
                                    {job.skills.map((skill, idx) => (
                                      <span key={idx} className="px-2.5 py-1 rounded-xl bg-purple-50 border border-purple-500/10 text-[#8B5CF6] text-[10px] font-black shadow-sm">
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* See Less Button (for expanded long description) */}
                              {expandedJobDescs[job.id] && (job.description || '').length > 220 && (
                                <div className="mt-3 text-left">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleJobDesc(job.id);
                                    }}
                                    className="text-[#EC4899] hover:text-[#db3c8b] font-bold text-[11px] hover:underline cursor-pointer bg-transparent border-none p-0 transition-colors duration-200"
                                  >
                                    See Less
                                  </button>
                                </div>
                              )}
                            </div>

                            <div className="flex-shrink-0 w-full sm:w-auto mt-8 sm:mt-0">
                              <button
                                onClick={() => setSelectedJob(job)}
                                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-black bg-purple-600/15 hover:bg-gradient-to-r hover:from-[#8B5CF6] hover:to-[#EC4899] text-[#8B5CF6] hover:text-white border border-[#8B5CF6]/30 hover:border-transparent transition-all duration-300 text-center cursor-pointer shadow-sm whitespace-nowrap"
                              >
                                Apply Now
                              </button>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center py-12 text-slate-400 italic text-sm">
                          No positions found. Try adjusting filters or search keywords.
                        </div>
                      )}
                    </AnimatePresence>

                    {/* Pagination Controls */}
                    {totalJobsPages > 1 && (
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-purple-500/10 w-full mt-4">
                        <span className="text-xs font-semibold text-slate-500">
                          Showing {indexOfFirstJob + 1}-{Math.min(indexOfLastJob, displayedJobs.length)} of {displayedJobs.length} roles
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={jobsPage === 1}
                            onClick={() => {
                              setJobsPage(prev => Math.max(prev - 1, 1));
                              document.querySelector('.unified-openings-box')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition duration-300 flex items-center gap-1 ${jobsPage === 1
                              ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
                              : 'bg-white border-purple-500/20 text-slate-700 hover:bg-slate-50 cursor-pointer hover:border-purple-500/40 hover:text-purple-600'
                              }`}
                          >
                            <ChevronLeft className="h-3.5 w-3.5" />
                            <span>Previous</span>
                          </button>

                          <div className="flex items-center gap-1">
                            {Array.from({ length: totalJobsPages }, (_, idx) => idx + 1).map((pNum) => (
                              <button
                                key={pNum}
                                type="button"
                                onClick={() => {
                                  setJobsPage(pNum);
                                  document.querySelector('.unified-openings-box')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className={`h-8 w-8 rounded-xl text-xs font-bold transition duration-300 cursor-pointer ${jobsPage === pNum
                                  ? 'bg-[#8B5CF6] text-white shadow-sm'
                                  : 'bg-white border border-purple-500/10 text-slate-700 hover:bg-slate-50'
                                  }`}
                              >
                                {pNum}
                              </button>
                            ))}
                          </div>

                          <button
                            type="button"
                            disabled={jobsPage === totalJobsPages}
                            onClick={() => {
                              setJobsPage(prev => Math.min(prev + 1, totalJobsPages));
                              document.querySelector('.unified-openings-box')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition duration-300 flex items-center gap-1 ${jobsPage === totalJobsPages
                              ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
                              : 'bg-white border-purple-500/20 text-slate-700 hover:bg-slate-50 cursor-pointer hover:border-purple-500/40 hover:text-purple-600'
                              }`}
                          >
                            <span>Next</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    )}


                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 6: HIRING PROCESS */}
            <div className="space-y-10 -mt-6 md:-mt-8">
              <div className="text-center max-w-2xl mx-auto space-y-2.5">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[#EC4899] text-xs font-semibold uppercase tracking-wider">
                  <CheckSquare className="h-3.5 w-3.5" />
                  <span>Hiring Pipeline</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold">Our Hiring Process</h2>
                <p className="text-slate-500 text-sm">A quick outline of how we validate core competencies and welcome new team members.</p>
              </div>

              {/* Connected Glowing Nodes Timeline */}
              <div className="relative max-w-4xl mx-auto md:-translate-x-52 pt-2 flex flex-col md:flex-row flex-wrap md:flex-nowrap items-center justify-between gap-8 md:gap-4">
                {processSteps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <React.Fragment key={step.id}>
                      {/* Glowing Node Circle */}
                      <motion.div
                        initial="initial"
                        whileInView="visible"
                        whileHover="hover"
                        whileTap="tap"
                        variants={{
                          initial: { opacity: 0, scale: 0.9, y: 0, rotateX: 0, rotateY: 0 },
                          visible: {
                            opacity: 1,
                            scale: 1,
                            y: [0, -6, 0],
                            rotateX: [0, -4, 4, 0],
                            rotateY: [0, 8, -8, 0],
                            transition: {
                              opacity: { duration: 0.5, delay: idx * 0.1 },
                              scale: { duration: 0.5, delay: idx * 0.1 },
                              y: {
                                repeat: Infinity,
                                duration: 4,
                                ease: "easeInOut",
                                delay: idx * 0.25
                              },
                              rotateX: {
                                repeat: Infinity,
                                duration: 4,
                                ease: "easeInOut",
                                delay: idx * 0.25
                              },
                              rotateY: {
                                repeat: Infinity,
                                duration: 4,
                                ease: "easeInOut",
                                delay: idx * 0.25
                              }
                            }
                          },
                          hover: {
                            scale: 1.08,
                            rotateY: 15,
                            rotateX: -10,
                            y: -12,
                            transition: { type: "spring", stiffness: 400, damping: 15 }
                          },
                          tap: {
                            scale: 0.95,
                            rotateY: -5,
                            rotateX: 5,
                            y: -2,
                            transition: { type: "spring", stiffness: 400, damping: 15 }
                          }
                        }}
                        viewport={{ once: true }}
                        style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                        className="glass-card-purple p-4 md:p-4 lg:p-5 rounded-3xl border border-purple-500/20 text-center flex flex-col items-center justify-center shadow-md w-[170px] h-[170px] md:w-[160px] md:h-[160px] lg:w-[180px] lg:h-[180px] group relative shrink-0 cursor-pointer"
                      >
                        <motion.div
                          variants={{
                            hover: { rotate: 360, scale: 1.25 },
                            tap: { scale: 0.9 }
                          }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                          className={`h-10 w-10 md:h-9 md:w-9 lg:h-11 lg:w-11 rounded-full flex items-center justify-center border ${step.bg} mb-2 md:mb-1.5 lg:mb-2.5 shadow-lg shadow-purple-500/10 shrink-0`}
                        >
                          <Icon className={`h-5 w-5 md:h-4.5 md:w-4.5 lg:h-5.5 lg:w-5.5 ${step.color}`} />
                        </motion.div>
                        <span className="text-[9px] md:text-[8px] lg:text-[9px] font-extrabold text-[#F59E0B] uppercase tracking-widest mb-0.5">
                          Step {step.id}
                        </span>
                        <h4 className="text-[11px] md:text-[10px] lg:text-[12px] font-black group-hover:text-[#EC4899] transition-colors leading-tight">
                          {step.title}
                        </h4>
                        <p className="text-[9px] md:text-[8px] lg:text-[9.5px] text-slate-500 leading-tight mt-0.5 font-medium">
                          {step.desc}
                        </p>
                      </motion.div>

                      {/* Node Connector Line */}
                      {idx < processSteps.length - 1 && (
                        <div className="hidden md:block h-[2px] flex-grow bg-gradient-to-r from-[#8B5CF6]/50 to-[#EC4899]/50 relative z-0 mx-2" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* SECTION 4: TEAM CULTURE MASONRY */}
            <div className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 rounded-[36px] bg-gradient-to-b from-[#F2F8FD]/80 via-[#F8FBFF] to-[#FFFFFF] border border-blue-100/50 shadow-[0_12px_40px_-15px_rgba(10,40,90,0.04)] space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#004AAD] text-xs font-semibold uppercase tracking-wider">
                  <Users className="h-3.5 w-3.5 text-[#004AAD]" />
                  <span>Team Culture</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1E3B] tracking-tight">
                  Our Team Culture
                </h2>
                <p className="text-slate-500 text-sm md:text-base">
                  A look inside our technical sprints, hackathons, and global offsites.
                </p>
              </div>

              {/* 5-Card Responsive Grid Layout (Desktop: 3 + 2, Tablet: 2 cols, Mobile: 1 col) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 max-w-6xl mx-auto text-left">
                {/* ROW 1: CARD 1 — TEAM QUOTE (Subtle Pink Accent) */}
                <div className="col-span-1 md:col-span-1 lg:col-span-4 bg-white rounded-[26px] p-7 sm:p-8 border border-pink-100/80 shadow-[0_10px_30px_-5px_rgba(244,63,94,0.05)] hover:shadow-[0_16px_36px_-6px_rgba(244,63,94,0.12)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group">
                  {/* Subtle Corner Accent */}
                  <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-gradient-to-br from-pink-100/70 to-pink-50/20 pointer-events-none" />

                  <div>
                    {/* Quotation Icon */}
                    <div className="w-11 h-11 rounded-2xl bg-pink-50 border border-pink-100/90 flex items-center justify-center text-pink-500 shadow-sm mb-5">
                      <Quote className="w-5 h-5 fill-pink-500/20 text-pink-500" />
                    </div>

                    {/* Quote text */}
                    <p className="text-[14.5px] sm:text-[15px] italic text-slate-700 leading-relaxed font-normal">
                      "We don’t just write code to meet requirements. We build solutions that create real value for users around the world."
                    </p>
                  </div>

                  <div>
                    {/* Thin divider */}
                    <div className="h-px w-full bg-pink-100/80 my-5" />

                    {/* Team Member Info */}
                    <div className="flex items-center space-x-3.5">
                      <img
                        src="/marcus_avatar.png"
                        alt="Arjun Kumar"
                        className="h-11 w-11 rounded-full object-cover ring-2 ring-pink-100 shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-[#0B1E3B] leading-tight">Arjun Kumar</h4>
                        <p className="text-xs text-pink-600 font-medium mt-0.5">Chief Technology Officer</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ROW 1: CARD 2 — INNOVATIVE TECHNOLOGY (Subtle Blue Accent) */}
                <div className="col-span-1 md:col-span-1 lg:col-span-4 bg-white rounded-[26px] p-7 sm:p-8 border border-blue-100/80 shadow-[0_10px_30px_-5px_rgba(59,130,246,0.05)] hover:shadow-[0_16px_36px_-6px_rgba(59,130,246,0.12)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group">
                  {/* Subtle Corner Accent */}
                  <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-gradient-to-br from-sky-100/70 to-blue-50/20 pointer-events-none" />

                  <div>
                    {/* Technology / Code Icon */}
                    <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100/90 flex items-center justify-center text-blue-600 shadow-sm mb-5">
                      <Code2 className="w-5 h-5 text-blue-600" />
                    </div>

                    {/* Heading */}
                    <h3 className="text-lg font-bold text-[#0B1E3B] tracking-tight mb-2.5">
                      Innovative Technology
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                      We build modern, scalable solutions using React, Spring Boot, cloud infrastructure, and AI-driven tools.
                    </p>
                  </div>

                  <div>
                    {/* Thin divider */}
                    <div className="h-px w-full bg-blue-100/80 my-5" />

                    {/* Bottom Section with Label & Circular Action Button */}
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 text-[10px] font-bold uppercase tracking-wider">
                        OUR TECHNOLOGY STACK
                      </span>
                      <div className="w-8 h-8 rounded-full bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white border border-blue-100 flex items-center justify-center transition-all duration-200 cursor-pointer">
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ROW 1: CARD 3 — DESIGN / CULTURE (Subtle Soft Orange/Peach Accent) */}
                <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-white rounded-[26px] p-7 sm:p-8 border border-amber-100/80 shadow-[0_10px_30px_-5px_rgba(245,158,11,0.05)] hover:shadow-[0_16px_36px_-6px_rgba(245,158,11,0.12)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group">
                  {/* Subtle Corner Accent */}
                  <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-gradient-to-br from-amber-100/70 to-orange-50/20 pointer-events-none" />

                  <div>
                    {/* Quotation Icon */}
                    <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-100/90 flex items-center justify-center text-amber-500 shadow-sm mb-5">
                      <Quote className="w-5 h-5 fill-amber-500/20 text-amber-500" />
                    </div>

                    {/* Quote text */}
                    <p className="text-[14.5px] sm:text-[15px] italic text-slate-700 leading-relaxed font-normal">
                      "Our designs prioritize aesthetics and responsiveness. We create interfaces that look absolutely premium."
                    </p>
                  </div>

                  <div>
                    {/* Thin divider */}
                    <div className="h-px w-full bg-amber-100/80 my-5" />

                    {/* Team Member Info */}
                    <div className="flex items-center space-x-3.5">
                      <img
                        src="/ananya_avatar.png"
                        alt="Priya Menon"
                        className="h-11 w-11 rounded-full object-cover ring-2 ring-amber-100 shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-[#0B1E3B] leading-tight">Priya Menon</h4>
                        <p className="text-xs text-amber-600 font-medium mt-0.5">Head of Design</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ROW 2: CARD 4 — FOCUS / PRODUCTIVITY (Soft Purple Accent — Wider 7 cols) */}
                <div className="col-span-1 md:col-span-2 lg:col-span-7 bg-white rounded-[26px] p-7 sm:p-8 border border-purple-100/80 shadow-[0_10px_30px_-5px_rgba(139,92,246,0.05)] hover:shadow-[0_16px_36px_-6px_rgba(139,92,246,0.12)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group">
                  {/* Subtle Corner Accent */}
                  <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-gradient-to-tr from-purple-100/60 to-indigo-50/10 pointer-events-none" />

                  <div className="space-y-4 max-w-md relative z-10">
                    {/* Team / Focus Icon */}
                    <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-100/90 flex items-center justify-center text-purple-600 shadow-sm">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#0B1E3B] tracking-tight mb-2">
                        No-Meeting Wednesdays
                      </h3>
                      <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                        We protect developers' deep focus. Mid-week days are dedicated purely to code, research, learning, and building without unnecessary meetings.
                      </p>
                    </div>

                    <div className="pt-1">
                      <span className="px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200/60 text-[10px] font-bold uppercase tracking-wider inline-block">
                        FOCUS & PRODUCTIVITY
                      </span>
                    </div>
                  </div>

                  {/* Minimal Calendar & Productivity Illustration */}
                  <div className="relative w-36 h-32 sm:w-44 sm:h-36 shrink-0 flex items-center justify-center self-center sm:self-auto z-10">
                    <div className="w-full h-full bg-gradient-to-br from-purple-50 via-indigo-50/50 to-purple-100/30 rounded-2xl border border-purple-200/60 p-3.5 shadow-inner flex flex-col justify-between relative overflow-hidden">
                      {/* Calendar Header with Rings */}
                      <div className="flex items-center justify-between border-b border-purple-200/60 pb-2">
                        <div className="flex space-x-1.5">
                          <span className="w-1.5 h-3 rounded-full bg-purple-300" />
                          <span className="w-1.5 h-3 rounded-full bg-purple-300" />
                        </div>
                        <span className="text-[10px] font-bold text-purple-700 tracking-wider">WEDNESDAY</span>
                        <span className="w-2 h-2 rounded-full bg-purple-400" />
                      </div>

                      {/* Calendar Grid Representation */}
                      <div className="grid grid-cols-4 gap-1.5 py-1">
                        <span className="h-2 rounded bg-purple-200/40" />
                        <span className="h-2 rounded bg-purple-200/40" />
                        <span className="h-2 rounded bg-purple-200/40" />
                        <span className="h-2 rounded bg-purple-200/40" />
                        <span className="h-2 rounded bg-purple-200/40" />
                        <span className="h-2 rounded bg-purple-400/80 font-bold" />
                        <span className="h-2 rounded bg-purple-200/40" />
                        <span className="h-2 rounded bg-purple-200/40" />
                      </div>

                      {/* Focus Status Indicator */}
                      <div className="self-end px-2.5 py-1 rounded-full bg-white text-purple-700 border border-purple-200 shadow-sm flex items-center space-x-1.5 text-[9px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                        <span>Deep Flow</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ROW 2: CARD 5 — COLLABORATION QUOTE (Soft Mint Green Accent — 5 cols) */}
                <div className="col-span-1 md:col-span-2 lg:col-span-5 bg-white rounded-[26px] p-7 sm:p-8 border border-emerald-100/80 shadow-[0_10px_30px_-5px_rgba(16,185,129,0.05)] hover:shadow-[0_16px_36px_-6px_rgba(16,185,129,0.12)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group">
                  {/* Subtle Corner Accent */}
                  <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-gradient-to-br from-emerald-100/70 to-teal-50/20 pointer-events-none" />

                  <div>
                    {/* Quotation Icon */}
                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100/90 flex items-center justify-center text-emerald-600 shadow-sm mb-5">
                      <Quote className="w-5 h-5 fill-emerald-500/20 text-emerald-600" />
                    </div>

                    {/* Quote text */}
                    <p className="text-[14.5px] sm:text-[15px] italic text-slate-700 leading-relaxed font-normal">
                      "Working asynchronously is our superpower. We pair program over codebases and communicate through design RFCs instead of sitting in long daily standups."
                    </p>
                  </div>

                  <div>
                    {/* Thin divider */}
                    <div className="h-px w-full bg-emerald-100/80 my-5" />

                    {/* Team Member Info */}
                    <div className="flex items-center space-x-3.5">
                      <img
                        src="/rohan_avatar.png"
                        alt="Rohan Verma"
                        className="h-11 w-11 rounded-full object-cover ring-2 ring-emerald-100 shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-[#0B1E3B] leading-tight">Rohan Verma</h4>
                        <p className="text-xs text-emerald-600 font-medium mt-0.5">Frontend Architect</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 5: WHAT WE LOOK FOR */}
            <div className="space-y-12 py-12">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-[#EC4899] text-xs font-bold uppercase tracking-wider">
                  <Award className="h-3.5 w-3.5" />
                  <span>OUR CULTURE</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                  What We <span className="text-[#3B82F6] relative inline-block">Look For<svg className="absolute -top-3 -right-6 w-5 h-5 text-[#3B82F6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 14l4-4M10 8l4-4M16 4l4-2" /></svg></span>
                </h2>
                <p className="text-slate-500 text-sm md:text-base font-semibold">The qualities that make a great BNX team member.</p>
              </div>

              {/* Large 3-Column x 2-Row Culture Cards Grid */}
              <WhatWeLookForCardsGrid />
            </div>



            {/* SECTION 8: CALL TO ACTION SECTION */}
            <div className="cta-block relative overflow-hidden rounded-3xl p-10 md:p-16 border border-blue-100 bg-gradient-to-r from-blue-50/90 via-sky-50/80 to-blue-50/90 text-center shadow-xl shadow-blue-500/5">
              {/* Subtle blue background glow circles inside CTA */}
              <div className="absolute top-[-30px] left-[-30px] w-48 h-48 bg-blue-200/30 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-[-30px] right-[-30px] w-64 h-64 bg-sky-200/30 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-black text-black leading-tight tracking-tight">
                  Ready to Build Something Amazing?
                </h2>
                <p className="text-black max-w-xl mx-auto text-sm md:text-base leading-relaxed font-semibold">
                  Join a team of creators, system architects, and designers scaling software to thousands of businesses globally.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <a
                    href="#search-roles"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-black bg-gradient-to-r from-[#004AAD] to-blue-600 hover:from-[#003A8C] hover:to-blue-700 text-white transition-all duration-300 hover:scale-[1.02] shadow-md shadow-blue-500/20 no-underline"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </div>

            {/* SECTION 9: OUR VALUES SECTION */}
            <div className="space-y-16 py-16 mt-12 md:mt-16 border-t border-slate-100">
              <div className="text-center max-w-3xl mx-auto space-y-4 px-4">
                <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#8B5CF6]/10 to-[#EC4899]/10 border border-[#8B5CF6]/20 text-[#8B5CF6] text-xs font-extrabold uppercase tracking-widest">
                  <Sparkles className="h-3.5 w-3.5 text-[#EC4899] animate-pulse" />
                  <span>Our Values</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                  The Foundations of Our Culture
                </h2>
                <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto font-semibold leading-relaxed">
                  These core values drive our decisions, guide our product architectural choices, and inspire our team members every single day.
                </p>
              </div>

              {/* Premium Vertical Stacked Card Scroll Deck */}
              <OurValuesScrollStack />
            </div>

            {/* SECTION 10: PREMIUM CALL TO ACTION SECTION */}
            <div className="relative overflow-hidden rounded-3xl p-10 md:p-16 border border-purple-100 bg-gradient-to-r from-purple-50/90 via-fuchsia-50/80 to-pink-50/90 text-center shadow-xl shadow-purple-500/5 mt-12 md:mt-16 mx-4 md:mx-6 group">
              {/* Subtle background glow circles inside CTA */}
              <div className="absolute top-[-30px] left-[-30px] w-48 h-48 bg-[#8B5CF6]/10 rounded-full blur-2xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute bottom-[-30px] right-[-30px] w-64 h-64 bg-[#EC4899]/10 rounded-full blur-2xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />

              <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[#EC4899] text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5 text-[#EC4899] animate-pulse" />
                  <span>Join Our Journey</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                  Your Future Starts Here
                </h2>
                <p className="text-slate-650 max-w-xl mx-auto text-sm md:text-base leading-relaxed font-semibold">
                  At Beta,every idea matters, every challenge is an opportunity to grow, and every team member contributes to building innovative solutions. If you're ready to learn, collaborate, and make an impact, we'd love to have you on our journey.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <a
                    href="#search-roles"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('search-roles')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-black bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] hover:from-[#7c4ee6] hover:to-[#db3c8b] text-white transition-all duration-300 hover:scale-[1.02] shadow-md shadow-purple-500/20 no-underline cursor-pointer border-none text-center"
                  >
                    Explore careers
                  </a>
                  <a
                    href="mailto:hr@betasoftnet.com"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-black bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 transition-all duration-300 hover:scale-[1.02] shadow-md shadow-slate-200/50 no-underline cursor-pointer text-center"
                  >
                    Contact HR
                  </a>
                </div>
              </div>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-4xl mx-auto space-y-8 py-8 animate-fadeIn"
          >
            {/* Header / Navigation Bar for My Jobs */}
            <div id="my-apps-header" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/10 pb-6">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#EC4899] uppercase tracking-widest block">Candidate Workspace</span>
                <h2 className="text-3xl font-black text-slate-900">My Applications</h2>
                <p className="text-slate-500 text-sm font-medium">Track your active roles and interview updates</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowMyJobs(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-purple-500/20 bg-white text-slate-700 hover:bg-slate-50 transition-all duration-300 text-xs font-bold shadow-sm cursor-pointer whitespace-nowrap self-start sm:self-auto"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Open Positions</span>
              </button>
            </div>

            {myJobsLoading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="h-10 w-10 border-4 border-purple-500/30 border-t-purple-600 rounded-full animate-spin" />
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider animate-pulse">Retrieving application history...</p>
              </div>
            ) : myJobsError ? (
              <div className="py-16 text-center space-y-4 bg-white border border-purple-100 rounded-3xl p-8 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto text-rose-500">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <h4 className="text-base font-bold text-slate-800">Something went wrong</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">{myJobsError}</p>
                <button
                  onClick={fetchUserApplications}
                  className="px-5 py-2 rounded-xl bg-purple-600 text-white text-xs font-extrabold shadow-md hover:bg-purple-700 transition cursor-pointer"
                >
                  Retry Fetching
                </button>
              </div>
            ) : userApplications.length === 0 ? (
              <div className="py-20 text-center space-y-6 bg-white border border-purple-100 rounded-3xl p-8 shadow-sm">
                <div className="h-16 w-16 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center mx-auto text-[#EC4899] shadow-sm">
                  <Briefcase className="h-8 w-8 text-purple-400" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-800">No Applications Found</h4>
                  <p className="text-slate-500 text-xs leading-relaxed max-w-sm mx-auto">
                    You haven't submitted any job applications yet. Apply to our open roles to track them here!
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowMyJobs(false);
                    setTimeout(() => {
                      document.getElementById('search-roles')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white text-xs font-extrabold transition cursor-pointer shadow-md"
                >
                  Explore Opportunities
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  {currentMyJobs.map((app) => {
                    const rawStatus = app.status || '';
                    const aptitudeStatus = (app.aptitudeStatus || '').toLowerCase().trim();
                    const isRejected = rawStatus.toLowerCase().trim() === 'rejected';

                    // Calculate step completion and reach dynamically
                    const steps = ['Application', 'Assessment', 'Technical interview', 'Task Assessment', 'HR interview', 'Offer'];

                    const stepStates = steps.map((stepName) => {
                      const statusLower = (app.status || '').toLowerCase().trim();
                      const aptitudeStatusLower = (app.aptitudeStatus || '').toLowerCase().trim();
                      const assessmentSubmitted = app.assessmentSubmitted === true || app.assessmentSubmitted === 'true';

                      let isCompleted = false;
                      let isReached = false;

                      switch (stepName) {
                        case 'Application':
                          isCompleted = true;
                          isReached = true;
                          break;

                        case 'Assessment':
                          isCompleted = assessmentSubmitted || aptitudeStatusLower === 'completed';
                          isReached = true;
                          break;

                        case 'Technical interview':
                          isCompleted = [
                            'reviewed', 'accepted', 'joined', 'selected', 'approved', 'offer sent',
                            'task assessment', 'task assigned', 'task submitted', 'task',
                            'hr interview', 'hr scheduled', 'hr round', 'hr'
                          ].includes(statusLower) ||
                            app.taskAssigned === true ||
                            (app.githubLink && app.githubLink.trim() !== '') ||
                            (app.hrInterviewDate || app.hrInterviewTime || app.hrInterviewLocation);

                          isReached = !!(app.interviewDate || app.interviewTime || app.interviewLink) ||
                            ['technical interview', 'interview scheduled', 'scheduled', 'technical', 'round 2 technical', 'technical assessment'].includes(statusLower);
                          break;

                        case 'Task Assessment':
                          isCompleted = !!(app.githubLink && app.githubLink.trim() !== '');
                          isReached = app.taskAssigned === true ||
                            ['task assessment', 'task assigned', 'task submitted', 'task'].includes(statusLower) ||
                            isCompleted;
                          break;

                        case 'HR interview':
                          isCompleted = ['accepted', 'joined', 'selected', 'approved', 'offer sent'].includes(statusLower);
                          isReached = !!(app.hrInterviewDate || app.hrInterviewTime || app.hrInterviewLocation) ||
                            ['hr interview', 'hr scheduled', 'hr round', 'hr'].includes(statusLower) ||
                            isCompleted;
                          break;

                        case 'Offer':
                          isCompleted = statusLower === 'joined';
                          isReached = ['accepted', 'selected', 'approved', 'offer sent', 'joined'].includes(statusLower);
                          break;

                        default:
                          break;
                      }

                      return { stepName, isCompleted, isReached };
                    });

                    // Determine activeIdx as the highest index that is reached or completed
                    let activeIdx = 0;
                    for (let i = 0; i < stepStates.length; i++) {
                      if (stepStates[i].isReached || stepStates[i].isCompleted) {
                        activeIdx = i;
                      }
                    }
                    console.log('[Careers TRACE] Calculated activeIdx and step states:', {
                      id: app.id,
                      jobTitle: app.jobTitle,
                      status: app.status,
                      stepStates,
                      activeIdx,
                      finalStageRendered: steps[activeIdx]
                    });

                    return (
                      <div
                        key={app.id}
                        className="glass-card-purple p-6 rounded-3xl border border-purple-500/10 flex flex-col gap-6 relative overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                      >
                        {/* Upper card header */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div>
                            <h4 className="text-lg font-black text-slate-900 transition-colors">
                              {app.jobTitle || 'General Opening'}
                            </h4>
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-xs text-slate-500 font-semibold">
                              <span className="text-[#EC4899] font-extrabold uppercase tracking-wide text-[10px]">
                                {app.jobDepartment || 'Engineering'}
                              </span>
                              <span>&bull;</span>
                              <span>{app.jobLocation || 'Tiruvallur'}</span>
                              {app.experience && (
                                <>
                                  <span>&bull;</span>
                                  <span>{app.experience}</span>
                                </>
                              )}
                              <span>&bull;</span>
                              <span className="text-[11px] text-slate-400 font-medium">
                                <AppliedTime timestamp={app.appliedTime || app.appliedDate || app.createdAt} />
                              </span>
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div className="flex-shrink-0">
                            <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${isRejected
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : activeIdx === 5
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-purple-50 text-purple-700 border-purple-200'
                              }`}>
                              {isRejected ? 'Rejected' : steps[activeIdx]}
                            </span>
                          </div>
                        </div>

                        {/* Interactive Steps Visualizer */}
                        <div className="border-t border-purple-500/10 pt-5 pb-2">
                          <div className="relative flex items-center justify-between w-full">
                            {/* Connector Line */}
                            <div className="absolute left-3 right-3 top-3 h-[2px] bg-slate-100 z-0">
                              <div
                                className={`h-full transition-all duration-500 ${isRejected ? 'bg-rose-500' : 'bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-emerald-500'}`}
                                style={{ width: `${(activeIdx / (steps.length - 1)) * 100}%` }}
                              />
                            </div>

                            {/* Node Circles */}
                            {steps.map((stepName, idx) => {
                              const isCompleted = stepStates[idx].isCompleted;
                              const isActive = idx === activeIdx && !isCompleted;
                              const isRejectedNode = isRejected && isActive;

                              let circleClasses = 'bg-white border-slate-200 text-slate-400';
                              if (isCompleted) {
                                circleClasses = 'bg-[#8B5CF6] border-[#8B5CF6] text-white shadow-sm';
                              } else if (isActive) {
                                circleClasses = isRejectedNode
                                  ? 'bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-200 animate-pulse'
                                  : 'bg-[#EC4899] border-[#EC4899] text-white shadow-md shadow-pink-200 animate-pulse';
                              }

                              return (
                                <div key={stepName} className="flex flex-col items-center relative z-10 flex-1 text-center px-1">
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 text-[10px] font-black transition-all duration-300 ${circleClasses}`}>
                                    {isCompleted ? '✓' : idx + 1}
                                  </div>
                                  <span className={`text-[8.5px] font-bold mt-1.5 uppercase tracking-wide block ${isActive ? (isRejectedNode ? 'text-rose-600 font-black' : 'text-[#EC4899] font-black') : isCompleted ? 'text-slate-700' : 'text-slate-400'}`}>
                                    {stepName}
                                  </span>
                                  {stepName === 'Assessment' && activeIdx >= 1 && (
                                    <a
                                      href="https://www.bnxmail.com/login"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-[8px] sm:text-[9px] font-extrabold text-[#8B5CF6] hover:text-[#EC4899] underline mt-1 block transition-colors duration-200"
                                    >
                                      BNX Mail
                                    </a>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Actionable status details below tracker */}
                        {isRejected ? (
                          <div className="mt-1 p-3.5 bg-rose-500/5 border border-rose-500/20 rounded-xl text-left text-xs">
                            <span className="font-extrabold text-rose-600 uppercase tracking-wider block mb-0.5">Application Closed</span>
                            <p className="text-slate-500 font-medium">
                              We sincerely appreciate the time you spent interviewing with us. While we are not advancing with this specific role at present, we will keep your file for matching future openings.
                            </p>
                          </div>
                        ) : activeIdx === 0 ? (
                          <div className="mt-1 p-3.5 bg-purple-500/5 border border-purple-500/20 rounded-xl text-left text-xs">
                            <span className="font-extrabold text-purple-600 uppercase tracking-wider block mb-0.5">Application Received</span>
                            <p className="text-slate-500 font-medium">
                              Your profile has been logged and is under initial review by our talent acquisition team.
                            </p>
                          </div>
                        ) : activeIdx === 1 ? (
                          <div className="mt-1">
                            {app.aptitudeStatus === 'Completed' || app.assessmentSubmitted ? (
                              <div className="p-3.5 bg-emerald-500/5 border border-emerald-500/20 rounded-xl text-left text-xs">
                                <span className="font-extrabold text-emerald-600 uppercase tracking-wider block mb-0.5">Assessment Completed</span>
                                <p className="text-slate-500 font-medium mb-2.5">
                                  Your Test Round answers have been logged{app.aptitudeScore !== '' && app.aptitudeScore !== undefined ? ` (Score: ${app.aptitudeScore}%)` : ''}. Recruiting managers are reviewing your evaluation.
                                </p>
                                <a
                                  href="https://www.bnxmail.com/login"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-[#8B5CF6] hover:text-[#EC4899] font-extrabold underline transition duration-200"
                                >
                                  Open BNX Mail to check communications &rarr;
                                </a>
                              </div>
                            ) : (
                              <div className="p-3.5 bg-purple-500/5 border border-purple-500/20 rounded-xl text-left text-xs">
                                <span className="font-extrabold text-purple-600 uppercase tracking-wider block mb-0.5">Assessment Phase</span>
                                <p className="text-slate-500 font-medium mb-2.5">
                                  Your profile is undergoing assessment. The test will be conducted and provided by the admin.
                                </p>
                                <a
                                  href="https://www.bnxmail.com/login"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-[#8B5CF6] hover:text-[#EC4899] font-extrabold underline transition duration-200"
                                >
                                  Open BNX Mail to check for assessment link &rarr;
                                </a>
                              </div>
                            )}
                          </div>
                        ) : activeIdx === 2 ? (
                          <div className="mt-1">
                            {app.interviewDate || app.interviewTime ? (
                              <div className="p-3.5 bg-blue-500/5 border border-blue-500/20 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                                <div className="text-left">
                                  <span className="font-extrabold text-blue-600 uppercase tracking-wider block mb-0.5">Technical Interview Scheduled</span>
                                  <p className="text-slate-500 font-medium">
                                    📅 <strong>Date:</strong> {app.interviewDate || 'To be notified'} {app.interviewTime ? `at ${app.interviewTime}` : ''}
                                  </p>
                                </div>
                                {app.interviewLink && (
                                  <a
                                    href={app.interviewLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl transition-all cursor-pointer text-center whitespace-nowrap shadow-sm"
                                  >
                                    Join Google Meet
                                  </a>
                                )}
                              </div>
                            ) : (
                              <div className="p-3.5 bg-blue-500/5 border border-blue-500/20 rounded-xl text-left text-xs">
                                <span className="font-extrabold text-blue-600 uppercase tracking-wider block mb-0.5">Technical Interview Stage</span>
                                <p className="text-slate-500 font-medium">
                                  Congratulations on clearing the Test Round! Scheduling your Technical Interview is in progress. Check your email for invites.
                                </p>
                              </div>
                            )}
                          </div>
                        ) : activeIdx === 3 ? (
                          <div className="mt-1 space-y-2">
                            {app.githubLink ? (
                              <div className="p-3.5 bg-emerald-500/5 border border-emerald-500/20 rounded-xl text-left text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div>
                                  <span className="font-extrabold text-emerald-600 uppercase tracking-wider block mb-0.5">Task Assessment Submitted</span>
                                  <p className="text-slate-500 font-medium break-all">
                                    ✓ <strong>Submitted Solution:</strong> <a href={app.githubLink} target="_blank" rel="noopener noreferrer" className="text-violet-650 underline font-bold">{app.githubLink}</a>
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div className="p-3.5 bg-violet-500/5 border border-violet-500/20 rounded-xl text-left text-xs space-y-3">
                                <div>
                                  <span className="font-extrabold text-violet-700 uppercase tracking-wider block mb-0.5">Task Assessment Assigned</span>
                                  <p className="text-slate-500 font-medium">
                                    Please complete the task instructions sent to your email and submit your GitHub repository link below.
                                  </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2">
                                  <input
                                    type="url"
                                    placeholder="https://github.com/your-username/your-repo"
                                    value={gitLinks[app.id] || ''}
                                    onChange={(e) => setGitLinks(prev => ({ ...prev, [app.id]: e.target.value }))}
                                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 bg-white"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleSubmittingGit(app.id)}
                                    disabled={submittingGit[app.id] || !(gitLinks[app.id] || '').trim()}
                                    className="px-4 py-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition cursor-pointer whitespace-nowrap shadow-xs border-none"
                                  >
                                    {submittingGit[app.id] ? 'Submitting...' : 'Submit Repository'}
                                  </button>
                                </div>
                                {gitErrors[app.id] && (
                                  <p className="text-[10px] font-bold text-rose-600">{gitErrors[app.id]}</p>
                                )}
                              </div>
                            )}
                          </div>
                        ) : activeIdx === 4 ? (
                          <div className="mt-1">
                            {app.hrInterviewDate || app.hrInterviewTime || app.hrInterviewLocation ? (
                              <div className="p-3.5 bg-purple-500/5 border border-purple-500/20 rounded-xl text-left text-xs space-y-1">
                                <span className="font-extrabold text-purple-600 uppercase tracking-wider block mb-0.5">HR Interview Scheduled</span>
                                <p className="text-slate-500 font-medium">
                                  🏢 <strong>Date:</strong> {app.hrInterviewDate || 'To be notified'} {app.hrInterviewTime ? `at ${app.hrInterviewTime}` : ''}
                                </p>
                                {app.hrInterviewLocation && (
                                  <p className="text-slate-500 font-medium">
                                    📍 <strong>Venue:</strong> {app.hrInterviewLocation.startsWith('http') ? (
                                      <a href={app.hrInterviewLocation} target="_blank" rel="noopener noreferrer" className="text-violet-650 underline font-bold">Open Venue Map</a>
                                    ) : (
                                      <strong className="text-slate-800">{app.hrInterviewLocation}</strong>
                                    )}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <div className="p-3.5 bg-purple-500/5 border border-purple-500/20 rounded-xl text-left text-xs">
                                <span className="font-extrabold text-purple-600 uppercase tracking-wider block mb-0.5">HR Interview Stage</span>
                                <p className="text-slate-500 font-medium">
                                  You have cleared the Task Assessment and are shortlisted for the final HR Interview stage. Scheduling details will be shared shortly.
                                </p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="mt-1 p-3.5 bg-emerald-500/5 border border-emerald-500/20 rounded-xl text-left text-xs">
                            <span className="font-extrabold text-emerald-600 uppercase tracking-wider block mb-0.5">Offer</span>
                            <p className="text-slate-500 font-medium">
                              🎉 Congratulations! You have successfully cleared all selection rounds. An onboarding specialist will contact you with the offer proposal and joining details.
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Pagination Controls */}
                {totalMyJobsPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-purple-500/10 w-full mt-4">
                    <span className="text-xs font-semibold text-slate-500">
                      Showing {indexOfFirstMyJob + 1}-{Math.min(indexOfLastMyJob, userApplications.length)} of {userApplications.length} applications
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={myJobsPage === 1}
                        onClick={() => {
                          setMyJobsPage(prev => Math.max(prev - 1, 1));
                          document.getElementById('my-apps-header')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition duration-300 flex items-center gap-1 ${myJobsPage === 1
                          ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
                          : 'bg-white border-purple-500/20 text-slate-700 hover:bg-slate-50 cursor-pointer hover:border-purple-500/40 hover:text-purple-600'
                          }`}
                      >
                        <ChevronLeft className="h-3.5 w-3.5" />
                        <span>Previous</span>
                      </button>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalMyJobsPages }, (_, idx) => idx + 1).map((pNum) => (
                          <button
                            key={pNum}
                            type="button"
                            onClick={() => {
                              setMyJobsPage(pNum);
                              document.getElementById('my-apps-header')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`h-8 w-8 rounded-xl text-xs font-bold transition duration-300 cursor-pointer ${myJobsPage === pNum
                              ? 'bg-[#8B5CF6] text-white shadow-sm'
                              : 'bg-white border border-purple-500/10 text-slate-700 hover:bg-slate-50'
                              }`}
                          >
                            {pNum}
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        disabled={myJobsPage === totalMyJobsPages}
                        onClick={() => {
                          setMyJobsPage(prev => Math.min(prev + 1, totalMyJobsPages));
                          document.getElementById('my-apps-header')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition duration-300 flex items-center gap-1 ${myJobsPage === totalMyJobsPages
                          ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
                          : 'bg-white border-purple-500/20 text-slate-700 hover:bg-slate-50 cursor-pointer hover:border-purple-500/40 hover:text-purple-600'
                          }`}
                      >
                        <span>Next</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </div>

      {/* APPLICATION FORM MODAL (FEATURED JOBS TARGET) */}
      <AnimatePresence>
        {selectedJob && (
          <div
            onClick={() => setSelectedJob(null)}
            className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-start justify-center p-4 py-8 sm:py-12"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 md:p-8 border border-purple-100 shadow-2xl text-left my-auto"
            >
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="absolute right-4 top-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 border-none transition duration-200 cursor-pointer flex items-center justify-center shadow-sm"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="mb-6 space-y-1">
                <span className="text-xs font-bold text-[#EC4899] uppercase tracking-widest">Apply for position</span>
                <h3 className="text-2xl font-black">{selectedJob.title}</h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                  {selectedJob.team} &bull; {selectedJob.location}
                  {selectedJob.salary && ` • ${selectedJob.salary}`}
                  {selectedJob.experience && ` • ${selectedJob.experience}`}
                </p>
              </div>

              {!user ? (
                <div className="py-8 text-center space-y-6">
                  <div className="h-16 w-16 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center mx-auto text-[#EC4899] shadow-sm">
                    <AlertCircle className="h-8 w-8 animate-pulse" />
                  </div>
                  <h4 className="text-lg font-bold">Sign In Required</h4>
                  <p className="text-slate-500 text-xs leading-relaxed max-w-xs mx-auto">
                    You must be logged in to apply for active job openings. Please sign in to your account.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedJob(null);
                      redirectToSSO('/careers');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] hover:from-[#7c4ee6] hover:to-[#db3c8b] text-white text-xs font-extrabold transition cursor-pointer border-none shadow-md"
                  >
                    Sign In to Apply
                  </button>
                </div>
              ) : status === 'success' ? (
                <div className="py-8 text-center space-y-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold">Application Received!</h4>
                  <div className="space-y-3">
                    <p className="text-slate-500 text-xs leading-relaxed max-w-sm mx-auto">{message}</p>
                    <p className="inline-block bg-purple-50 border border-purple-100 rounded-xl py-2 px-4 text-[#8B5CF6] text-xs font-semibold leading-relaxed mx-auto">
                      You will receive mail through{' '}
                      <a
                        href="https://www.bnxmail.com/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline font-black hover:text-[#EC4899] transition-all"
                      >
                        BNX mail
                      </a>.
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="px-6 py-2.5 rounded-xl bg-purple-600/10 hover:bg-gradient-to-r hover:from-[#8B5CF6] hover:to-[#EC4899] text-[#8B5CF6] hover:text-white border border-purple-500/30 text-xs font-extrabold transition cursor-pointer"
                  >
                    Close Modal
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-4">
                  {/* Pre-fetched Logged-in User Information */}
                  <div className="p-4 bg-purple-50/50 border border-purple-100 rounded-2xl text-xs font-semibold animate-fadeIn text-left">
                    <div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Email Address</span>
                      <span className="text-slate-850 text-sm font-bold">{email || "Not Available"}</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full bg-white text-slate-800 placeholder-slate-400 border border-purple-200 rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#EC4899] text-sm transition font-semibold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
                    <input
                      type="tel"
                      pattern="[0-9]{10}"
                      maxLength="10"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="e.g. 9876543210"
                      className="w-full bg-white text-slate-800 placeholder-slate-400 border border-purple-200 rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#EC4899] text-sm transition font-semibold"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-slate-500 uppercase">Total Work Experience</label>
                    <select
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full bg-white text-slate-800 border border-purple-200 rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#EC4899] text-sm transition font-semibold cursor-pointer"
                    >
                      <option value="Fresher / 0-1 Years">Fresher / 0-1 Years</option>
                      <option value="1-2 Years">1-2 Years</option>
                      <option value="2-3 Years">2-3 Years</option>
                      <option value="3-5 Years">3-5 Years</option>
                      <option value="5+ Years">5+ Years</option>
                    </select>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-slate-500 uppercase">Cover Letter</label>
                    <textarea
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder="Write your cover letter or introduction..."
                      rows={4}
                      className="w-full bg-white text-slate-800 placeholder-slate-400 border border-purple-200 rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#EC4899] text-sm transition font-semibold resize-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Resume Upload (PDF Only)</label>
                    <div className="relative border border-dashed border-purple-300 rounded-xl p-6 bg-slate-50 hover:bg-slate-100/60 transition flex flex-col items-center justify-center cursor-pointer">
                      <input
                        type="file"
                        accept=".pdf"
                        required
                        onChange={(e) => setResume(e.target.files[0])}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Upload className="h-6 w-6 text-purple-400 mb-2" />
                      <span className="text-xs text-[#EC4899] font-bold">
                        {resume ? resume.name : 'Click or drag PDF resume here'}
                      </span>
                    </div>
                  </div>



                  {status === 'error' && (
                    <div className="flex items-center space-x-2 text-rose-600 text-xs p-3 rounded-xl bg-rose-50 border border-rose-100">
                      <AlertCircle className="h-4.5 w-4.5 flex-shrink-0" />
                      <span>{message}</span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedJob(null)}
                      className="flex-1 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition cursor-pointer text-center"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="flex-[2] py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white text-xs font-black transition flex items-center justify-center space-x-2 disabled:from-slate-200 disabled:to-slate-300 disabled:text-slate-400 cursor-pointer border-none"
                    >
                      {status === 'loading' ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <Briefcase className="h-4.5 w-4.5 text-white" />
                          <span>Submit Application</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>



      {/* SIGN IN REQUIRED FOR MY JOBS */}
      <AnimatePresence>
        {showLoginPrompt && (
          <div
            onClick={() => setShowLoginPrompt(false)}
            className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-white rounded-3xl p-6 md:p-8 border border-purple-100 shadow-2xl text-left my-auto"
            >
              <button
                type="button"
                onClick={() => setShowLoginPrompt(false)}
                className="absolute right-4 top-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 border-none transition duration-200 cursor-pointer flex items-center justify-center shadow-sm"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="py-6 text-center space-y-6">
                <div className="h-16 w-16 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center mx-auto text-[#EC4899] shadow-sm">
                  <AlertCircle className="h-8 w-8 animate-pulse" />
                </div>
                <h4 className="text-lg font-bold">Sign In Required</h4>
                <p className="text-slate-500 text-xs leading-relaxed max-w-xs mx-auto">
                  Please sign in to view and track your job application updates.
                </p>
                <button
                  onClick={() => {
                    setShowLoginPrompt(false);
                    redirectToSSO('/careers');
                  }}
                  className="w-full px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] hover:from-[#7c4ee6] hover:to-[#db3c8b] text-white text-xs font-extrabold transition cursor-pointer border-none shadow-md"
                >
                  Sign In to View Applications
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
