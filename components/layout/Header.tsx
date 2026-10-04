'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Calculator, 
  MapPin, 
  BookOpen, 
  CheckSquare, 
  Menu, 
  X, 
  ChevronDown,
  ArrowRightLeft,
  DollarSign,
  Home as HomeIcon,
  TrendingUp,
  Percent,
  Sparkles,
  ShieldCheck,
  Star
} from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setToolsDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  const toolLinks = [
    {
      title: 'Moving Cost Calculator',
      href: '/tools/moving-cost-calculator',
      icon: DollarSign,
      color: 'text-red-600 bg-red-50 border-red-200',
      description: 'Estimate Low, Typical, High interstate move costs'
    },
    {
      title: 'Cost of Living Calculator',
      href: '/tools/cost-of-living-calculator',
      icon: ArrowRightLeft,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      description: 'Compare side-by-side state & city monthly expenses'
    },
    {
      title: 'Take-Home Pay Calculator',
      href: '/tools/take-home-pay-calculator',
      icon: Percent,
      color: 'text-red-600 bg-red-50 border-red-200',
      description: 'Calculate net paycheck after federal & state taxes'
    },
    {
      title: 'Rent Affordability Calculator',
      href: '/tools/rent-affordability-calculator',
      icon: HomeIcon,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      description: 'Find recommended rent brackets by income and debt'
    },
    {
      title: 'Move Score™ Calculator',
      href: '/tools/move-score',
      icon: TrendingUp,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      description: 'Get a personalized 0-100 relocation suitability score'
    }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Patriotic US Flag Top Stripe Bar */}
      <div className="w-full h-1 bg-gradient-to-r from-red-600 via-white to-blue-700" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo with American Colors */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 flex items-center justify-center text-white font-black shadow-md border-2 border-red-600/80 group-hover:scale-105 transition-all">
                <span className="text-sm font-black tracking-tighter text-white">USA</span>
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-black text-xl leading-tight tracking-tight text-blue-950">
                    Move<span className="text-red-600">America</span>
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded border border-blue-200">
                    USA
                  </span>
                </div>
                <span className="text-[10px] tracking-wider text-slate-500 font-semibold uppercase">
                  US Relocation Decision Platform
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1.5">
              <Link
                href="/compare"
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  pathname?.startsWith('/compare')
                    ? 'text-blue-900 bg-blue-50 border border-blue-200/80'
                    : 'text-slate-700 hover:text-blue-900 hover:bg-slate-100/80'
                }`}
              >
                Compare States
              </Link>

              {/* Fixed Robust Calculators Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setToolsDropdownOpen((prev) => !prev)}
                  onMouseEnter={() => setToolsDropdownOpen(true)}
                  aria-expanded={toolsDropdownOpen}
                  aria-haspopup="true"
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    toolsDropdownOpen || pathname?.startsWith('/tools')
                      ? 'text-red-700 bg-red-50/80 border border-red-200'
                      : 'text-slate-700 hover:text-red-700 hover:bg-slate-100/80'
                  }`}
                >
                  <Calculator className="w-4 h-4 text-red-600" />
                  <span>Calculators</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      toolsDropdownOpen ? 'rotate-180 text-red-600' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu Container */}
                {toolsDropdownOpen && (
                  <div
                    onMouseLeave={() => setToolsDropdownOpen(false)}
                    className="absolute left-0 mt-2 w-88 bg-white rounded-2xl shadow-2xl border-2 border-slate-100 py-3 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <div className="px-3 py-2 text-[11px] font-black uppercase tracking-wider text-blue-900 flex items-center justify-between border-b border-slate-100 mb-2">
                      <span className="flex items-center gap-1.5">
                        <Star className="w-3 h-3 text-red-600 fill-red-600" />
                        <span>Interactive US Calculators</span>
                      </span>
                      <Link
                        href="/tools"
                        onClick={() => setToolsDropdownOpen(false)}
                        className="text-[11px] text-red-600 hover:text-red-700 font-bold lowercase hover:underline"
                      >
                        view all →
                      </Link>
                    </div>

                    <div className="space-y-1">
                      {toolLinks.map((tool) => {
                        const Icon = tool.icon;
                        return (
                          <Link
                            key={tool.href}
                            href={tool.href}
                            onClick={() => setToolsDropdownOpen(false)}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                          >
                            <div className={`p-2 rounded-lg border ${tool.color} group-hover:scale-110 transition-transform shrink-0`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                                {tool.title}
                              </div>
                              <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                {tool.description}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/moving-guides/checklist"
                className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                  pathname?.includes('checklist')
                    ? 'text-blue-900 bg-blue-50 border border-blue-200/80'
                    : 'text-slate-700 hover:text-blue-900 hover:bg-slate-100/80'
                }`}
              >
                <CheckSquare className="w-4 h-4 text-red-600" />
                <span>Moving Checklist</span>
              </Link>

              <Link
                href="/blog"
                className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                  pathname?.startsWith('/blog')
                    ? 'text-blue-900 bg-blue-50 border border-blue-200/80'
                    : 'text-slate-700 hover:text-blue-900 hover:bg-slate-100/80'
                }`}
              >
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Guides & Research</span>
              </Link>
            </nav>
          </div>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/compare/states/california-vs-texas"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-md shadow-red-500/20 transition-all hover:scale-105"
            >
              ★ Compare CA vs TX
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-blue-900 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-red-600" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/compare"
            className="block px-3 py-2.5 rounded-xl text-base font-bold text-slate-900 hover:bg-blue-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            Compare States Directory
          </Link>
          <div className="border-t border-slate-100 pt-3">
            <div className="px-3 text-xs font-black text-blue-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-red-600 fill-red-600" />
              <span>Calculators & Tools</span>
            </div>
            {toolLinks.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-red-50 hover:text-red-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                {tool.title}
              </Link>
            ))}
          </div>
          <Link
            href="/moving-guides/checklist"
            className="block px-3 py-2.5 rounded-xl text-base font-bold text-slate-900 hover:bg-blue-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            Interactive Moving Checklist
          </Link>
          <Link
            href="/blog"
            className="block px-3 py-2.5 rounded-xl text-base font-bold text-slate-900 hover:bg-blue-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            Moving Guides & Cost Analysis
          </Link>
          <div className="pt-2">
            <Link
              href="/compare/states/california-vs-texas"
              className="w-full flex items-center justify-center px-4 py-3 rounded-xl text-sm font-black uppercase tracking-wider bg-red-600 text-white shadow-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              ★ Compare CA vs TX Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
