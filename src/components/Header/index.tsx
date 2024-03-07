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
import React, { FC, useState } from 'react';

import KYCButton from '../KYC/KYCButton';

import AuthButtons from './AuthButtons';

import headerLogo from '@/assets/svg/header_logo.svg';
import { ModalNames, requestKYCStatuses } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectIsUserLoggedIn, selectUser } from '@/store/selectors';
import { setModalVisible } from '@/store/slices/ui';

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

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const isUserSignedIn = useAppSelector(selectIsUserLoggedIn);
  const { userData } = useAppSelector(selectUser);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const showKYCModal = () => {
    dispatch(setModalVisible(ModalNames.KYC));
    closeMenu();
  };

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} className="w-full" isBordered maxWidth="2xl">
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
            <Link
              className="w-full"
              color={index === menuItems.length - 1 ? 'danger' : 'foreground'}
              href={item.href}
              onClick={closeMenu}
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}

        {userData && requestKYCStatuses.includes(userData.kyc_status) && (
          <KYCButton className="mt-4" onClick={showKYCModal} status={userData?.kyc_status} />
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
