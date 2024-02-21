'use client';

import { Button, NavbarContent, NavbarItem } from '@nextui-org/react';
import cx from 'classnames';
import Link from 'next/link';

import { FC } from 'react';

import useAuth from '@/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectCommonData, selectUserData } from '@/store/selectors';

type UserProps = {
  className?: string;
};

const AuthButtons: FC<UserProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUserData);
  const { isAppInitialized } = useAppSelector(selectCommonData);
  const { signOut } = useAuth(dispatch);

  const userClassNames = cx(
    'transition-opacity duration-300',
    isAppInitialized ? 'opacity-100' : 'opacity-0',
    className,
  );

  return (
    <NavbarContent className={userClassNames} justify="end">
      {user ? (
        <Button className="font-medium text-black" onClick={signOut} color="danger" variant="light" href="/">
          Logout
        </Button>
      ) : (
        <>
          <NavbarItem className="hidden lg:flex">
            <Link href="/auth/signup">Sign up</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="success" href="/auth/login" variant="flat">
              Log in
            </Button>
          </NavbarItem>
        </>
      )}
    </NavbarContent>
  );
};

export default AuthButtons;
