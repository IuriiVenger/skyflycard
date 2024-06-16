'use client';

import { Button, NavbarContent, NavbarItem } from '@nextui-org/react';
import cn from 'classnames';
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { FC } from 'react';

import KYCButton from '../KYC/KYCButton';

import { ModalNames, requestKYCStatuses } from '@/constants';
import useAuth from '@/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectFinanceData, selectUser } from '@/store/selectors';
import { setModalVisible } from '@/store/slices/ui';

type UserProps = {
  className?: string;
};

const AuthButtons: FC<UserProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const { user, userData } = useAppSelector(selectUser);
  const { isAppInitialized } = useAppSelector(selectFinanceData);
  const { signOut } = useAuth(dispatch);
  const pathname = usePathname();
  const isDashboardPage = pathname === '/dashboard';
  const isKYCButtonVisible = !isDashboardPage && userData && requestKYCStatuses.includes(userData.kyc_status);

  const openKycModal = () => dispatch(setModalVisible(ModalNames.KYC));

  const userClassNames = cn(
    'transition-opacity duration-300 md:flex hidden text-sm',
    isAppInitialized ? 'opacity-100' : 'opacity-0',
    className,
  );

  return (
    <NavbarContent className={userClassNames} justify="end">
      {user ? (
        <>
          {isKYCButtonVisible && (
            <NavbarItem className="hidden lg:flex">
              <KYCButton onClick={openKycModal} status={userData.kyc_status} />
            </NavbarItem>
          )}
          <NavbarItem>
            <Link className="w-full text-sm text-tenant-main hover:underline" href="/dashboard">
              Dashboard
            </Link>
          </NavbarItem>
          <button type="button" className="w-fit bg-inherit p-0  text-tenant-main hover:underline" onClick={signOut}>
            Logout
          </button>
        </>
      ) : (
        <div className="flex gap-8">
          <NavbarItem>
            <Link className="bg-inherit  text-tenant-main hover:underline" href="/auth/login/otp">
              Sign up
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="bg-inherit  text-tenant-main hover:underline" href="/auth/login/otp">
              Log in
            </Link>
          </NavbarItem>
        </div>
      )}
    </NavbarContent>
  );
};

export default AuthButtons;
