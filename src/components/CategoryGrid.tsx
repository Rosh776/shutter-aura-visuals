import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { toast } from "sonner";

interface Category {
  id: string;
  title: string;
  image: string;
  link: string;
}

interface CategoryGridProps {
  onCategoryClick: (category: string) => void;
}

export const CategoryGrid = ({ onCategoryClick }: CategoryGridProps) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const categories: Category[] = [
    {
      id: "macro",
      title: "Macro",
      image: "https://picsum.photos/id/306/600/600",
      link: "https://rosh776.github.io/Web-Macro/"
    },
    {
      id: "nature",
      title: "Nature", 
      image: "https://picsum.photos/id/28/600/600",
      link: "https://rosh776.github.io/Web-Nature/"
    },
    {
      id: "animals",
      title: "Animals",
      image: "https://picsum.photos/id/237/600/600", 
      link: "https://rosh776.github.io/Web-Animals/"
    },
    {
      id: "vehicles",
      title: "Vehicles",
      image: "https://picsum.photos/id/1072/600/600",
      link: "https://rosh776.github.io/Web-Vechicles/"
    },
    {
      id: "portrait", 
      title: "Portrait",
      image: "https://picsum.photos/id/1005/600/600",
      link: "https://rosh776.github.io/Web-Potrait/"
    },
    {
      id: "sunset",
      title: "Sunset",
      image: "https://picsum.photos/id/10/600/600",
      link: "https://rosh776.github.io/Web-Sunset/"
    },
    {
      id: "ocean",
      title: "Ocean", 
      image: "https://picsum.photos/id/1018/600/600",
      link: "https://rosh776.github.io/Web-Ocean/"
    },
    {
      id: "urban",
      title: "Urban",
      image: "https://picsum.photos/id/1019/600/600",
      link: "https://rosh776.github.io/Web-Urban/"
    },
    {
      id: "wildlife",
      title: "Wildlife",
      image: "https://picsum.photos/id/1024/600/600", 
      link: "https://rosh776.github.io/Web-Wildlife/"
    },
    {
      id: "random",
      title: "Random",
      image: "https://picsum.photos/id/103/600/600",
      link: "https://rosh776.github.io/Web-Random/"
    }
  ];

  const handleCategoryClick = (category: Category) => {
    toast.success(`Opening ${category.title} gallery...`);
    // Small delay for toast visibility, then redirect
    setTimeout(() => {
      window.open(category.link, '_blank');
    }, 500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12 animate-fade-in-up">
        <h2 className="text-4xl font-bold text-shimmer mb-4">
          Photo Categories
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore stunning photography collections across different themes and styles
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <Card
            key={category.id}
            className={`category-card group cursor-pointer bg-card border-border/50 
                       hover:border-primary/30 transition-all duration-500 overflow-hidden
                       hover-lift hover-glow animate-fade-in-up`}
            style={{ animationDelay: `${index * 0.1}s` }}
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
            onClick={() => handleCategoryClick(category)}
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-700 
                         group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent 
                            opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              
              {/* Category title */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-2 transform translate-y-2 
                             group-hover:translate-y-0 transition-transform duration-300">
                  {category.title}
                </h3>
                <div className="w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 
                              transition-transform duration-500 origin-left" />
              </div>

              {/* Hover indicator */}
              <div className={`absolute top-4 right-4 w-3 h-3 rounded-full bg-primary
                             transform transition-all duration-300 ${
                               hoveredCategory === category.id 
                                 ? 'scale-100 animate-pulse-glow' 
                                 : 'scale-0'
                             }`} />
            </div>
          </Card>
        ))}
      </div>

      {/* Floating particles effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};