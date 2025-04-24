import React from "react"

// React Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Contexts
import { AuthProvider } from "@/contexts/AuthContext"
import { WalletProvider } from "@/contexts/WalletContext"
import { MarketplaceProvider } from "@/contexts/MarketplaceContext"
import { CrowdfundingProvider } from "@/contexts/CrowdfundingContext"

// Components
import PrivateRoute from "@/components/auth/PrivateRoute"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import FloatingButton from "@/components/ui/floating-button"
import SupportDialog from "@/components/support/support-dialog"

// Pages - Públicas
import Home from "@/pages/Home"
import Login from "@/pages/auth/Login"
import Register from "@/pages/auth/Register"
import ResetPassword from "@/pages/auth/ResetPassword"
import Terms from "@/pages/Terms"
// import Privacy from "@/pages/Privacy" // ❌ Comentado: arquivo não existe
// import Contact from "@/pages/Contact" // ❌ Comentado: arquivo não existe

// Pages - Privadas
import Profile from "@/pages/Profile"
import Dashboard from "@/pages/Dashboard"
import AdminPanel from "@/pages/admin/AdminPanel"
import StoreDashboard from "@/pages/store/StoreDashboard"

// Marketplace
import Marketplace from "@/pages/marketplace/Marketplace"
import ProductDetails from "@/pages/marketplace/ProductDetails"

// Crowdfunding
import CrowdfundingPage from "@/pages/crowdfunding/CrowdfundingPage"

export default function App() {
  const [supportOpen, setSupportOpen] = React.useState(false)

  return (
    <Router>
      <AuthProvider>
        <WalletProvider>
          <MarketplaceProvider>
            <CrowdfundingProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    {/* Rotas públicas */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/terms" element={<Terms />} />
                    {/* <Route path="/privacy" element={<Privacy />} /> */}
                    {/* <Route path="/contact" element={<Contact />} /> */}
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/product/:productId" element={<ProductDetails />} />
                    <Route path="/crowdfunding" element={<CrowdfundingPage />} />

                    {/* Rotas privadas */}
                    <Route
                      path="/profile"
                      element={
                        <PrivateRoute>
                          <Profile />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/dashboard"
                      element={
                        <PrivateRoute>
                          <Dashboard />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/store/dashboard"
                      element={
                        <PrivateRoute>
                          <StoreDashboard />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/admin/*"
                      element={
                        <PrivateRoute>
                          <AdminPanel />
                        </PrivateRoute>
                      }
                    />
                  </Routes>
                </main>

                {/* Elementos fixos da interface */}
                <Footer />
                <FloatingButton onClick={() => setSupportOpen(true)} />
                <SupportDialog
                  open={supportOpen}
                  onOpenChange={setSupportOpen}
                />
              </div>
            </CrowdfundingProvider>
          </MarketplaceProvider>
        </WalletProvider>
      </AuthProvider>
    </Router>
  )
}
