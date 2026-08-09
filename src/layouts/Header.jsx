import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextAlignJustify,
  X,
  LogOutIcon,
  LayoutDashboard,
  UserRoundPen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Separator } from "@/components/ui/separator";

import { useAuth } from "@/context/AuthContext";

const navitems = [{ name: "Home", href: "/" }];

const authedNavitems = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
  // { name: "Profile", href: "/profile" },
];

const logo = (
  <img src="/logo.png" alt="Logo" className="h-12 w-12 rounded-full mr-2" />
);

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMenu = () => setIsMobileMenuOpen((open) => !open);

  const navigate = useNavigate();
  const loggedIn = isAuthenticated;

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const avatarFallback = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  const avatarSrc = user?.avatar
    ? user.avatar.startsWith("http")
      ? user.avatar
      : `${window.location.origin}${user.avatar}`
    : "";

  return (
    <>
      <nav className="hidden md:flex items-center justify-between border-b border-amber-400/20 bg-gradient-to-r from-slate-950/80 via-slate-900/70 to-slate-950/80 px-6 py-4 shadow-[0_8px_30px_-12px_rgba(251,146,60,0.25)] backdrop-blur-xl sm:px-8 lg:px-10">
        <Link to="/" className="flex items-center">
          {logo}
        </Link>
        <ul className="flex items-center gap-6">
          {(loggedIn ? authedNavitems : navitems).map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className="bg-gradient-to-r from-amber-300 via-orange-300 to-fuchsia-300 bg-[length:0%_2px] bg-bottom bg-no-repeat pb-1 font-medium text-slate-200 transition-all duration-300 hover:bg-[length:100%_2px] hover:text-amber-300 active:text-amber-300"
              >
                {item.name}
              </Link>
            </li>
          ))}
          {!loggedIn ? (
            <Button
              size="sm"
              className="ml-4 bg-gradient-to-r from-amber-400 via-orange-400 to-fuchsia-500 font-semibold text-gray-950 hover:from-amber-300 hover:via-orange-300 hover:to-fuchsia-400"
              onClick={() => navigate("/auth")}
            >
              Sign In
            </Button>
          ) : (
            <DropdownMenu>
              {" "}
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarImage src={avatarSrc} alt={user?.name || "User"} />
                      <AvatarFallback>{avatarFallback}</AvatarFallback>
                    </Avatar>
                  </Button>
                }
              />
              <DropdownMenuContent
                align="end"
                className="w-56 border-amber-400/20 bg-gradient-to-b from-slate-900 to-slate-950 text-white"
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem render={<Link to="/dashboard" />}>
                    <LayoutDashboard />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem render={<Link to="/profile" />}>
                    <UserRoundPen />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOutIcon />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </ul>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden border-b border-amber-400/20 bg-gradient-to-b from-slate-950/90 to-slate-900/80 backdrop-blur-lg sticky top-0 z-50 shadow-[0_8px_30px_-12px_rgba(251,146,60,0.25)]">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center">
            {logo}
          </Link>

          <button
            onClick={toggleMenu}
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
            className="p-2 rounded-lg hover:bg-white/10 transition"
          >
            {isMobileMenuOpen ? (
              <X size={24} />
            ) : (
              <TextAlignJustify size={24} />
            )}
          </button>
        </div>

        {/* Dropdown Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
          id="mobile-menu"
        >
          <ul className="flex flex-col px-6 pb-6 space-y-4">
            {(loggedIn ? authedNavitems : navitems).map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="block bg-gradient-to-r from-amber-300 via-orange-300 to-fuchsia-300 bg-clip-text text-lg font-medium text-transparent transition hover:opacity-75"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* CTA Button */}
            {!loggedIn ? (
              <Button
                variant="default"
                size="lg"
                className="mt-4 w-full bg-gradient-to-r from-amber-400 via-orange-400 to-fuchsia-500 text-gray-950 hover:from-amber-300 hover:via-orange-300 hover:to-fuchsia-400"
                onClick={() => {
                  navigate("/auth");
                  setIsMobileMenuOpen(false);
                }}
              >
                Sign In
              </Button>
            ) : (
              <Button
                variant="default"
                size="lg"
                className="mt-4 w-full bg-gradient-to-r from-amber-400 via-orange-400 to-fuchsia-500 text-gray-950 hover:from-amber-300 hover:via-orange-300 hover:to-fuchsia-400"
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
              >
                Sign Out
              </Button>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
