
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout"; // Import MainLayout
import Index from "./pages/Index";
import NewHomePage from "./pages/NewHomePage";
import SponsorVideoPage from "./pages/SponsorVideoPage";
import ProgramSponsorSlideshowPage from "./pages/ProgramSponsorSlideshowPage";
import PlaylistPage from "./pages/PlaylistPage";
import PodcastDemoPage from "./pages/PodcastDemoPage";
import MusicVisualizerPage from "./pages/MusicVisualizerPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Wrap routes that need MainLayout with it */}
        {/* For pages that should not have MainLayout (e.g., a dedicated sponsor video page), define them outside MainLayout routes */}
        <Routes>
          {/* Routes with MainLayout */}
          <Route path="/" element={<MainLayout><Index /></MainLayout>} />
          <Route path="/new-home" element={<MainLayout><NewHomePage /></MainLayout>} />
          <Route path="/playlist" element={<MainLayout><PlaylistPage /></MainLayout>} />
          <Route path="/podcast-demo" element={<MainLayout><PodcastDemoPage /></MainLayout>} />
          <Route path="/music-visualizer" element={<MainLayout><MusicVisualizerPage /></MainLayout>} />

          {/* Routes without MainLayout (examples) */}
          <Route path="/sponsor-video" element={<SponsorVideoPage />} />
          <Route path="/program-slideshow" element={<ProgramSponsorSlideshowPage />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          {/* Catch-all NotFound route can be inside or outside MainLayout depending on desired appearance */}
          <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
          {/* Or simply: <Route path="*" element={<NotFound />} /> if NotFound page has its own full styling */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
