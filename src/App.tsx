import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import AppMain from "./pages/App";
import EventDetail from "./pages/EventDetail";
import ChatDetail from "./pages/ChatDetail";
import ChatSearch from "./pages/ChatSearch";
import GroupInfo from "./pages/GroupInfo";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import CourseSelection from "./pages/CourseSelection";
import Meeting from "./pages/Meeting";
import OrganizationDetail from "./pages/OrganizationDetail";
import OrganizationChat from "./pages/OrganizationChat";
import MemberProfile from "./pages/MemberProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app" element={<AppMain />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/chat/:id" element={<ChatDetail />} />
          <Route path="/chat-search" element={<ChatSearch />} />
          <Route path="/group-info/:id" element={<GroupInfo />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/course-selection" element={<CourseSelection />} />
          <Route path="/meeting" element={<Meeting />} />
          <Route path="/organization-chat/:id" element={<OrganizationChat />} />
          <Route path="/organization/:id" element={<OrganizationDetail />} />
          <Route path="/member/:id" element={<MemberProfile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
