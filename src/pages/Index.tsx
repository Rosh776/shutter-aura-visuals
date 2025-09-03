import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { CategoryGrid } from "@/components/CategoryGrid";
import { Chatbot } from "@/components/Chatbot";
import { AudioManager } from "@/components/AudioManager";
import { toast } from "sonner";

const Index = () => {
  const [currentView, setCurrentView] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast.success("Welcome to ShutR Gallery! 📸", {
        description: "Explore stunning photography collections"
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (query: string) => {
    toast.info(`Searching for: ${query}`);
    // In a real app, you would implement search functionality here
  };

  const handleNavigate = (section: string) => {
    setCurrentView(section);
    toast.info(`Navigating to ${section}`);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleCategoryClick = (category: string) => {
    toast.success(`Opening ${category} gallery...`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center animate-fade-in-up">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full 
                          animate-spin mx-auto" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-full animate-pulse-glow" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-shimmer mb-4">
            ShutR<span className="text-lg text-muted-foreground align-super ml-1">s.r</span>
          </h1>
          <p className="text-muted-foreground animate-pulse">
            Loading your photography experience...
          </p>
          
          {/* Loading animation bars */}
          <div className="flex justify-center mt-6 space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-1 bg-primary rounded-full sound-bar"
                style={{
                  height: '4px',
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <Header 
        onSearch={handleSearch}
        onNavigate={handleNavigate}
        onToggleChat={toggleChat}
      />

      {/* Main Content */}
      <main className="pt-20 min-h-screen">
        {currentView === 'home' && (
          <div className="animate-fade-in-up">
            {/* Hero Section */}
            <section className="relative py-20 px-4 text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-glow opacity-20" />
              <div className="relative z-10 container mx-auto">
                <h1 className="text-6xl md:text-8xl font-bold text-shimmer mb-6 animate-fade-in-up">
                  ShutR
                  <span className="text-2xl md:text-3xl text-muted-foreground align-super ml-2">s.r</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto 
                             animate-fade-in-up animate-delay-200">
                  Discover the art of photography through stunning collections that capture 
                  life's most beautiful moments
                </p>
                <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up animate-delay-300">
                  <div className="px-6 py-2 glass border border-glass-border rounded-full text-sm
                                text-muted-foreground backdrop-blur-sm">
                    📸 Professional Photography
                  </div>
                  <div className="px-6 py-2 glass border border-glass-border rounded-full text-sm
                                text-muted-foreground backdrop-blur-sm">
                    🎨 Curated Collections
                  </div>
                  <div className="px-6 py-2 glass border border-glass-border rounded-full text-sm
                                text-muted-foreground backdrop-blur-sm">
                    ✨ High Resolution
                  </div>
                </div>
              </div>
            </section>

            {/* Category Grid */}
            <CategoryGrid onCategoryClick={handleCategoryClick} />

            {/* Feature Highlights */}
            <section className="py-20 px-4">
              <div className="container mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-shimmer mb-12 animate-fade-in-up">
                  Why Choose ShutR?
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      icon: "🌟",
                      title: "Premium Quality",
                      description: "High-resolution images captured with professional equipment"
                    },
                    {
                      icon: "🎯",
                      title: "Curated Collections",
                      description: "Carefully selected photos organized by themes and styles"
                    },
                    {
                      icon: "🚀",
                      title: "Fast Experience",
                      description: "Optimized for speed with smooth animations and interactions"
                    }
                  ].map((feature, index) => (
                    <div key={feature.title} 
                         className="p-6 glass border border-glass-border rounded-xl hover-lift hover-glow
                                  transition-all duration-300 animate-fade-in-up"
                         style={{ animationDelay: `${index * 0.2}s` }}>
                      <div className="text-4xl mb-4">{feature.icon}</div>
                      <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Chatbot */}
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Audio Manager */}
      <AudioManager />

      {/* Scroll to top indicator */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="w-2 h-20 bg-surface/30 rounded-full backdrop-blur-sm">
          <div className="w-full bg-gradient-primary rounded-full transition-all duration-300"
               style={{ 
                 height: `${Math.min((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100, 100)}%` 
               }} />
        </div>
      </div>
    </div>
  );
};

export default Index;