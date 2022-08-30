import React from 'react'
import Header from '../components/marketplace/Header'
import Hero from '../components/marketplace/Hero';
import ImageCollections from '../components/marketplace/ImageCollections';
import MusicCollections from '../components/marketplace/MusicCollections';

const Marketplace: React.FC<{}> = () => {
  
  return (
    <div className="w-full flex flex-col p-5 items-center">
      <Header/>
      <Hero/>
      {/* <ImageCollections/> */}
      {/* <MusicCollections/> */}
    </div>
  ); 
}
export default Marketplace;