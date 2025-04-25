import React from "react"

// React Router and Links
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Contexts
import { AuthProvider } from "@/contexts/AuthContext";
import { WalletProvider } from "@/contexts/WalletContext";
import { MarketplaceProvider } from "@/contexts/MarketplaceContext";
import { CrowdfundingProvider } from "@/contexts/CrowdfundingContext";
import { CartProvider } from "@/contexts/CartContext";

// Cart Components
import CheckoutCart from "@/components/cart/CheckoutCart";
import CheckoutSummary from "@/components/cart/CheckoutSummary"
// Components
import PrivateRoute from "@/components/auth/PrivateRoute"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import FloatingButton from "@/components/ui/floating-button"
import SupportDialog from "@/components/support/support-dialog"
import CheckoutForm from '@/components/CheckoutForm'


// Pages - Públicas
import Home from "@/pages/Home"
import Login from "@/pages/auth/Login"
import Register from "@/pages/auth/Register"
import ResetPassword from "@/pages/auth/ResetPassword"
import Terms from "@/pages/Terms"

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
import CreateCampaignDialog from "@/pages/crowdfunding/CreateCampaignDialog"



export default function App() {
  const [supportOpen, setSupportOpen] = React.useState(false)

  // Visual Test to check if the routes are working
  const visualTest = (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Visual Test: Routes</h2>
      <ul className="list-disc list-inside">
        <li><a href="/" target="_blank" className="text-blue-500 hover:underline">Home</a></li>
        <li><a href="/login" target="_blank" className="text-blue-500 hover:underline">Login</a></li>
        <li><a href="/register" target="_blank" className="text-blue-500 hover:underline">Register</a></li>
        <li><a href="/reset-password" target="_blank" className="text-blue-500 hover:underline">Reset Password</a></li>
        <li><a href="/terms" target="_blank" className="text-blue-500 hover:underline">Terms</a></li>
        <li><a href="/marketplace" target="_blank" className="text-blue-500 hover:underline">Marketplace</a></li>
        <li><a href="/product/1" target="_blank" className="text-blue-500 hover:underline">Product Details</a></li> {/* Example product ID */}
        <li><a href="/crowdfunding" target="_blank" className="text-blue-500 hover:underline">Crowdfunding</a></li>
        <li><a href="/profile" target="_blank" className="text-blue-500 hover:underline">Profile</a> (Private)</li>
        <li><a href="/dashboard" target="_blank" className="text-blue-500 hover:underline">Dashboard</a> (Private)</li>
        <li><a href="/store/dashboard" target="_blank" className="text-blue-500 hover:underline">Store Dashboard</a> (Private)</li>
        <li><a href="/admin" target="_blank" className="text-blue-500 hover:underline">Admin Panel</a> (Private)</li>
        <li><a href="/admin/users" target="_blank" className="text-blue-500 hover:underline">Admin Panel Users</a> (Private)</li>
        <li><a href="/admin/transactions" target="_blank" className="text-blue-500 hover:underline">Admin Panel Transactions</a> (Private)</li>
        <li><a href="/admin/stores" target="_blank" className="text-blue-500 hover:underline">Admin Panel Stores</a> (Private)</li>
        <li><a href="/admin/settings" target="_blank" className="text-blue-500 hover:underline">Admin Panel Settings</a> (Private)</li>
      </ul>
    </div>
  )

  return (
        <Router>
      <AuthProvider>
        <WalletProvider>
          <MarketplaceProvider>
            <CrowdfundingProvider>
            <CartProvider>
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
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/product/:productId" element={<ProductDetails />} />
                    <Route path="/crowdfunding" element={<CrowdfundingPage />} />
                    <Route path="/cart" element={<CheckoutCart />} />
                    <Route path="/checkout" element={<CheckoutSummary />} />
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
                      path="/crowdfunding/create"
                      element={
                        <PrivateRoute>
                          <CreateCampaignDialog />
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
                    <Route path="/admin/*" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
                  </Routes>
                  {process.env.NODE_ENV === 'development' && visualTest}
                </main>
                <Footer />
                <FloatingButton onClick={() => setSupportOpen(true)} />
                <SupportDialog open={supportOpen} onOpenChange={setSupportOpen} />
              </div>
              </CartProvider>
            </CrowdfundingProvider>
          </MarketplaceProvider>
        </WalletProvider>
      </AuthProvider>
    </Router>
  )
}
