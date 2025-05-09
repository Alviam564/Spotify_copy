import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = ({ song, isPlaying, activeSong, i, data }) => {

  const dispatch = useDispatch()

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }
  return (
    <div className="flex flex-con p-4 bg-[#1F1F1F] bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className='flex-row w-[230px]'>
        <div className="relative w-full h-57 group">
          <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex 
            ${activeSong?.attributes?.name === song.attributes?.name ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
              <PlayPause
              isPlaying={isPlaying}
              activeSong={activeSong}
              song={song}
              handlePause={handlePauseClick}
              handlePlay={handlePlayClick}
            />
          </div>
          <img alt="song_img" src={song.attributes?.artwork?.url} />
        </div>
        <div className='mt-4 flex flex-col'>
          <p className='font-semibold text-lg text-white truncate'>
            <Link to={{pathname: `/songs/${song.id}`, state: {song}}}>
              {song.attributes?.name} 
            </Link>
          </p>
          <p className='text-sm truncate text-gray-300 mt-1'>
            <Link to={song.attributes?.artistName ? `/arttists/${song.attributes?.artistName[0]?.adamid}` : `/top-artists`}>
              {song.attributes?.artistName} 
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
};

export default SongCard;
