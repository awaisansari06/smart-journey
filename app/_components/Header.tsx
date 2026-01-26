"use client"

import { useUser } from "@clerk/nextjs";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserButton, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

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

  return (
    <div className='flex justify-between items-center p-4'>
      {/* Logo */}
      <div className='flex gap-2 items-center'>
        <Image src={'/logo.svg'} alt='logo' width={40} height={40} />
        <h2 className='font-bold text-2xl'>SmartJourney</h2>
      </div>
      {/* Menu Options */}
      <div className='flex gap-8 items-center'>
        {menuOptions.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <h2 className='text-lg hover:scale-105 transition-all hover:text-primary'>{menu.name}</h2>
          </Link>
        ))}
      </div>
      <div className='flex gap-2 items-center'>
        <SignedIn>
          <Link href={'/create-trip'}>
            <Button className="rounded-full">Create New Trip</Button>
          </Link>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignUpButton mode="modal">
            <Button>Sign Up</Button>
          </SignUpButton>
          <SignInButton mode="modal">
            <Button>Sign In</Button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>

  )
}

export default Header;
