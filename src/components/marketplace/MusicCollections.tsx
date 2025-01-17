import React, { useState, useEffect } from 'react';
import { getAllMusicCollections } from '../../utils/retrieve';
import '../../css/marketplace.css';
import CollectionCard from './CollectionCard';

interface MusicCollection {
  artist: string;
  name: string;
  cover_cdn_thumbnail_url: string;
  cover_cdn_url: string;
  description: string;
  resource_type: string;
}

const MusicCollections: React.FC<{}> = () => {
  const [musicCollections, setMusicCollections] = useState<MusicCollection[]>();

  useEffect(() => {
    (async () => {
      if (!musicCollections) {
        const res = await getAllMusicCollections();
        setMusicCollections(res);
      }
    })();
  }, [musicCollections, setMusicCollections]);

  return (
    <div className="grid md:grid-cols-3 z-20">
      {musicCollections &&
        musicCollections.map((col: MusicCollection, i) => (
          <CollectionCard
            artist={col.artist}
            name={col.name}
            image={col.cover_cdn_thumbnail_url}
            key={`${col.name}-${i}`}
          />
        ))}
    </div>
  );
};
export default MusicCollections;
