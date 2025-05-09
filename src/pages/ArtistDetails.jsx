import { useParams } from "react-router-dom";
import { useSelector} from "react-redux";
import { DetailsHeader, Loader, RelatedSongs } from '../components'

import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";

const ArtistDetails = () => {
  const { id: artistId } = useParams()
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const { data: artistData, isFetching: isfetchingArtistDetails } = useGetArtistDetailsQuery(artistId);


  if (isfetchingArtistDetails || isfetchingArtistRelatedSongs) { return <Loader title="Searching Artist details" />; }

  if (error) return <div className="text-white p-6 text-lg">"Unable to load Artist — data unavailable or rate limit hit</div>;

  return (
    <div className="flex flex-col">
      <DetailsHeader 
        artistId={artistId} 
        artistData={artistData} 
      />

      {Array.isArray(RelatedSongs) && RelatedSongs.length > 0 ? (
      <RelatedSongs
        data={Object.values(artistData?.songs)}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    ) : (
      <p className="text-gray-400 italic">Data coming soon or unavailable.</p>
    )}
    </div>
  )
}

export default ArtistDetails