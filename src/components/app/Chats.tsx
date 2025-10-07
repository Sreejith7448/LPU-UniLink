import { useState } from "react";
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
      <div className="px-4 pt-4 pb-2 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => navigate("/chat-search")}
            className="pl-12 rounded-full bg-card"
          />
        </div>
      </div>

      <div className="px-4 py-2 flex gap-2 text-xs text-muted-foreground border-b">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "text-primary font-semibold" : ""}
        >
          ALL
        </button>
        <span>|</span>
        <button
          onClick={() => setFilter("top")}
          className={filter === "top" ? "text-primary font-semibold" : ""}
        >
          Top
        </button>
        <span>|</span>
        <button
          onClick={() => setFilter("unread")}
          className={filter === "unread" ? "text-primary font-semibold" : ""}
        >
          UNREAD
        </button>
      </div>

      <div>
        {filteredChats.map((chat) => (
          <ChatItem key={chat.id} chat={chat} />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-secondary/80 backdrop-blur-sm border-t py-3 px-6">
        <div className="max-w-md mx-auto flex justify-around">
          <button className="flex flex-col items-center gap-1">
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
