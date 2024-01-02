import axios from "axios";
import queryString from "query-string";
// remember to set environment variables 
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

var scope = "playlist-read-private playlist-modify-private playlist-modify-public";

Bun.serve({
    async fetch(req) {
        const url = new URL(req.url);
        const params = new URLSearchParams(url.search);
        if (url.pathname == "/login") {
            console.log("Spotify login requested")
            var state = Math.random().toString(36).substring(2,18);
            return Response.redirect('https://accounts.spotify.com/authorize?' + queryString.stringify({
                response_type: 'code',
                client_id: CLIENT_ID,
                redirect_uri: REDIRECT_URI,
                scope: scope,
                show_dialog: true
            }));
        };
        if (url.pathname == "/callback") {
            console.log("Callback from Spotify API!!!")
            var code = params.get("code");
            var token = await axios({
                method: 'post',
                url: 'https://accounts.spotify.com/api/token',
                data: {
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: REDIRECT_URI
                },
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    Authorization: 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
                }
            });
            return new Response(token.data.access_token, {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            });
        };
    }
});
