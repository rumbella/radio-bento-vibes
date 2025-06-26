
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
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
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sponsor-video" element={<SponsorVideoPage />} />
          <Route path="/program-slideshow" element={<ProgramSponsorSlideshowPage />} />
          <Route path="/playlist" element={<PlaylistPage />} />
          <Route path="/podcast-demo" element={<PodcastDemoPage />} />
          <Route path="/music-visualizer" element={<MusicVisualizerPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
