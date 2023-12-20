import spotipy
from spotipy.oauth2 import SpotifyOAuth

if SPOTIPY_CLIENT_ID and SPOTIPY_CLIENT_SECRET and SPOTIPY_REDIRECT_URI == False:
    print("Please set env variables SPOTIPY_CLIENT_ID, SPOTIPY_CLIENT_SECRET and SPOTIPY_REDIRECT_URI")
