import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Star, Moon, Sun } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";

const Settings = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <div 
        className="sticky top-0 z-10 px-4 py-3"
        style={{ background: "var(--gradient-primary)" }}
      >
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)} className="text-primary-foreground">
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
        <Input
          type="text"
          placeholder="Search"
          className="rounded-full bg-card"
        />
      </div>

      <button
        onClick={() => navigate("/profile")}
        className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 border-b"
      >
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <span className="flex-1 text-left font-semibold">Sreejth Mn</span>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </button>

      <div className="divide-y mt-4">
        <MenuItem icon="🔔" text="Notification" />
        <div className="w-full flex items-center justify-between p-4 hover:bg-muted/50">
      <div className="flex items-center gap-3">
        {theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        <span className="text-left">Theme</span>
      </div>
      <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 ${
      theme === "dark" ? "bg-primary" : "bg-muted"
      }`}
  >
    <span
      className={`inline-block h-5 w-5 transform rounded-full bg-background shadow-md transition-transform duration-300 ${
        theme === "dark" ? "translate-x-6" : "translate-x-1"
      }`}
      />
      </button>
      </div>

        <MenuItem icon="🔒" text="Privacy" />
        <MenuItem icon={<Star className="w-5 h-5" />} text="Starred message" />
      </div>

      <div className="divide-y mt-8">
        <MenuItem icon="🎓" text="LPU Touch" />
        <MenuItem icon="🎓" text="UMS" />
      </div>
    </div>
  );
};

const MenuItem = ({ 
  icon, 
  text, 
  badge 
}: { 
  icon: string | React.ReactNode; 
  text: string; 
  badge?: string;
}) => (
  <button className="w-full flex items-center gap-3 p-4 hover:bg-muted/50">
    {typeof icon === 'string' ? (
      <span className="text-xl">{icon}</span>
    ) : (
      icon
    )}
    <span className="flex-1 text-left">{text}</span>
    {badge && <span className="text-sm text-muted-foreground">{badge}</span>}
    <ChevronRight className="w-5 h-5 text-muted-foreground" />
  </button>
);

export default Settings;
