import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Box, User, ShoppingCart, Menu, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userRole, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Box className="h-8 w-8 text-primary group-hover:animate-pulse-glow transition-all" />
              <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/40 transition-all" />
            </div>
            <span className="text-2xl font-bold text-gradient">Print3D Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}>
              Home
            </Link>
            <Link to="/models" className={`text-sm font-medium transition-colors ${isActive('/models') ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}>
              Models
            </Link>
            <Link to="/custom-print" className={`text-sm font-medium transition-colors ${isActive('/custom-print') ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}>
              Custom Print
            </Link>
            {user && userRole === 'customer' && (
              <Link to="/dashboard" className={`text-sm font-medium transition-colors ${isActive('/dashboard') ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}>
                Dashboard
              </Link>
            )}
            {user && userRole === 'admin' && (
              <Link to="/owner" className={`text-sm font-medium transition-colors ${isActive('/owner') ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}>
                Admin
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground truncate max-w-[150px]">
                  {user.email}
                </span>
                <Button onClick={handleSignOut} variant="ghost" size="sm" className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}
            <Link to="/cart">
              <Button size="sm" className="gap-2 glow-primary">
                <ShoppingCart className="h-4 w-4" />
                Cart
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 animate-slide-in-up">
            <Link to="/" className="block px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
              Home
            </Link>
            <Link to="/models" className="block px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
              Models
            </Link>
            <Link to="/custom-print" className="block px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
              Custom Print
            </Link>
            {user && userRole === 'customer' && (
              <Link to="/dashboard" className="block px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
                Dashboard
              </Link>
            )}
            {user && userRole === 'admin' && (
              <Link to="/owner" className="block px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
                Admin
              </Link>
            )}
            <div className="flex flex-col gap-2 px-4 pt-2">
              {user ? (
                <>
                  <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                  <Button onClick={handleSignOut} variant="ghost" size="sm" className="w-full gap-2">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link to="/auth" className="w-full">
                  <Button variant="ghost" size="sm" className="w-full">Login</Button>
                </Link>
              )}
              <Link to="/cart" className="w-full">
                <Button size="sm" className="w-full">Cart</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
