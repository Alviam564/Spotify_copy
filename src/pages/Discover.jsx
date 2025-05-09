import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios"
import { Loader, SongCard } from "../components"
import { genres } from "../assets/constants"
import { selectGenreListId } from "../redux/features/playerSlice"
import { useGetSongsByGenreQuery } from "../redux/services/shazamCore"


const Discover = () => {
    const dispatch = useDispatch()
    const [country, setCountry] = useState('')
    const [loading, setLoading] = useState(true)
    const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player)
    const { data, isFetching, error } = useGetSongsByGenreQuery ({ genre: genreListId || 'Pop', countryCode: country }, {skip: !country})

    useEffect(() => {
        axios.get (`https://geo.ipify.org/api/v2/country?apiKey=at_r5hp9DVIS6qZP0YCuhNKNxxAY7d8k`)
            .then((res) => setCountry(res?.data?.location?.country))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }, [country])

    if (isFetching && loading) return <Loader title="Loading songs... " />

    if (error) return <div className="text-white p-6 text-lg">"Unable to load due rate limit hit unless you want to wait till next month</div>;

    const genreTitle = genres.find(({ value }) => value === genreListId)?.title


    return (
        <div className="flex flex-col">
            <div className="w-full flex justify-between items-center
            sm:flex-row flex-col mt-4 mb-10">
                <h2 className= "font-bold text-3xl text-white text-left">Discover {genreTitle}</h2>
                <select
                    onChange={(e) => dispatch(selectGenreListId(e.target.value))}
                    value={genreListId || 'pop'}
                    className="bg-black text-gray-300 p-3 text-sm 
                    rounded-lg outline-none sm:mt-0 mt-5"
                >
                    {genres.map((genre) => <option key={genre.value} 
                    value={genre.value}>{genre.title}</option>)}
                </select>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
                {data?.map((song, i)=> (
                    <SongCard 
                        key={song.key}
                        song={song}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data={data}
                        i={i}
                    />
                ))}
            </div>
        </div>
    )
}

export default Discover;
