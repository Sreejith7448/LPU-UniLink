import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search, Calendar, MessageCircle, Settings } from "lucide-react";
import ChatItem from "./ChatItem";

const chats = [
  { id: "1", name: "K22GE CSE 122", avatar: "K22 GE", type: "group" as const, lastMessage: "Assignment due tomorrow", time: "2:30 PM", unread: 3 },
  { id: "2", name: "K22MR PES 132", avatar: "K22 MR", type: "group" as const, lastMessage: "Lab session at 3 PM", time: "1:45 PM", unread: 0 },
  { id: "3", name: "K22SR INT 382", avatar: "K22 SR", type: "group" as const, lastMessage: "Project presentation next week", time: "12:20 PM", unread: 1 },
  { id: "4", name: "K22NX CSE 121", avatar: "K22 NX", type: "group" as const, lastMessage: "Study group meeting?", time: "11:30 AM", unread: 0 },
  { id: "5", name: "K22VL CSE 312", avatar: "K22 VL", type: "group" as const, lastMessage: "Notes uploaded on portal", time: "Yesterday", unread: 5 },
  { id: "6", name: "Aryan Shah", avatar: "AS", regNo: "12203450", type: "personal" as const, lastMessage: "See you at the library", time: "Yesterday", unread: 0 },
  { id: "7", name: "Megha Arun Kumar", avatar: "MA", regNo: "12206789", type: "personal" as const, lastMessage: "Thanks for the notes!", time: "2 days ago", unread: 0 },
  { id: "8", name: "Campus Connect", avatar: "CC", type: "group" as const, lastMessage: "Welcome to CampusConnect!", time: "3 days ago", unread: 2 },
];

const Chats = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "top" | "unread">("all");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.regNo?.includes(searchQuery)
  ).filter(chat => {
    if (filter === "unread") return chat.unread > 0;
    if (filter === "top") return true; // Would implement pinned logic
    return true;
  });

  return (
    <div className="pb-20">
      <div className={`sticky top-[60px] z-20 bg-background transition-all duration-300`}>
        <div className={`px-4 transition-all duration-300 ${isScrolled ? 'py-2' : 'pt-4 pb-2'}`}>
          <div className="relative max-w-md mx-auto">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-all duration-300 ${isScrolled ? 'w-4 h-4' : 'w-5 h-5'}`} />
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => navigate("/chat-search")}
              className={`pl-12 rounded-full bg-card transition-all duration-300 ${isScrolled ? 'h-9 text-sm' : 'h-10'}`}
            />
          </div>
        </div>

        <div className="px-4 pb-2 flex gap-3 text-xs border-b">
          <button
            onClick={() => setFilter("all")}
            className={`py-2 transition-colors ${filter === "all" ? "text-primary font-semibold border-b-2 border-primary" : "text-muted-foreground"}`}
          >
            ALL
          </button>
          <button
            onClick={() => setFilter("top")}
            className={`py-2 transition-colors ${filter === "top" ? "text-primary font-semibold border-b-2 border-primary" : "text-muted-foreground"}`}
          >
            Top
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`py-2 transition-colors ${filter === "unread" ? "text-primary font-semibold border-b-2 border-primary" : "text-muted-foreground"}`}
          >
            UNREAD
          </button>
        </div>
      </div>

      <div>
        {filteredChats.map((chat) => (
          <ChatItem key={chat.id} chat={chat} />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-secondary/80 backdrop-blur-sm border-t py-3 px-6">
        <div className="max-w-md mx-auto flex justify-around">
          <button 
            onClick={() => navigate("/meeting")}
            className="flex flex-col items-center gap-1"
          >
            <Calendar className="w-6 h-6 text-foreground" />
            <span className="text-xs">Meet</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <MessageCircle className="w-6 h-6 text-primary" />
            <span className="text-xs font-semibold text-primary">Chats</span>
          </button>
          <button 
            onClick={() => navigate("/settings")}
            className="flex flex-col items-center gap-1"
          >
            <Settings className="w-6 h-6 text-foreground" />
            <span className="text-xs">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chats;
