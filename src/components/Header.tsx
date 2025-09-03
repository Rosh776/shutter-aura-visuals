import { useState, useEffect } from "react";
import { Search, Home, Compass, MessageCircle, Bell, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

interface HeaderProps {
  onSearch: (query: string) => void;
  onNavigate: (section: string) => void;
  onToggleChat: () => void;
}

export const Header = ({ onSearch, onNavigate, onToggleChat }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userIp, setUserIp] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Generate random IP for demo
    const ipParts = Array(4).fill(0).map(() => Math.floor(Math.random() * 255));
    setUserIp(ipParts.join('.'));
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      toast.success(`Searching for: ${searchQuery}`);
    } else {
      onNavigate('home');
    }
  };

  const handleNavClick = (section: string, url?: string) => {
    if (url) {
      window.open(url, '_blank');
      toast.info(`Opening ${section} in new tab`);
    } else if (section === 'chat') {
      onToggleChat();
      toast.info('Opening chat assistant');
    } else {
      onNavigate(section);
      toast.info(`Navigating to ${section}`);
    }
  };

  const notifications = [
    { id: 1, text: "New camera technology announced at Photokina", type: "update" },
    { id: 2, text: "Nikon releases firmware update for Z series", type: "update" },
    { id: 3, text: "Upcoming photography workshop in your area", type: "event" },
    { id: 4, text: "Canon announces new mirrorless lineup", type: "news" },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass backdrop-blur-md border-b border-glass-border shadow-soft' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home', 'https://rosh776.github.io/Main-Landing/')}
            className="group flex items-center space-x-2 transition-all duration-300 hover-scale"
          >
            <div className="relative">
              <h1 className="text-2xl font-bold text-shimmer">
                ShutR
                <span className="text-sm text-muted-foreground align-super ml-1">s.r</span>
              </h1>
              <div className="absolute -top-12 left-0 bg-black/80 text-white px-3 py-1 rounded-lg text-sm 
                            opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap
                            transform -translate-y-2 group-hover:translate-y-0">
                Shutter By Roshan
              </div>
            </div>
          </button>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 relative">
            <div className="relative group">
              <Input
                type="text"
                placeholder="Search photos, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-4 pr-12 py-3 bg-surface/50 border-border 
                         hover:bg-surface-variant focus:bg-surface-variant
                         focus:ring-2 focus:ring-primary/30 transition-all duration-300
                         rounded-full"
              />
              <Button
                onClick={handleSearch}
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-8 h-8 p-0
                         bg-primary hover:bg-primary-hover glow transition-all duration-300"
              >
                <Search className="h-4 w-4" />
              </Button>
              
              {/* Search feedback */}
              {searchQuery && (
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground 
                              pointer-events-none opacity-60">
                  Searching for: {searchQuery}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-2">
            {[
              { icon: Home, label: 'Home', action: () => handleNavClick('home', 'https://rosh776.github.io/Main-Landing/') },
              { icon: Compass, label: 'Explore', action: () => handleNavClick('explore', 'https://picsum.photos/') },
              { icon: MessageCircle, label: 'Chat', action: () => handleNavClick('chat') },
              { 
                icon: Bell, 
                label: 'Updates', 
                action: () => setShowNotifications(!showNotifications),
                hasDropdown: true
              },
            ].map(({ icon: Icon, label, action, hasDropdown }) => (
              <div key={label} className="relative">
                <Button
                  onClick={action}
                  variant="ghost"
                  size="sm"
                  className="relative w-10 h-10 rounded-full hover:bg-surface-variant 
                           hover-scale group transition-all duration-300"
                >
                  <Icon className="h-5 w-5" />
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 text-white 
                                px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 
                                transition-all duration-300 whitespace-nowrap
                                transform -translate-y-2 group-hover:translate-y-0">
                    {label}
                  </div>
                </Button>

                {/* Notifications Dropdown */}
                {hasDropdown && showNotifications && (
                  <div className="absolute top-12 right-0 w-80 glass rounded-xl border border-glass-border 
                                p-4 shadow-card animate-fade-in-up z-50">
                    <div className="space-y-3">
                      <div className="text-sm font-semibold text-primary mb-3">
                        Visitor ID: {userIp}
                      </div>
                      {notifications.map((notification) => (
                        <div key={notification.id} 
                             className="p-3 bg-surface/50 rounded-lg border border-border/50 
                                      hover:bg-surface-variant transition-colors duration-200">
                          <p className="text-sm text-foreground">{notification.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Profile */}
            <Button
              onClick={() => handleNavClick('profile', 'https://rosh776.github.io/Web-Profile/')}
              variant="ghost"
              size="sm"
              className="relative w-10 h-10 rounded-full p-0 overflow-hidden hover-scale group
                       border-2 border-transparent hover:border-primary/30 transition-all duration-300"
            >
              <img
                src="https://picsum.photos/seed/profile/200"
                alt="Profile"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 
                            transition-opacity duration-300" />
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 text-white 
                            px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 
                            transition-all duration-300 whitespace-nowrap
                            transform -translate-y-2 group-hover:translate-y-0">
                Meet Photographer
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Click outside to close notifications */}
      {showNotifications && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowNotifications(false)}
        />
      )}
    </header>
  );
};