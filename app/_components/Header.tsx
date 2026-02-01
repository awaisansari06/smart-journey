"use client"

import { useUser } from "@clerk/nextjs";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import GradientButton from '@/components/ui/gradient-button';
import { UserButton, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { usePathname } from 'next/navigation';

const menuOptions = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Pricing',
    path: '/pricing'
  },
  {
    name: 'Contact us',
    path: '/contact-us'
  }
]


function Header() {
  const { user } = useUser();
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
      ? 'bg-white/70 dark:bg-black/70 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-white/10'
      : 'bg-transparent border-transparent'
      }`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Left Logo */}
        <Link href="/" className='flex gap-2 items-center'>
          <Image src={'/logo.svg'} alt='logo' width={40} height={40} />
          <h1 className='font-bold text-xl'>SmartJourney</h1>
        </Link>

        {/* Center Links */}
        <nav className="hidden md:flex items-center gap-10 text-base font-medium text-gray-700 dark:text-gray-200">
          {menuOptions.map((menu, index) => (
            <Link href={menu.path} key={index} className="relative group hover:text-primary transition-colors">
              {menu.name}
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2.5px] bg-primary transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          ))}
        </nav>

        {/* Right Buttons */}
        <div className='flex gap-2 items-center'>
          <SignedIn>
            <Link href={'/dashboard'}>
              <GradientButton variant="outline" className="hidden sm:flex">Dashboard</GradientButton>
            </Link>
            {pathname !== '/create-new-trip' &&
              <Link href={'/create-new-trip'}>
                <GradientButton>Create New Trip</GradientButton>
              </Link>
            }
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignUpButton mode="modal">
              <GradientButton>Sign Up</GradientButton>
            </SignUpButton>
            <SignInButton mode="modal">
              <GradientButton variant="outline">Sign In</GradientButton>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}

export default Header;
