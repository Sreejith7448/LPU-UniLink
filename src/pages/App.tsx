import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Events from "@/components/app/Events";
import Chats from "@/components/app/Chats";
import { useLocation } from "react-router-dom";

const AppMain = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("events");

  useEffect(() => {
    // Check if we should open the chats tab
    if (location.state?.activeTab === "chats") {
      setActiveTab("chats");
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-background">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div 
          className="sticky top-0 z-10 pt-4 pb-2 px-4"
          style={{ background: "var(--gradient-primary)" }}
        >
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 bg-transparent">
            <TabsTrigger 
              value="events"
              className="rounded-full text-foreground data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
            >
              Events
            </TabsTrigger>
            <TabsTrigger 
              value="chats"
              className="rounded-full text-foreground data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
            >
              Chats
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="events" className="mt-0">
          <Events />
        </TabsContent>

        <TabsContent value="chats" className="mt-0">
          <Chats />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppMain;
