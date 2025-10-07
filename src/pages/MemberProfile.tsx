import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Image, FileText, Link, Search, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfile } from "@/hooks/useProfile";
import profilePhoto from "@/assets/profile-photo.jpg";

const MemberProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // If viewing own profile (you), redirect to /profile
  const isOwnProfile = id === "you";
  
  // For demo purposes, using mock data. In production, fetch by user_id
  const memberData: Record<string, { userId: string; name: string; regNo: string }> = {
    "bashi": { userId: "mock-bashi", name: "Bashi", regNo: "12205461" },
    "dharani": { userId: "mock-dharani", name: "Dharani", regNo: "12205462" },
    "nahulya": { userId: "mock-nahulya", name: "Nahulya", regNo: "12205463" },
    "ram": { userId: "mock-ram", name: "Ram", regNo: "12205464" },
    "saran": { userId: "mock-saran", name: "Saran", regNo: "12205465" },
    "megha": { userId: "mock-megha", name: "Megha", regNo: "12205466" },
  };
  
  const member = memberData[id || ""] || { userId: "unknown", name: "Member", regNo: "00000000" };
  const { profile } = useProfile(member.userId);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div 
        className="sticky top-0 z-10 px-4 py-3 flex items-center justify-center relative"
        style={{ background: "var(--gradient-primary)" }}
      >
        <button 
          onClick={() => navigate(-1)} 
          className="absolute left-4 text-primary-foreground"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-primary-foreground">
          PROFILE
        </h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Picture */}
        <div className="flex flex-col items-center text-center">
          {isOwnProfile ? (
            <img
              src={profilePhoto}
              alt={member.name}
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
          ) : (
            <Avatar className="w-32 h-32 mb-4">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`} />
              <AvatarFallback className="text-2xl">{member.name[0]}</AvatarFallback>
            </Avatar>
          )}
          <h2 className="text-xl font-bold mb-1">{profile?.name || member.name}</h2>
          <p className="text-sm text-muted-foreground">{profile?.reg_no || member.regNo}</p>
          
          {profile?.description && (
            <p className="text-sm text-muted-foreground mt-3 max-w-md">
              {profile.description}
            </p>
          )}
        </div>

        {/* Media Links */}
        <div className="flex justify-around py-4">
          <button className="flex flex-col items-center gap-1">
            <Image className="w-6 h-6" />
            <span className="text-xs">Images</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <FileText className="w-6 h-6" />
            <span className="text-xs">Files</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <Link className="w-6 h-6" />
            <span className="text-xs">Links</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <Search className="w-6 h-6" />
            <span className="text-xs">Search</span>
          </button>
        </div>

        {/* Profile Links Section */}
        <div className="space-y-0 divide-y border-t border-b">
          <MenuItem icon="🔔" text="Notification" />
          {profile?.github_url && (
            <MenuItem icon="🐙" text="GitHub" href={profile.github_url} />
          )}
          {profile?.linkedin_url && (
            <MenuItem icon="💼" text="LinkedIn" href={profile.linkedin_url} />
          )}
          {profile?.portfolio_url && (
            <MenuItem icon="📁" text="Portfolio" href={profile.portfolio_url} />
          )}
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, text, href }: { icon: string; text: string; href?: string }) => {
  const content = (
    <>
      <span className="text-xl">{icon}</span>
      <span className="flex-1 text-left">{text}</span>
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

export default MemberProfile;
