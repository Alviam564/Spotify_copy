import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Loader, RelatedSongs } from '../components'

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/shazamCore";

const SongDetails = () => {
  const dispatch = useDispatch()
  const { songid } = useParams()
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const { data: songData, isFetching: isfetchingSongDetails } = useGetSongDetailsQuery( songid );
  const { data: relatedSongs, isFetching: isfetchingSongRelatedSongs, error } = useGetSongRelatedQuery({ songid });
  
  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  const handlePlayClick = ( song, i) => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }

  if (isfetchingSongDetails || isfetchingSongRelatedSongs) { return <Loader title="Searching song details" />; }

  if (error) return <div className="text-white p-6 text-lg">"Unable to load song — data unavailable or rate limit hit</div>;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">
          Lyrics:
        </h2>

        <div className="mt-5">
          {songData?.sections[1].type === 'LYRICS'
          ?songData?.sections[1].text.map((Line, i) => (
            <p key={i} className="text-gray-400 text-base my-1">
              {Line} 
            </p>
          )) : <p className="text-gary-400 text-base my-1">Sorry, no lyrics found!</p>}
        </div>
      </div>

      {Array.isArray(relatedSongs) && relatedSongs.length > 0 ? (
      <RelatedSongs
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    ) : (
      <p className="text-gray-400 italic">Related songs coming soon or unavailable.</p>
    )}
    </div>
  )
}

export default SongDetails