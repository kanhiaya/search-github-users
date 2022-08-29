import React from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { useGlobalContext } from '../context/context';
const Dashboard = () => {
  const { isLoding } = useGlobalContext();
  if (isLoding) {
    return (
      <main>
        <Navbar />
        <Search />
        <img src={loadingImage} alt='loadingImg' className='loading-img' />
      </main>
    );
  }

  return (
    <main>
      <Navbar></Navbar>
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  );
};

export default Dashboard;
