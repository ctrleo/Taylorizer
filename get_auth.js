import queryString from "query-string";
// remember to set environment variables 
var CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
var REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
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
        if (url.pathname == "/callback") {
            var code = req.query.code || null;
            var state = req.query.state || null;
            if (state === null) {
                console.log("Attempted spotify login failed! :( (state mismatch occurred)");
                res.redirect("https://ctrleo.github.com/taylorizer/#?error="state");
            }
            };
        };
    };
});