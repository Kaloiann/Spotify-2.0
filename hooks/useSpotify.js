import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import spotifyApi from "../library/spotify"

function useSpotify() {
   
   const { data: session, status } = useSession()

   
   useEffect(() => {
    if(session){
        if(session.error === 'RefreshAccessTokenError'){
            signIn()
        }
        console.log(session)
        spotifyApi.setAccessToken(session.user.accessToken)
    }
   },[session, spotifyApi])

   
   return spotifyApi;
}

export default useSpotify
