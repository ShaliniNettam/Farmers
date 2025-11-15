import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AuthForm } from "@/components/AuthForm";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { authApi } from "@/Backend/api/todoApi";
import Home from "@/pages/Home.tsx";
import Awareness from "@/pages/Awareness.tsx";
import HygieneTest from "@/pages/HygieneTest.tsx";
import About from "@/pages/About.tsx";
import NotFound from "@/pages/NotFound.tsx";
import TodoList from "@/pages/TodoList.tsx";
import Marketplace from "@/pages/Marketplace.tsx";
import SubscriptionPlans from "@/components/SubscriptionPlans.tsx";
import ComplianceTracker from "@/pages/ComplianceTracker.tsx";
import { CartProvider } from "@/contexts/CartContext"; // Import CartProvider

const queryClient = new QueryClient();

const AppContent = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const checkAuth = async () => {
      if (authApi.isAuthenticated()) {
        try {
          const profile = await authApi.getProfile();
          setUser(profile.user);
        } catch (error) {
          // Token is invalid, remove it
          authApi.logout();
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
  };

  return (
    <>
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center text-lg">
          {t('loading')}
        </div>
      ) : user ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/awareness" element={<Awareness />} />
          <Route path="/hygiene-test" element={<HygieneTest />} />
          <Route path="/todo-list" element={<TodoList />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/subscription" element={<SubscriptionPlans onSubscribe={() => {}} />} />
          <Route path="/compliance" element={<ComplianceTracker />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <AuthForm onAuthSuccess={handleAuthSuccess} />
      )}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CartProvider>{/* Wrap AppContent with CartProvider */}
            <AppContent />
          </CartProvider>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
