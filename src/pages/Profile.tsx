import { useNavigate } from "react-router-dom";
import { ArrowLeft, Image as ImageIcon, FileText, Link2, Search, ChevronRight, Edit, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import profilePhoto from "@/assets/profile-photo.jpg";

const Profile = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [description, setDescription] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isEditingLinks, setIsEditingLinks] = useState(false);
  const [githubUrl, setGithubUrl] = useState("https://github.com/Sreejith7448");
  const [linkedinUrl, setLinkedinUrl] = useState("https://www.linkedin.com/in/sreejith-mn");
  const [portfolioUrl, setPortfolioUrl] = useState("https://sreejithmnportfolio.netlify.app");
  const { profile, updateProfile } = useProfile(user?.id);

  useEffect(() => {
    if (profile?.description) {
      setDescription(profile.description);
    }
    if (profile?.github_url) {
      setGithubUrl(profile.github_url);
    }
    if (profile?.linkedin_url) {
      setLinkedinUrl(profile.linkedin_url);
    }
    if (profile?.portfolio_url) {
      setPortfolioUrl(profile.portfolio_url);
    }
  }, [profile]);

  const handleSaveDescription = () => {
    if (description.length <= 300) {
      updateProfile({
        name: profile?.name || "Sreejth Mn",
        reg_no: profile?.reg_no || "12205460",
        description,
        github_url: profile?.github_url || githubUrl,
        linkedin_url: profile?.linkedin_url || linkedinUrl,
        portfolio_url: profile?.portfolio_url || portfolioUrl,
      });
      setIsEditingDesc(false);
    }
  };

  const handleSaveLinks = () => {
    updateProfile({
      name: profile?.name || "Sreejth Mn",
      reg_no: profile?.reg_no || "12205460",
      description: profile?.description || description,
      github_url: githubUrl,
      linkedin_url: linkedinUrl,
      portfolio_url: portfolioUrl,
    });
    setIsEditingLinks(false);
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

        <div className="flex justify-center gap-8 mt-6">
          <button className="flex flex-col items-center gap-1">
            <ImageIcon className="w-6 h-6" />
            <span className="text-xs">Images</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <FileText className="w-6 h-6" />
            <span className="text-xs">Files</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <Link2 className="w-6 h-6" />
            <span className="text-xs">Links</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <Search className="w-6 h-6" />
            <span className="text-xs">Search</span>
          </button>
        </div>

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
        <Dialog>
          <DialogTrigger asChild>
            <button className="w-full flex items-center gap-3 p-4 hover:bg-muted/50">
              <span className="text-xl">🔔</span>
              <span className="flex-1 text-left">Notification</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Notification Settings</DialogTitle>
            </DialogHeader>
            <div className="flex items-center justify-between py-4">
              <Label htmlFor="mute-toggle" className="text-base">
                Mute Notifications
              </Label>
              <Switch
                id="mute-toggle"
                checked={isMuted}
                onCheckedChange={setIsMuted}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {isMuted ? "Notifications are muted" : "Notifications are active"}
            </p>
          </DialogContent>
        </Dialog>

        {isEditingLinks ? (
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <Label>GitHub URL</Label>
              <Input
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username"
              />
            </div>
            <div className="space-y-2">
              <Label>LinkedIn URL</Label>
              <Input
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div className="space-y-2">
              <Label>Portfolio URL</Label>
              <Input
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                placeholder="https://yourportfolio.com"
              />
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSaveLinks}>Save</Button>
              <Button size="sm" variant="ghost" onClick={() => setIsEditingLinks(false)}>Cancel</Button>
            </div>
          </div>
        ) : (
          <>
            <MenuItem icon="🐙" text="GitHub" href={profile?.github_url || githubUrl} />
            <MenuItem icon="💼" text="LinkedIn" href={profile?.linkedin_url || linkedinUrl} />
            <MenuItem icon="📁" text="Portfolio" href={profile?.portfolio_url || portfolioUrl} />
            <button 
              onClick={() => setIsEditingLinks(true)}
              className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 text-primary"
            >
              <Edit className="w-5 h-5" />
              <span className="flex-1 text-left">Edit Links</span>
            </button>
          </>
        )}
      </div>

      <div className="p-4">
        <button
          onClick={signOut}
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
