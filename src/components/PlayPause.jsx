import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'


const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay}) => (
  isPlaying && activeSong?.attributes?.name === song?.attributes?.name ? (
  <FaPauseCircle
    size={35}
    className='text-green-500' 
    onClick={handlePause}
  />
) : (
  <FaPlayCircle 
    size={35}
    className='text-green-500' 
    onClick={handlePlay}
  />
))

export default PlayPause;
