import { useNavigate } from "react-router-dom";
import { ArrowLeft, Image as ImageIcon, FileText, Link2, Search, ChevronRight, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/hooks/useProfile";
import profilePhoto from "@/assets/profile-photo.jpg";

const Profile = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [description, setDescription] = useState("");
  const { profile, updateProfile } = useProfile(userId || undefined);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserId(user?.id || null);
    });
  }, []);

  useEffect(() => {
    if (profile?.description) {
      setDescription(profile.description);
    }
  }, [profile]);

  const handleSaveDescription = () => {
    if (description.length <= 300) {
      updateProfile({
        name: profile?.name || "Sreejth Mn",
        reg_no: profile?.reg_no || "12205460",
        description,
        github_url: "https://github.com/Sreejith7448",
        linkedin_url: "https://www.linkedin.com/in/sreejith-mn",
        portfolio_url: "https://sreejithmnportfolio.netlify.app",
      });
      setIsEditingDesc(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div 
        className="sticky top-0 z-10 px-4 py-3 flex items-center gap-3"
        style={{ background: "var(--gradient-primary)" }}
      >
        <button onClick={() => navigate(-1)} className="text-primary-foreground">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-primary-foreground flex-1">
          PROFILE
        </h1>
      </div>

      <div className="p-6 text-center border-b">
        <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
          <img
            src={profilePhoto}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold mb-1">{profile?.name || "Sreejth Mn"}</h2>
        <p className="text-muted-foreground">{profile?.reg_no || "12205460"}</p>

        {profile?.description && !isEditingDesc && (
          <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">
            {profile.description}
          </p>
        )}

        {isEditingDesc && (
          <div className="mt-3 max-w-md mx-auto">
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description (max 300 characters)"
              maxLength={300}
              className="min-h-[100px]"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-muted-foreground">
                {description.length}/300 characters
              </span>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => setIsEditingDesc(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSaveDescription}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        )}

       

        {!isEditingDesc && (
          <Button 
            variant="ghost" 
            className="mt-4 text-sm"
            onClick={() => setIsEditingDesc(true)}
          >
            <Edit className="w-4 h-4 mr-2" />
            {profile?.description ? "EDIT DESCRIPTION" : "ADD DESCRIPTION"}
          </Button>
        )}
      </div>

      <div className="divide-y">
        <MenuItem icon="🔔" text="Notification" />
        <MenuItem icon="🐙" text="GitHub" href="https://github.com/Sreejith7448" />
        <MenuItem icon="💼" text="LinkedIn" href="https://www.linkedin.com/in/sreejith-mn" />
        <MenuItem icon="📁" text="Portfolio" href="https://sreejithmnportfolio.netlify.app" />
      </div>

      <div className="p-4">
        <button
          onClick={() => navigate('/login')}
          className="w-full py-3 bg-destructive text-destructive-foreground rounded-lg font-semibold hover:bg-destructive/90 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, text, badge, href }: { icon: string; text: string; badge?: string; href?: string }) => {
  const content = (
    <>
      <span className="text-xl">{icon}</span>
      <span className="flex-1 text-left">{text}</span>
      {badge && <span className="text-sm text-muted-foreground">{badge}</span>}
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-3 p-4 hover:bg-muted/50">
        {content}
      </a>
    );
  }

  return (
    <button className="w-full flex items-center gap-3 p-4 hover:bg-muted/50">
      {content}
    </button>
  );
};

export default Profile;
