import { useRecoilState, useRecoilValue } from "recoil"
import useSpotify from "../hooks/useSpotify"
import { millisToMinutesAndSeconds } from "../library/time"
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom"

function Song( {order, track} ) {
    const spotifyApi = useSpotify()
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [ isPlaying, setIsPlaying ] = useRecoilState(isPlayingState)
    const playSong = async => {
        setCurrentTrackId(track.track.id)
        setIsPlaying(true)
        spotifyApi.play({
            uris: [track.track.url]
        })
    }

    return (
        <div className="grid grid-cols-2 text-[#18D860] py-4 px-5 rounded-lg cursor-pointer" onClick={playSong}>
            <div className="flex items-center space-x-4">
                <p>{order + 1}</p>
                <img className="h-10 w-10" src={track.track.album.images[0]?.url} alt="" />
                <div>
                    <p className="w-36 lg:w-64 truncate text-white">{track.track.name}</p>
                    <p>{track.track.artists[0].name}</p>
                </div>
            </div>
            <div className="flex items-center justify-between ml-auto md:ml-0">
                <p className="hidden md:inline text-white">{track.track.album.name}</p>
                <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
            </div>
        </div>
    )
}

export default Song
