import { redirect } from "express/lib/response";
import queryString from "query-string";
// remember to set environment variables 
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

var scope = "playlist-read-private playlist-modify-private playlist-modify-public";

Bun.serve({
    fetch(req) {
        const url = new URL(req.url);
        if (url.pathname == "/login") {
            var state = Math.random().toString(36).substring(2,18);
            return new Response('https://accounts.spotify.com/authorize?' + queryString.stringify({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: scope,
            redirect_uri: REDIRECT_URI,
            state: state
            }));
        };
        if (url.pathname == "/callback") {
            var state = req.query.state || null;
            var code = req.query.code || null;
            if (state == null) {
                console.log("ATTEMPTED LOGIN FAILED!!! (state mismatch err)");
                return Response.redirect("https://ctrleo.github.io/taylorizer/#?err=state-mismatch")
            } else {
                var authOptions = {
                    url: 'https://accounts.spotify.com/api/token',
                    form: {
                        code: code,
                        redirect_uri: REDIRECT_URI,
                        grant_type: 'authorization_code'
                    },
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Basic ' + (new ArrayBuffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
                    },
                    json: true
                };
            };
        };
    },
});