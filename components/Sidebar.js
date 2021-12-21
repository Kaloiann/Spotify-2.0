import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    HeartIcon,
    LogoutIcon,

} from "@heroicons/react/outline"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { playlistIdState } from "../atoms/playlistAtom"
import useSpotify from "../hooks/useSpotify"
import { spotifyApi } from "../library/spotify"

function Sidebar() {
    const spotifyApi = useSpotify()
    const { data: session, status } = useSession()
    const [playlists, setPlaylists] = useState([])
    const [playlistId, setPlaylistID] = useRecoilState(playlistIdState)

    console.log("You pick playlist >>>", setPlaylistID )
   
    
    useEffect(() => {
        if(spotifyApi?.getAccessToken()){
            spotifyApi.getUserPlaylists(session).then((data) => {
                setPlaylists(data.body.items)
            })
        }
    }, [session,spotifyApi])

    useEffect(() => {
        console.log(playlists)
    }, [playlists])
    
  
    return (
        <div className="text-[#18D860] p-5 text-sm border-r border-[#18D860]  overflow-y-scroll scrollbar-hide h-screen ">
           <div className="space-y-4">
            <button className="flex item-center space-x-2 hover:text-white" onClick={() => signOut({ callbackUrl: "/login" })}>
                <LogoutIcon className="h-5 w-5"/>
                <p>Log Out</p>
            </button>
            <button className="flex item-center space-x-2 hover:text-white">
                <HomeIcon className="h-5 w-5"/>
                <p>Home</p>
            </button>
            <button className="flex item-center space-x-2 hover:text-white">
                <SearchIcon className="h-5 w-5"/>
                    <p>Search</p>
            </button>
            <button className="flex item-center space-x-2 hover:text-white">
                <LibraryIcon className="h-5 w-5"/>
                <p>Library</p>
            </button>
            <button className="flex item-center space-x-2 hover:text-white">
                <PlusCircleIcon className="h-5 w-5"/>
                <p>Add Playlist</p>
            </button>
            <button className="flex item-center space-x-2 hover:text-white">
                <HeartIcon className="h-5 w-5"/>
                <p>Liked Songs</p>
            </button>
            <hr className="border-t-[0.1px] border-[#18D860]"/>

            {playlists.map((playlist) => (
                <p key={playlist.id} onClick={() => setPlaylistID(playlist.id)} className="cursor-pointer hover:text-white">
                    {playlist.name}
                </p>
            ))}

           
          </div>
        </div>
    )
}

export default Sidebar
