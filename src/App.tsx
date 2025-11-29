import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth"
import {PrivateRoute,  PrivateRouteHome } from "./hooks/loginStatus";
import Clipnote_landing from "./pages/Clipnote_landing";
import { ClipNote } from "./components/ClipNote";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute><Clipnote_landing/></PrivateRoute>} />
          <Route path="/home" element={<PrivateRouteHome><ClipNote/></PrivateRouteHome>}></Route>
          <Route path="/auth" element={<Auth/>}/>
          {/* <Route path="/" element={<Clipnote_landing/>} />
          <Route path="/home" element={<ClipNote/>}></Route>
          <Route path="/auth" element={<Auth/>}/> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
