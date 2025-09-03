import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Palette, Moon, Droplets, Sun, Zap } from 'lucide-react';

export type Theme = 'default' | 'blue' | 'white' | 'neon';

interface ThemeSwitcherProps {
  onThemeChange?: (theme: Theme) => void;
}

const themes = [
  { 
    id: 'default' as Theme, 
    name: 'Dark', 
    icon: Moon, 
    colors: ['#dc2626', '#22d3ee', '#a855f7'],
    className: ''
  },
  { 
    id: 'blue' as Theme, 
    name: 'Blue', 
    icon: Droplets, 
    colors: ['#3b82f6', '#06b6d4', '#1e293b'],
    className: 'theme-blue'
  },
  { 
    id: 'white' as Theme, 
    name: 'Light', 
    icon: Sun, 
    colors: ['#1f2937', '#3b82f6', '#f9fafb'],
    className: 'theme-white'
  },
  { 
    id: 'neon' as Theme, 
    name: 'Neon', 
    icon: Zap, 
    colors: ['#d946ef', '#00ffff', '#0a0a0a'],
    className: 'theme-neon'
  },
];

export const ThemeSwitcher = ({ onThemeChange }: ThemeSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>('default');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('shutr-theme') as Theme;
    if (savedTheme && themes.find(t => t.id === savedTheme)) {
      setCurrentTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (theme: Theme) => {
    const themeConfig = themes.find(t => t.id === theme);
    if (themeConfig) {
      // Remove all theme classes
      themes.forEach(t => {
        if (t.className) {
          document.documentElement.classList.remove(t.className);
        }
      });
      
      // Add new theme class
      if (themeConfig.className) {
        document.documentElement.classList.add(themeConfig.className);
      }
    }
  };

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    applyTheme(theme);
    localStorage.setItem('shutr-theme', theme);
    onThemeChange?.(theme);
    
    // Auto-close after selection on mobile
    if (isMobile) {
      setTimeout(() => setIsOpen(false), 300);
    }
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const currentThemeConfig = themes.find(t => t.id === currentTheme) || themes[0];
  const CurrentIcon = currentThemeConfig.icon;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Theme Options */}
      <div className={`
        flex flex-col gap-2 mb-3 transition-all duration-500 ease-out transform
        ${isOpen 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }
      `}>
        {themes.slice().reverse().map((theme, index) => {
          const Icon = theme.icon;
          const isActive = currentTheme === theme.id;
          
          return (
            <Button
              key={theme.id}
              size="icon"
              variant={isActive ? "default" : "secondary"}
              className={`
                w-12 h-12 rounded-full shadow-card hover:shadow-glow
                transition-all duration-300 ease-out backdrop-blur-md
                ${isActive 
                  ? 'scale-110 ring-2 ring-primary pulse-glow' 
                  : 'hover:scale-105'
                }
                ${isMobile ? 'active:scale-95' : ''}
              `}
              style={{
                transitionDelay: `${index * 50}ms`,
                background: isActive 
                  ? `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})` 
                  : undefined
              }}
              onClick={() => handleThemeChange(theme.id)}
              onTouchStart={() => {}} // Enable touch events
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
              
              {/* Tooltip */}
              <div className={`
                absolute right-full mr-3 px-3 py-1 text-sm font-medium
                bg-surface/90 backdrop-blur-sm text-foreground rounded-lg
                border border-glass-border shadow-soft whitespace-nowrap
                transition-all duration-300
                ${isMobile 
                  ? 'opacity-0 pointer-events-none' 
                  : 'opacity-0 group-hover:opacity-100'
                }
              `}>
                {theme.name}
              </div>
              
              {/* Color preview dots */}
              <div className="absolute -top-1 -right-1 flex gap-1">
                {theme.colors.slice(0, 2).map((color, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full border border-white/20"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </Button>
          );
        })}
      </div>

      {/* Main Toggle Button */}
      <Button
        size="icon"
        className={`
          w-14 h-14 rounded-full shadow-card hover:shadow-intense
          bg-gradient-primary hover:scale-110 active:scale-95
          transition-all duration-300 ease-bounce backdrop-blur-md
          ${isOpen ? 'rotate-180 ring-2 ring-primary/50' : 'rotate-0'}
          ${isMobile ? 'touch-manipulation' : ''}
        `}
        onClick={toggleOpen}
        onTouchStart={() => {}} // Enable touch events
      >
        <div className={`
          transition-all duration-300
          ${isOpen ? 'rotate-90' : 'rotate-0'}
        `}>
          {isOpen ? (
            <Palette className="w-6 h-6 text-white" />
          ) : (
            <CurrentIcon className="w-6 h-6 text-white" />
          )}
        </div>
        
        {/* Ripple effect for touch */}
        <div className={`
          absolute inset-0 rounded-full
          ${isMobile ? 'animate-ping opacity-20' : ''}
          pointer-events-none
        `} />
        
        {/* Glow ring */}
        <div className="absolute -inset-1 rounded-full bg-gradient-primary opacity-20 blur-md animate-pulse-glow" />
      </Button>

      {/* Background overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-[1px] -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};