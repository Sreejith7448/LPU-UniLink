import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ArrowLeft, MoreVertical, Send, Image, FileText, BarChart3, Printer, LogOut, Bell, Search, Archive } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import profilePhoto from "@/assets/profile-photo.jpg";

interface Message {
  id: string;
  text: string;
  time: string;
  isSent: boolean;
}

const ChatDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fromTab = (location.state as any)?.from || "chats";
  const [message, setMessage] = useState("");
  const [showAttachments, setShowAttachments] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const storedMessages = localStorage.getItem(`chat-${id}`);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, [id]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        isSent: true
      };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      localStorage.setItem(`chat-${id}`, JSON.stringify(updatedMessages));
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div 
        className="sticky top-0 z-10 px-4 py-3 flex items-center gap-3"
        style={{ background: "var(--gradient-primary)" }}
      >
        <button onClick={() => navigate("/app", { state: { activeTab: fromTab } })} className="text-primary-foreground">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div 
          className="flex-1 cursor-pointer flex items-center gap-2"
          onClick={() => navigate("/group-info/k22ge-pes-132")}
        >
          <div className="w-10 h-10 rounded-full bg-[#8B4513] text-white flex items-center justify-center font-semibold text-xs">
            K22<br/>GE
          </div>
          <h1 className="text-base font-semibold text-primary-foreground">K22GE PES - 132</h1>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-primary-foreground">
              <MoreVertical className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => navigate("/group-info/k22ge-pes-132")}>
              <Search className="w-4 h-4 mr-2" />
              Group Info
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="w-4 h-4 mr-2" />
              Mute Notifications
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Archive className="w-4 h-4 mr-2" />
              Archive Group
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Exit Group
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="flex justify-center my-3">
          <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-semibold">
            Today
          </span>
        </div>

        <div className="bg-secondary/50 border border-border p-4 mx-4 my-2 rounded-lg">
          <p className="text-xs font-bold mb-2">POINT TO REMEMBER:</p>
          <p className="text-xs leading-relaxed mb-3">
            VIDEO CV SHOULD BE BETWEEN 60 AND 90 SECONDS.<br/>
            YOU CAN ADD ANY ONE APPROVED PROJECT FROM PORTFOLIO.<br/>
            MAKE RESUME OF MAXIMUM 2 PAGES.<br/>
            IT IS OPTIONAL TO ADD VIDEO CV TO YOUR PORTFOLIO BUT MANDATORY FOR INTERVIEW WITH ANY ONE OF THE 5 SET.<br/>
            IT IS MANDATORY TO PASTE LINKS FOR PORTFOLIO USING THE LINK PROVIDED FOR THE SHARED GOOGLE SHEET IN GOOGLE CLASSROOM (YOU CAN ADD ONLY ONE CV TO YOUR SET).<br/>
            FINAL SUBMISSION AND SCORES OF CAL<br/>
            IT IS MANDATORY TO UPLOAD YOUR CV USING THE LINK PROVIDED FOR THE SHARED FOLDER IN GOOGLE DRIVE AND ONLY THOSE WHO UPLOADED WILL BE CONSIDERED FOR FINAL SUBMISSION.<br/>
            PASTE THE LINKS TILL 20 APRIL 2025 ONLY.<br/>
            IF YOU WILL NOT UPLOAD IT TILL THESE FROM 21 APRIL TO 29 APRIL 2025 ONLY ONCE DURING YOUR CAL SCORE AWARDED WILL BE ZERO.<br/>
            1. Keep discussions respectful<br/>
            2. Avoid spamming<br/>
            3. Share only relevant content<br/>
            Let's make this a productive and engaging space!
          </p>
          <p className="text-xs text-right text-muted-foreground">11:13 AM</p>
        </div>

        <div className="mb-4 px-4 flex justify-start gap-2">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold flex-shrink-0">
            JD
          </div>
          <div className="bg-card p-3 rounded-lg shadow-sm max-w-[80%]">
            <p className="text-sm mb-1">Thank you for the information mam</p>
            <span className="text-xs text-muted-foreground">11:23 AM</span>
          </div>
        </div>

        <div className="mb-4 px-4 flex justify-end gap-2">
          <div className="bg-primary text-primary-foreground p-3 rounded-lg shadow-sm max-w-[80%]">
            <p className="text-sm mb-1">Looking forward to staying updated and being part of the discussions here</p>
            <span className="text-xs opacity-80">11:24 AM</span>
          </div>
          <img src={profilePhoto} alt="You" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`mb-4 px-4 flex gap-2 ${msg.isSent ? 'justify-end' : 'justify-start'}`}>
            {!msg.isSent && (
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold flex-shrink-0">
                JD
              </div>
            )}
            <div className={`p-3 rounded-lg shadow-sm max-w-[80%] ${
              msg.isSent 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card'
            }`}>
              <p className="text-sm mb-1">{msg.text}</p>
              <span className={`text-xs ${msg.isSent ? 'opacity-80' : 'text-muted-foreground'}`}>
                {msg.time}
              </span>
            </div>
            {msg.isSent && (
              <img src={profilePhoto} alt="You" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
            )}
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 bg-secondary border-t p-3">
        {showAttachments && (
          <div className="flex items-center gap-2 mb-3">
            <button className="flex-1 flex items-center justify-center gap-2 p-3 bg-card rounded-xl hover:bg-muted">
              <Image className="w-5 h-5" />
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 p-3 bg-card rounded-xl hover:bg-muted">
              <FileText className="w-5 h-5" />
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 p-3 bg-card rounded-xl hover:bg-muted">
              <BarChart3 className="w-5 h-5" />
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 p-3 bg-card rounded-xl hover:bg-muted">
              <Printer className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Button 
            size="icon" 
            variant="ghost"
            className="rounded-full"
            onClick={() => setShowAttachments(!showAttachments)}
          >
            <span className="text-xl">+</span>
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder=""
            className="flex-1 rounded-full bg-card"
          />
          <Button 
            size="icon" 
            variant="ghost"
            className="rounded-full"
            onClick={handleSend}
            disabled={!message.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
