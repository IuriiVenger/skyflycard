'use client';

import cx from 'classnames';
import Link from 'next/link';

import { FC, useEffect } from 'react';

import useAuth from '@/hooks/useAuth';
import { useAppSelector } from '@/store';
import { selectUserData } from '@/store/selectors';

type UserProps = {
  classNames?: string;
};

const AuthButtons: FC<UserProps> = ({ classNames }) => {
  const { user, isUserInitialized } = useAppSelector(selectUserData);
  const { signOut, initUser } = useAuth();

  const userClassNames = cx(
    'flex gap-4 transition-opacity duration-300',
    isUserInitialized ? 'opacity-100' : 'opacity-0',
    classNames,
  );

  useEffect(() => {
    initUser();
  }, []);

  return (
    <section className={userClassNames}>
      {user ? (
        <button type="button" onClick={signOut}>
          Sign out
        </button>
      ) : (
        <>
          <Link href="/auth/login">Log in</Link>
          <Link href="/auth/signup">Sign up</Link>
        </>
      )}
    </section>
  );
};

export default AuthButtons;
