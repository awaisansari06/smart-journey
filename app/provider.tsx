"use client";

import React, { useEffect } from 'react';
import Header from './_components/Header';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useState } from 'react';
import { useContext } from 'react';
import { TripContextType, TripDetailContext } from '@/context/TripDetailContext';
import { TripInfo } from './create-new-trip/_components/types';


function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const createUser = useMutation(api.user.CreateNewUser);
  const [userDetail, setUserDetail] = useState<any>();
  const [tripDetailInfo, setTripDetailInfo] = useState<TripInfo | null>(null);
  const { user } = useUser();


  useEffect(() => {
    user && CreateNewUser();
  }, [user]);

  const CreateNewUser = async () => {
    if (user) {

      // Save New User if Not exists
      const result = await createUser({
        email: user?.primaryEmailAddress?.emailAddress ?? '',
        name: user?.fullName ?? '',
        imageUrl: user?.imageUrl ?? '',
      });
      setUserDetail(result);
    }
  }

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <TripDetailContext.Provider value={{ tripDetailInfo, setTripDetailInfo }}>
        <div>
          <Header />
          {children}</div>
      </TripDetailContext.Provider>
    </UserDetailContext.Provider>
  )
}

export default Provider

export const useUserDetail = () => {
  return useContext(UserDetailContext);
}

export const useTripDetail = (): TripContextType => {
  return useContext(TripDetailContext);
}
