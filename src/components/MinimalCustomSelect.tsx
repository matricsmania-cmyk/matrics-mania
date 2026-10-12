'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check, Search, X } from 'lucide-react';

export interface CategoryGroup {
  category?: string;
  region?: string;
  options: string[];
}

interface MinimalCustomSelectProps {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  icon: React.ReactNode;
  categories: CategoryGroup[];
}

export const MinimalCustomSelect: React.FC<MinimalCustomSelectProps> = ({
  id,
  label,
  required = false,
  optional = false,
  value,
  onChange,
  placeholder,
  icon,
  categories,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter options based on search query
  const filteredCategories = categories
    .map((group) => {
      const groupName = group.category || group.region || '';
      const matchingOptions = group.options.filter(
        (opt) =>
          opt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          groupName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return {
        ...group,
        options: matchingOptions,
      };
    })
    .filter((group) => group.options.length > 0);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="space-y-1.5 relative" ref={containerRef}>
      <label htmlFor={id} className="block text-xs font-mono font-bold text-white">
        {label}{' '}
        {required && <span className="text-[#3B82F6]">*</span>}
        {optional && <span className="text-[#64748B] font-normal">(Optional)</span>}
      </label>

      {/* Trigger Button */}
      <div
        id={id}
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        className={`w-full px-3.5 py-3 bg-[#070B14] border rounded-xl text-sm transition-all cursor-pointer flex items-center justify-between outline-none ${
          isOpen
            ? 'border-[#2563EB] ring-1 ring-[#2563EB] bg-[#0A101F]'
            : 'border-[#1E293B] hover:border-[#334155]'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          <div className="text-[#64748B] shrink-0">{icon}</div>
          <span className={`truncate text-sm font-sans ${value ? 'text-white font-medium' : 'text-[#64748B]'}`}>
            {value || placeholder}
          </span>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-[#64748B] shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#60A5FA]' : ''
          }`}
        />
      </div>

      {/* Floating Dropdown Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute left-0 right-0 top-full mt-1.5 z-50 rounded-2xl bg-[#0B132B] border border-[#2563EB]/40 shadow-2xl shadow-blue-950/80 p-2.5 backdrop-blur-2xl max-h-72 flex flex-col space-y-2 overflow-hidden"
          >
            {/* Search Bar */}
            <div className="relative shrink-0">
              <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type to search..."
                className="w-full pl-8 pr-7 py-2 bg-[#070B14] border border-[#1E293B] focus:border-[#2563EB] rounded-lg text-xs text-white placeholder-[#64748B] outline-none transition-all font-sans"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Categorized Options Container */}
            <div className="overflow-y-auto space-y-2.5 pr-1 text-left flex-1">
              {filteredCategories.length === 0 ? (
                <div className="p-4 text-center text-xs text-[#64748B] font-mono">
                  No matching options found
                </div>
              ) : (
                filteredCategories.map((group) => {
                  const title = group.category || group.region || 'Options';
                  return (
                    <div key={title} className="space-y-1">
                      <div className="sticky top-0 bg-[#0B132B] py-1 px-2.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider text-[#60A5FA] border-b border-[#1E293B]/70 z-10">
                        {title}
                      </div>
                      <div className="space-y-0.5 pt-0.5">
                        {group.options.map((opt) => {
                          const isSelected = value === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handleSelect(opt)}
                              className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-all flex items-center justify-between cursor-pointer ${
                                isSelected
                                  ? 'bg-[#2563EB]/25 text-white font-semibold border-l-2 border-[#2563EB]'
                                  : 'text-[#CBD5E1] hover:text-white hover:bg-[#2563EB]/15'
                              }`}
                            >
                              <span className="truncate pr-2">{opt}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
