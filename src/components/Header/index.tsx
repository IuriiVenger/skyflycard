'use client';

import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';

import Image from 'next/image.js';
import Link from 'next/link';
import React, { FC } from 'react';

import AuthButtons from './AuthButtons';

import headerLogo from '@/assets/svg/header_logo.svg';
import { useAppSelector } from '@/store';
import { selectIsUserLoggedIn } from '@/store/selectors';

const Header: FC = () => {
  const menuItems = [
    {
      title: 'Main',
      href: '/',
    },
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
  ];

  const isUserSignedIn = useAppSelector(selectIsUserLoggedIn);

  return (
    <Navbar className="w-full" isBordered maxWidth="2xl">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="pr-3 sm:hidden" justify="center">
        <NavbarBrand>
          <Image src={headerLogo} alt="Logo" />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarBrand>
          <Image src={headerLogo} alt="Logo" />
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="/">
            Main
          </Link>
        </NavbarItem>
        {isUserSignedIn && (
          <NavbarItem>
            <Link href="/dashboard" aria-current="page">
              Dashboard
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>

      <AuthButtons />

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" color={index === menuItems.length - 1 ? 'danger' : 'foreground'} href={item.href}>
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
