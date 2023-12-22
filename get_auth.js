const express = require('express');
var app = express();
// remember to set environment variables 
var CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
var REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;