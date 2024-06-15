'use client';

import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Divider,
} from '@nextui-org/react';

import Image from 'next/image.js';
import Link from 'next/link';
import React, { FC, useState } from 'react';

import KYCButton from '../KYC/KYCButton';

import AuthButtons from './AuthButtons';

import headerLogo from '@/assets/svg/header_logo.svg';
import { ModalNames, requestKYCStatuses } from '@/constants';
import useAuth from '@/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectIsUserLoggedIn, selectUser } from '@/store/selectors';
import { setModalVisible } from '@/store/slices/ui';

const menuItems = [
  { title: 'About', href: '/#title' },
  { title: 'Contacts', href: '/#contacts' },
  { title: 'Exchange', href: '/#exchange' },
  { title: 'Features', href: '/#features' },
  { title: 'OTC', href: '/#otc' },
];

const authItems = [
  { title: 'Sign up', href: '/auth/login/otp' },
  { title: 'Sign in', href: '/auth/login' },
];

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const isUserSignedIn = useAppSelector(selectIsUserLoggedIn);
  const { userData } = useAppSelector(selectUser);
  const { signOut } = useAuth(dispatch);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const showKYCModal = () => {
    dispatch(setModalVisible(ModalNames.KYC));
    closeMenu();
  };

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} className="w-full" isBordered maxWidth="2xl">
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarContent className="pr-3 md:hidden" justify="center">
        <NavbarBrand>
          <Image src={headerLogo} alt="Logo" />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden flex-grow gap-4 md:flex" justify="center">
        <Link className="flex-shrink-0" href="/">
          <Image src={headerLogo} alt="Logo" />
        </Link>

        <div className="flex w-full  justify-center gap-8">
          {menuItems.map(
            (item, index) =>
              isUserSignedIn && (
                <NavbarItem key={`${item}-${index}`}>
                  <Link className="text-sm text-tenant-main hover:underline" href={item.href}>
                    {item.title}
                  </Link>
                </NavbarItem>
              ),
          )}
        </div>
        <AuthButtons />
      </NavbarContent>

      <NavbarMenu className="gap-8">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full text-tenant-main"
              color={index === menuItems.length - 1 ? 'danger' : 'foreground'}
              href={item.href}
              onClick={closeMenu}
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
        <Divider />
        {isUserSignedIn ? (
          <>
            <NavbarMenuItem>
              <Link className="w-full text-tenant-main" href="/dashboard" onClick={closeMenu}>
                Dashboard
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <button type="button" className="text-tenant-main" onClick={signOut}>
                Logout
              </button>
            </NavbarMenuItem>
          </>
        ) : (
          authItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link className="w-full text-tenant-main" href={item.href} onClick={closeMenu}>
                {item.title}
              </Link>
            </NavbarMenuItem>
          ))
        )}

        {userData && requestKYCStatuses.includes(userData.kyc_status) && (
          <KYCButton onClick={showKYCModal} status={userData?.kyc_status} />
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
