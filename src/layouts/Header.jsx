import { Button } from '@/components/ui/button'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { TextAlignJustify, X } from 'lucide-react';



const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }
  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  }

  const navitems = [
    {
      name: 'Home',
      href: '/'
    },
    {
      name: 'Dashboard',
      href: '/dashboard'
    },

  ];

  const logo = (
    <img src="/logo.png" alt="Logo" className="h-12 w-12 rounded-full mr-2" />
  )

  const navigate = useNavigate();

  return (
    <>
      <nav className="hidden md:flex items-center justify-between border-b border-white/10 px-6 py-4 sm:px-8 lg:px-10">
        <Link to="/" className="flex items-center">
          {logo}
        </Link>
        <ul className="flex space-x-4">
          {navitems.map((item) => (
            <li key={item.href}>
              <Link to={item.href} className="hover:text-amber-300 active:text-2xl">
                {item.name}
              </Link>
            </li>
          ))}
          <Button variant="outline" size="sm" className="ml-4" onClick={() => navigate('/auth')}>
            Sign Up
          </Button>
        </ul>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden border-b border-white/10 bg-black/80 backdrop-blur-lg sticky top-0 z-50">

        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center">
            {logo}
          </Link>

          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg hover:bg-white/10 transition"
          >
            {isMobileMenuOpen ? <X size={24} /> : <TextAlignJustify size={24} />}
          </button>
        </div>

        {/* Dropdown Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-100 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <ul className="flex flex-col px-6 pb-6 space-y-4">
            {navitems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="block text-lg font-medium hover:text-amber-400 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* CTA Button */}
            <Button
              variant="default"
              size="lg"
              className="mt-4 w-full bg-amber-400 text-black hover:bg-amber-300"
              onClick={() => {
                navigate('/auth');
                setIsMobileMenuOpen(false);
              }}
            >
              Sign Up
            </Button>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Header
