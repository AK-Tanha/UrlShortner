import React from 'react'
const navitems = [
  
  {
    name: 'Home',
    href: '/'
  },
  {
    name: 'Dashboard',
    href: '/dashboard'
  },
  {
    name: 'Login',
    href: '/auth'
  },
 
]
const isLoggedIn = true;

const Header = () => {
  return (
    <nav className="flex items-center justify-between border-b border-white/10 px-6 py-4 sm:px-8 lg:px-10">
      <div className="text-2xl font-bold text-amber-400">UrlShortner</div>
      <ul className="flex space-x-4">
        {navitems.map((item) => (
          <li key={item.href}>
            {isLoggedIn || item.name !== 'Login' ? (
              <a href={item.href} className="hover:text-amber-300 active:text-2xl">
                {item.name}
              </a>
            ) : null}       
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Header
