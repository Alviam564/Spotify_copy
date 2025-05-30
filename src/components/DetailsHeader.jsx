import { Link } from 'react-router-dom'

const DetailsHeader = ({ artistId, artistData, songData }) => {
  const artist = artistData?.artists[artistId]?.attributes;

  return (
    <div className='relative w-full flex flex-col' >
      <div className='w-full bg-gradient-to-l from-transparent to to-black sm:h-48 h-28' />

      <div className='absolute inset-0 flex items-center'>
        <img 
          src={artistId ? song?.attributes?.artwork?.url.replace('{w}', '125').replace('{h}', '125') : song?.images?.coverart} 
          alt="art"
          className='sm:w-48 w-28 sm:h48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black'
        />
        <div className='ml-5'>
          <p className='font-bold sm:text-3xl tet-xl text-white'>
            {artistId ? artist?.name : songData?.name}
          </p>
          {!artistId && (
            <Link to={'/artists/${songData?.artists[0].adamid}'}>
              <p className='text-base text-gary-400 mt-2'>
                {songData?.song.attributes?.artistName}</p>
            </Link>
          )}
          <p className='text-base text-gary-400 mt-2'>
            {artistId ? artist?.genreNames[0] : songData?.genrees?.primary}
          </p>
        </div>
      </div>

      <div className='w-full sm:h-44 h-24' />
    </div>
  )
};

export default DetailsHeader;
