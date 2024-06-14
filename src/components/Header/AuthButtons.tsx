'use client';

import { Button, NavbarContent, NavbarItem } from '@nextui-org/react';
import cn from 'classnames';
import Link from 'next/link';

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

  const openKycModal = () => dispatch(setModalVisible(ModalNames.KYC));

  const userClassNames = cn(
    'transition-opacity duration-300',
    isAppInitialized ? 'opacity-100' : 'opacity-0',
    className,
  );

  return (
    <NavbarContent className={userClassNames} justify="end">
      {user ? (
        <>
          {userData && requestKYCStatuses.includes(userData.kyc_status) && (
            <NavbarItem className="hidden sm:flex">
              <KYCButton onClick={openKycModal} status={userData.kyc_status} />
            </NavbarItem>
          )}
          <Button className="font-medium text-black" onClick={signOut} color="secondary" radius="sm" href="/">
            Logout
          </Button>
        </>
      ) : (
        <NavbarItem>
          <Button as={Link} color="primary" href="/auth/login/otp" variant="flat" radius="sm">
            Log in
          </Button>
        </NavbarItem>
      )}
    </NavbarContent>
  );
};

export default AuthButtons;
