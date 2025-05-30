import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

import 'swiper/css'
import 'swiper/css/free-mode'



const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <div className='w-full flex flex-row items-center hover:bg-[#166534] py-2 p-4 rounded-lg curor-pointer mb-2'>
    <h3 className='fotbold text-base text-white mr-3'>{i + 1 }</h3>
    <div className='flex-1 flex flex-row justify-between items-center'>
      <img className='w-20 h-20 rounded-lg' src={song?.attributes?.artwork?.url} alt={song?.title} />
      <div className='flex-1 flex flex-col justify-center mx-3'>
        <Link to={{pathname: `/songs/${song.id}`, state: {song}}}>
          <p className='text-xl font-bold text-white'>{song?.attributes?.name}</p>
        </Link>
        <Link to={`/artists/${song?.relationships?.artists?.data?.[0]?.id}`}>
          <p className='text-ase text-gray-300 mt-1'>{song.attributes?.artistName}</p>
        </Link>
      </div>
    </div>
    <PlayPause 
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
      />
  </div>
)


const TopPlay = () => {
  const dispatch = useDispatch()
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const { data } = useGetTopChartsQuery()
  const divRef = useRef(null)
  
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' })
  })
  
  const topPlays = data?.slice(0, 5)
  
  const handlePauseClick = () => {
    dispatch(playPause(false))
  }
  
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }
  
  return (
    <div ref={divRef} className='xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[440px] rounded-lg max-w-full flex flex-col bg-[#202020] 2xl:h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar'>
      <div className='w-full flex flex-col 2xl:pb-[100px]'>
        <div className='flex flex-row justify-between items-center pl-[15px] pt-[10px]'>
          <h2 className='text-white font-bold text-2xl '>Top Charts</h2>
          <Link to="/top-charts">
            <p className='text-gray-300 text-base cursor-pointer pr-[15px]'>See More</p>
          </Link>
        </div>
        
        <div className='mt-4 flex flex-col gap-1'>
          {topPlays?.map((song, i) => (
            <TopChartCard
            key={song.key} 
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>

        <div className='w-full flex flex-col mt-8'>
          <div className='flex flex-row justify-between items-center pl-[15px]'>
            <h2 className='text-white font-bold text-2xl'>Top Artists</h2>
            <Link to="/top-artists">
              <p className='text-gray-300 text-base cursor-pointer pr-[15px]'>See More</p>
            </Link>
          </div>

          <Swiper
            slidesPerView="auto"
            spaceBetween={5}
            freeMode
            centeredSlides
            centeredSlidesBounds
            modules={[FreeMode]}
            className="mt-4"
            >
            {topPlays?.map((song, i) => (
              <SwiperSlide
              key={song?.key}
              style={{ width: '25%', height: 'auto'}}
              className="shadow-lg rounded-full animate-slideright ml-2 mb-5"
              >
                <Link to={`/artists/${song?.attributes?.artistName}`}>
                  <img src={song?.attributes?.artwork?.url} alt="name" className='rounded-full w-full object-cover' />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
};

export default TopPlay;