'use client';

import { Button, NavbarContent, NavbarItem } from '@nextui-org/react';
import cn from 'classnames';
import Link from 'next/link';

import { FC } from 'react';

import KYCButton from '../ui/KYCButton';

import { ModalNames } from '@/constants';
import useAuth from '@/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectFinanceData, selectUser } from '@/store/selectors';
import { setModalVisible } from '@/store/slices/ui';

type UserProps = {
  className?: string;
};

const AuthButtons: FC<UserProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);
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
          <NavbarItem className="hidden sm:flex">
            <KYCButton onClick={openKycModal} />
          </NavbarItem>
          <Button className="font-medium text-black" onClick={signOut} color="danger" variant="light" href="/">
            Logout
          </Button>
        </>
      ) : (
        <>
          {/* <NavbarItem className="hidden lg:flex">
            <Link href="/auth/signup">Sign up</Link>
          </NavbarItem> */}

          <NavbarItem>
            <Button as={Link} color="success" href="/auth/login/otp" variant="flat">
              Log in
            </Button>
          </NavbarItem>
        </>
      )}
    </NavbarContent>
  );
};

export default AuthButtons;
