import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import ChatAssistant from './components/ChatAssistant';

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services/:serviceId" element={<ServiceDetail />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <ChatAssistant />
      </Router>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
