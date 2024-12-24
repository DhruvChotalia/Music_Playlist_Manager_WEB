// import express into this file
const express = require('express');


// initialize an instance of express
const app = express();


// define the port that the web server should run on
const port = 3000;

app.set("view engine", "ejs")

// Create a route

let PLAYLIST = [];



 const MUSIC = [
    {
        title: 'Shape of You',
        artist: 'Ed Sheeran',
        artistImage: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2014/12/05/18/Ed-Sheeran.jpg'
    },
    {
        title: 'Believer',
        artist: 'Imagine Dragons',
        artistImage: 'https://gnpsvillager.org/wp-content/uploads/2022/04/imagine-dragons.jpeg'
    },
    {
        title: 'Someone Like You',
        artist: 'Adele',
        artistImage: 'https://media.npr.org/assets/img/2015/11/24/ajeup0ayctw4ztltklrnuvtm-y4xulezgneawbqw4cs_custom-7aa29347d5da230c6101168c71549a7399302d0c-s1100-c50.jpg'
    },
    {
        title: 'Cruel Summer',
        artist: 'Taylor Swift',
        artistImage: 'https://media1.popsugar-assets.com/files/thumbor/0ebv7kCHr0T-_O3RfQuBoYmUg1k/475x60:1974x1559/fit-in/500x500/filters:format_auto-!!-:strip_icc-!!-/2019/09/09/023/n/1922398/9f849ffa5d76e13d154137.01128738_/i/Taylor-Swift.jpg'
    },
    {
        title: 'Husn',
        artist: 'Anuv Jain',
        artistImage: 'https://focus.hidubai.com/content/images/size/w1000/2024/01/anuv-jain.jpg'
    },
    {
        title: 'Lover',
        artist: 'Taylor Swift',
        artistImage: 'https://media1.popsugar-assets.com/files/thumbor/0ebv7kCHr0T-_O3RfQuBoYmUg1k/475x60:1974x1559/fit-in/500x500/filters:format_auto-!!-:strip_icc-!!-/2019/09/09/023/n/1922398/9f849ffa5d76e13d154137.01128738_/i/Taylor-Swift.jpg'
    }
];



app.get("/", (req, res) => {
    return res.render("index.ejs", { songs: MUSIC })
  })
    
app.get('/find/:NameofArtist', (req, res) => {
    // Extract artist name from the URL parameter
    const artistName = req.params.NameofArtist;
    const newArtistSongs = [];
    // Filter songs by the provided artist name
    for (const song of MUSIC) {
        // Check if the artist of the current song matches the provided artistName
        if (song.artist === artistName) {
            // If it matches, add the song to the artistSongs array
            newArtistSongs.push(song);
        }
    }

    // Render the 'find' EJS template with the artist name and search results
    res.render("find.ejs", { artistName, newArtistSongs })
})

app.get("/playlist", (req, res) => {
    res.render("playlist.ejs", { playlist: PLAYLIST })
  })
  


  app.get("/add/:position", (req, res) => {
    const position = parseInt(req.params.position);
    if (position >= 0 && position < MUSIC.length) {
      const songToAdd = MUSIC[position];
      PLAYLIST.push(songToAdd);
      return res.send("Song added to playlist successfully.")
    } else {
      return res.send("Invalid position provided.")
    }
  })
  

// Start the server
app.listen(port, () => {
   console.log(`Server is running on port ${port}`)
})
