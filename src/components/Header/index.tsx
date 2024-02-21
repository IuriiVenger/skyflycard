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

const Header: FC = () => {
  const menuItems = [
    'Profile',
    'Dashboard',
    'Activity',
    'Analytics',
    'System',
    'Deployments',
    'My Settings',
    'Team Settings',
    'Help & Feedback',
    'Log Out',
  ];

  return (
    <header>
      <Navbar className=" w-screen" disableAnimation isBordered maxWidth="full">
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
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="/" aria-current="page" color="warning">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>

        <AuthButtons />

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link className="w-full" color={index === menuItems.length - 1 ? 'danger' : 'foreground'} href="/">
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </header>
  );
};

export default Header;
