import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

export const AudioManager = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const soundEffectsRef = useRef<{ [key: string]: HTMLAudioElement }>({});

  // Initialize audio elements
  useEffect(() => {
    // Background music
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
    }

    // Sound effects (using data URLs for simple sounds)
    const createBeep = (frequency: number, duration: number) => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    };

    // Sound effect functions
    const playSound = (type: string) => {
      if (isMuted) return;
      
      switch (type) {
        case 'hover':
          createBeep(800, 0.1);
          break;
        case 'click':
          createBeep(1200, 0.15);
          break;
        case 'success':
          createBeep(880, 0.2);
          setTimeout(() => createBeep(1320, 0.2), 100);
          break;
        case 'notification':
          createBeep(660, 0.3);
          break;
      }
    };

    // Add global sound effects
    const addSoundToElements = () => {
      // Add hover sounds to interactive elements
      const interactiveElements = document.querySelectorAll('button, a, [role="button"], .category-card');
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => playSound('hover'));
        element.addEventListener('click', () => playSound('click'));
      });
    };

    // Wait for DOM to be ready
    const timer = setTimeout(addSoundToElements, 1000);

    return () => clearTimeout(timer);
  }, [isMuted]);

  // Auto-play music after user interaction
  const handleUserInteraction = async () => {
    if (!hasInteracted && audioRef.current) {
      setHasInteracted(true);
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        toast.success("Welcome to ShutR Gallery! 🎵", {
          description: "Ambient music is now playing"
        });
      } catch (error) {
        console.log("Autoplay prevented:", error);
      }
    }
  };

  // Add click listener for user interaction
  useEffect(() => {
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });
    
    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [hasInteracted]);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        toast.info("Music paused");
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
        toast.success("Music playing");
      }
    } catch (error) {
      toast.error("Failed to play music");
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    toast.info(isMuted ? "Sound enabled" : "Sound muted");
  };

  return (
    <>
      {/* Background Music */}
      <audio
        ref={audioRef}
        preload="auto"
        muted={isMuted}
      >
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
      </audio>

      {/* Audio Controls */}
      <div className="fixed bottom-6 left-6 z-50 flex space-x-2">
        {/* Music Toggle */}
        <Button
          onClick={toggleMusic}
          variant="secondary"
          size="sm"
          className="glass border-glass-border hover:bg-surface-variant shadow-soft
                   transition-all duration-300 hover-scale group"
        >
          <Music className={`h-4 w-4 mr-2 ${isPlaying ? 'animate-pulse' : ''}`} />
          {isPlaying ? 'Pause' : 'Play'}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 text-white 
                        px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 
                        transition-all duration-300 whitespace-nowrap
                        transform -translate-y-2 group-hover:translate-y-0">
            Background Music
          </div>
        </Button>

        {/* Mute Toggle */}
        <Button
          onClick={toggleMute}
          variant="secondary"
          size="sm"
          className="glass border-glass-border hover:bg-surface-variant shadow-soft
                   transition-all duration-300 hover-scale group"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 text-white 
                        px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 
                        transition-all duration-300 whitespace-nowrap
                        transform -translate-y-2 group-hover:translate-y-0">
            {isMuted ? 'Unmute' : 'Mute'} Sounds
          </div>
        </Button>
      </div>

      {/* Sound Visualizer */}
      {isPlaying && (
        <div className="fixed bottom-6 left-32 z-50 flex items-end space-x-1 h-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-1 bg-primary sound-bar rounded-full"
              style={{
                height: '4px',
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};