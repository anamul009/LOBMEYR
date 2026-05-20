import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Concept from "./pages/Concept";
import Event from "./pages/Event";
import Floor from "./pages/Floor";
import Menu from "./pages/Menu";
import Performer from "./pages/Performer";
import Contact from "./pages/Contact";
import EventDetail from "./pages/EventDetail";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/concept" component={Concept} />
      <Route path="/event" component={Event} />
      <Route path="/event/:id" component={EventDetail} />
      <Route path="/floor" component={Floor} />
      <Route path="/menu" component={Menu} />
      <Route path="/performer" component={Performer} />
      <Route path="/contact" component={Contact} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <WouterRouter base={base}>
            <Layout>
              <Router />
            </Layout>
          </WouterRouter>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
