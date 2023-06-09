import React from 'react'
import Head from "next/head";
import { api } from '~/utils/api'
import Profile from '~/components/users/Profile'
import { generateSSGHelper } from '~/utils/helpers/ssgHelper';

//Types
import type { NextPage } from "next";
import type { GetServerSideProps } from 'next'

const Home: NextPage = () => {
  const { data: session } = api.auth.getSession.useQuery()
  const { data: user } = api.user.getUserProfile.useQuery(undefined, { enabled: !!session })

  return (
    <>
      <Head>
        <title>Chore App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center text-white">
        <div className="container flex flex-col justify-center gap-4">
          {/* <h1 className="pl-4 text-4xl font-extrabold tracking-tight sm:text-[5rem]">
            Chore <span className='text-emerald-500'>App</span>
          </h1> */}
          {user && <Profile user={user} />}
        </div>
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const ssg = generateSSGHelper();
  await ssg.auth.getSession.prefetch();
  await ssg.user.getUserProfile.prefetch();
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
}