

let allSongs = [
    {
        id: 1,
        name: `Afghan Jalebi`,
        artist: `Asrar`,
        img: "Assets/maxresdefault (6).jpg",
        genre: 'rock',
        source: "Assets/Afghan_Jalebi_Ya_Baba.mp3"
    },
    {
        id: 2,
        name: `Sadda Haq`,
        artist: `Mohit Chauhan`,
        img: "Assets/maxresdefault (8).jpg",
        genre: 'rock',
        source: "Assets/Sadda_Haq.mp3"
    },
    {
        id: 3,
        name: `The Breakup Song`,
        artist: `Arijit Singh`,
        img: "Assets/maxresdefault (7).jpg",
        genre: 'rock',
        source: "Assets/The_Breakup_Song.mp3"
    },
    {
        id: 4,
        name: `Mirchi`,
        artist: `DIVINE`,
        img: "Assets/maxresdefault (5).jpg",
        genre: 'Hip-Hop',
        source: "Assets/DIVINE_MIRCHI.mp3"
    },
    {
        id: 5,
        name: `Sher Aaya Sher`,
        artist: `DIVINE`,
        img: "Assets/maxresdefault (3).jpg",
        genre: 'Hip-Hop',
        source: "Assets/Sher_Aaya_Sher_Gully_Boy.mp3"
    },
    {
        id: 6,
        name: `Apna Time Aayega`,
        artist: `DIVINE`,
        img: "Assets/maxresdefault (4).jpg",
        genre: 'Hip-Hop',
        source: "Assets/Apna_Time_Aayega_Gully_Boy.mp3"
    },
    {
        id: 7,
        name: `Gulabi Aankhen`,
        artist: `SANAM`,
        img: "Assets/maxresdefault (2).jpg",
        genre: 'pop',
        source: "Assets/Gulabi_Aankhen.mp3"
    },
    {
        id: 8,
        name: `Saregama Carvaan Medley`,
        artist: `Shashwat Singh`,
        img: "Assets/maxresdefault (1).jpg",
        genre: 'pop',
        source: "Assets/Saregama_Carvaan_Medley.mp3"
    },
    {
        id: 9,
        name: `Dil Toh Bachcha Hai Ji`,
        artist: `Rahat Fateh Ali Khan`,
        img: "Assets/maxresdefault.jpg",
        genre: 'pop',
        source: "Assets/Dil_Toh_Bachcha_Hai_Ji.mp3"
    }
];


let selectGenre = document.getElementById('genre');
let mainList = document.getElementById('firstList');
let img = document.getElementById('image');
let artistName = document.getElementById('artistName');
let songName = document.getElementById('songName');
let songSrc = document.getElementById('songSrc');
let audioPlayer = document.getElementById('audioPlayer');
let forBtn = document.getElementById('forward');
let backBtn = document.getElementById('backword');
let currentSongIndex = null;
let currentPlaylist = allSongs;
let inputText = document.getElementById('inputText');
let CreatePlaylist = document.getElementById('CreatePlaylist');
let playlistNames = document.getElementById('playlist-names');
let playlistSongs = document.getElementById('playlist-songs');
let addToPlay = document.getElementById('addToPlay');
let colorBtn = document.getElementById('colorBtn');

let allPlayList = [];
let currentPlaylistName = null;
let currentPlaylistSongs = [];

let body = document.getElementById('body');
let checkbox = document.getElementById('checked');

let searchInput = document.getElementById('searchInput');
let searchResults = document.getElementById('searchResults');

// Initialize songs list
document.addEventListener('DOMContentLoaded', function () {
    allSongs.forEach(function (song) {
        let listItem = document.createElement('li');
        listItem.classList.add('play');
        listItem.classList.add('dmode');
        listItem.textContent = song.name;
        mainList.appendChild(listItem);
    });

    attachSongClickListeners();
});

// Theme button
colorBtn.addEventListener('click', function(){
    body.classList.toggle('dark-mode');
    let darkElement = document.querySelectorAll('.dmode')
    darkElement.forEach((element)=>{
        element.classList.toggle('dark-mode');
    });
});

// Attach click listeners to songs in main list
function attachSongClickListeners() {
    let curSong = document.querySelectorAll('.play');
    curSong.forEach((song) => {
        song.addEventListener('click', function () {
            allSongs.forEach((orgSong, index) => {
                if (song.textContent == orgSong.name) {
                    playSong(orgSong, index, allSongs);
                }
            });
        });
    });
}

// Play song
function playSong(song, index, playlist) {
    img.src = song.img;
    songName.textContent = song.name;
    artistName.textContent = song.artist;
    songSrc.src = song.source;
    audioPlayer.load();
    audioPlayer.play();
    currentSongIndex = index;
    currentPlaylist = playlist;
}

// Update current playlist songs
function updatePlaylistSongs(playlistName) {
    playlistSongs.innerHTML = "";
    currentPlaylistSongs = [];

    allPlayList.forEach((playObj) => {
        if (playlistName === playObj.name) {
            playObj.songs.forEach((song) => {
                let listItem = document.createElement('li');
                listItem.classList.add('newPlay');
                listItem.classList.add('dmode');
                if (checkbox.checked) {
                    listItem.classList.add('dark-mode');
                }
                listItem.textContent = song.name;

                // Create a remove button
                let removeBtn = document.createElement('button');
                removeBtn.textContent = 'Remove';
                removeBtn.classList.add('remove-btn');
                removeBtn.addEventListener('click', function (e) {
                    e.stopPropagation(); 
                    removeSongFromPlaylist(song.id, playlistName);
                });

                listItem.appendChild(removeBtn);
                playlistSongs.appendChild(listItem);
                currentPlaylistSongs.push(song);
            });
        }
    });

    attachPlaylistSongClickListeners();
}

// Remove a song from a playlist
function removeSongFromPlaylist(songId, playlistName) {
    allPlayList.forEach((playObj) => {
        if (playlistName === playObj.name) {
            playObj.songs = playObj.songs.filter(song => song.id !== songId);
        }
    });

    updatePlaylistSongs(playlistName);
}

// Attach click listeners to songs in playlist
function attachPlaylistSongClickListeners() {
    let curSong = document.querySelectorAll('.newPlay');
    curSong.forEach((song) => {
        song.addEventListener('click', function (event) {
            
            if (!event.target.classList.contains('remove-btn')) {
                currentPlaylistSongs.forEach((orgSong, index) => {
                    if (song.textContent.includes(orgSong.name)) {
                        playSong(orgSong, index, currentPlaylistSongs);
                    }
                });
            }
        });
    });
}

// Create a playlist
CreatePlaylist.addEventListener('click', function (event) {
    event.preventDefault();
    if (inputText.value != '') {
        let listItem = document.createElement('li');
        listItem.classList.add('dispList');
        listItem.classList.add('dmode');
        if (checkbox.checked) {
            listItem.classList.add('dark-mode');
        }
        listItem.textContent = inputText.value;
        playlistNames.appendChild(listItem);
        allPlayList.push({ name: inputText.value, songs: [] });
        inputText.value = '';

        let displayList = document.querySelectorAll('.dispList');
        displayList.forEach((list) => {
            list.removeEventListener('click', displayPlaylistSongs); 
            list.addEventListener('click', displayPlaylistSongs);
        });
    } else {
        alert('Please enter playlist name!');
    }
});

// Display songs in the selected playlist
function displayPlaylistSongs(event) {
    currentPlaylistName = event.target.textContent;
    document.querySelectorAll('.dispList').forEach(item => {
        item.classList.remove('active-playlist');
    });
    event.target.classList.add('active-playlist');

    updatePlaylistSongs(currentPlaylistName);
}

// Add the current song to the selected playlist
addToPlay.addEventListener('click', function () {
    if (allPlayList.length > 0) {
        if (currentPlaylistName !== null && currentSongIndex !== null) {
            allPlayList.forEach((playObj) => {
                if (currentPlaylistName === playObj.name) {
                    if (!playObj.songs.some(song => song.id === allSongs[currentSongIndex].id)) {
                        playObj.songs.push(allSongs[currentSongIndex]);
                        updatePlaylistSongs(currentPlaylistName); // Update playlist display
                    } else {
                        alert('Song already in playlist');
                    }
                }
            });
        } else {
            alert('Select a playlist and a song first');
        }
    } else {
        alert('Create a playlist first');
    }
});


// go to the previous song
backBtn.addEventListener('click', function () {
    if (currentPlaylist === currentPlaylistSongs && currentSongIndex > 0) {
        currentSongIndex--;
        let song = currentPlaylist[currentSongIndex];
        playSong(song, currentSongIndex, currentPlaylistSongs);
    } else if (currentPlaylist !== currentPlaylistSongs && currentSongIndex > 0) {
        currentSongIndex--;
        let song = currentPlaylist[currentSongIndex];
        playSong(song, currentSongIndex, allSongs);
    }
});

// go to the next song
forBtn.addEventListener('click', function () {
    if (currentPlaylist === currentPlaylistSongs && currentSongIndex < currentPlaylistSongs.length - 1) {
        currentSongIndex++;
        let song = currentPlaylist[currentSongIndex];
        playSong(song, currentSongIndex, currentPlaylistSongs);
    } else if (currentPlaylist !== currentPlaylistSongs && currentSongIndex < allSongs.length - 1) {
        currentSongIndex++;
        let song = currentPlaylist[currentSongIndex];
        playSong(song, currentSongIndex, allSongs);
    }
});

// Update song list based on selected genre


selectGenre.addEventListener('change', function () {
    let selectedOption = this.options[this.selectedIndex];
    mainList.textContent = '';

    let filteredSongs = selectedOption.value === 'All Songs' 
        ? allSongs 
        : allSongs.filter(song => song.genre.toLowerCase() === selectedOption.value.toLowerCase());

    filteredSongs.forEach(function (song) {
        let listItem = document.createElement('li');
        listItem.classList.add('play');
        listItem.classList.add('dmode');
        listItem.textContent = song.name;
        mainList.appendChild(listItem);
        if (checkbox.checked) {
            listItem.classList.add('dark-mode');
        }
    });

    attachSongClickListeners();
});

// Search functionality
searchInput.addEventListener('input', function () {
    let query = searchInput.value.toLowerCase();
    searchResults.innerHTML = '';

    let matchedSongs = allSongs.filter(song => song.name.toLowerCase().includes(query));
    let matchedPlaylists = allPlayList.filter(playlist => playlist.name.toLowerCase().includes(query));

    matchedSongs.forEach(song => {
        let listItem = document.createElement('li');
        listItem.textContent = song.name;
        listItem.classList.add('search-result');
        listItem.addEventListener('click', () => {
            playSong(song, allSongs.indexOf(song), allSongs);
            searchResults.innerHTML = ''; // Clear search results
            searchInput.value = ''; // Reset search input
        });
        searchResults.appendChild(listItem);
    });

    matchedPlaylists.forEach(playlist => {
        let listItem = document.createElement('li');
        listItem.textContent = `${playlist.name} (playlist)`;
        listItem.classList.add('search-result');
        listItem.addEventListener('click', () => {
            currentPlaylistName = playlist.name;
            updatePlaylistSongs(playlist.name);
            document.querySelectorAll('.dispList').forEach(item => {
                if (item.textContent === playlist.name) {
                    item.classList.add('active-playlist');
                } else {
                    item.classList.remove('active-playlist');
                }
            });
            searchResults.innerHTML = ''; // Clear search results
            searchInput.value = ''; // Reset search input
        });
        searchResults.appendChild(listItem);
    });
});



// let selectGenre = document.getElementById('genre');
// let mainList = document.getElementById('firstList');
// let img = document.getElementById('image');
// let artistName = document.getElementById('artistName');
// let songName = document.getElementById('songName');
// let songSrc = document.getElementById('songSrc');
// let audioPlayer = document.getElementById('audioPlayer');
// let forBtn = document.getElementById('forward');
// let backBtn = document.getElementById('backword');
// let currentSongIndex = null;
// let currentPlaylist = allSongs;
// let inputText = document.getElementById('inputText');
// let CreatePlaylist = document.getElementById('CreatePlaylist');
// let playlistNames = document.getElementById('playlist-names');
// let playlistSongs = document.getElementById('playlist-songs');
// let addToPlay = document.getElementById('addToPlay');
// let colorBtn = document.getElementById('colorBtn');

// let allPlayList = [];
// let currentPlaylistName = null;
// let currentPlaylistSongs = [];

// let body = document.getElementById('body');
// let checkbox = document.getElementById('checked');
// // Initialize songs list
// document.addEventListener('DOMContentLoaded', function () {
//     allSongs.forEach(function (song) {
//         let listItem = document.createElement('li');
//         listItem.classList.add('play');
//         listItem.classList.add('dmode');
//         listItem.textContent = song.name;
//         mainList.appendChild(listItem);
//     });

//     attachSongClickListeners();
// });

// // Theme button

// colorBtn.addEventListener('click', function(){
//     body.classList.toggle('dark-mode');
//     let darkElement = document.querySelectorAll('.dmode')
//     darkElement.forEach((element)=>{
//         element.classList.toggle('dark-mode')
//     })

// })

// // Attach click listeners to songs in main list
// function attachSongClickListeners() {
//     let curSong = document.querySelectorAll('.play');
//     curSong.forEach((song) => {
//         song.addEventListener('click', function () {
//             allSongs.forEach((orgSong, index) => {
//                 if (song.textContent == orgSong.name) {
//                     playSong(orgSong, index, allSongs);
//                 }
//             });
//         });
//     });
// }

// // Play song
// function playSong(song, index, playlist) {
//     img.src = song.img;
//     songName.textContent = song.name;
//     artistName.textContent = song.artist;
//     songSrc.src = song.source;
//     audioPlayer.load();
//     audioPlayer.play();
//     currentSongIndex = index;
//     currentPlaylist = playlist;
// }

// // Update current playlist songs
// function updatePlaylistSongs(playlistName) {
//     playlistSongs.innerHTML = "";
//     currentPlaylistSongs = [];

//     allPlayList.forEach((playObj) => {
//         if (playlistName === playObj.name) {
//             playObj.songs.forEach((song) => {
//                 let listItem = document.createElement('li');
//                 listItem.classList.add('newPlay');
//                 listItem.classList.add('dmode');
//                 if (checkbox.checked) {
//                     listItem.classList.add('dark-mode');
//                 }
//                 listItem.textContent = song.name;
//                 playlistSongs.appendChild(listItem);
//                 currentPlaylistSongs.push(song);
//             });
//         }
//     });

//     attachPlaylistSongClickListeners();
// }

// // Attach click listeners to songs in playlist
// function attachPlaylistSongClickListeners() {
//     let curSong = document.querySelectorAll('.newPlay');
//     curSong.forEach((song) => {
//         song.addEventListener('click', function () {
//             currentPlaylistSongs.forEach((orgSong, index) => {
//                 if (song.textContent == orgSong.name) {
//                     playSong(orgSong, index, currentPlaylistSongs);
//                 }
//             });
//         });
//     });
// }

// // Create a playlist
// CreatePlaylist.addEventListener('click', function (event) {
//     event.preventDefault();
//     if (inputText.value != '') {
//         let listItem = document.createElement('li');
//         listItem.classList.add('dispList');
//         listItem.classList.add('dmode');
//         if (checkbox.checked) {
//             listItem.classList.add('dark-mode');
//         }
//         listItem.textContent = inputText.value;
//         playlistNames.appendChild(listItem);
//         allPlayList.push({ name: inputText.value, songs: [] });
//         inputText.value = '';

//         let displayList = document.querySelectorAll('.dispList');
//         displayList.forEach((list) => {
//             list.removeEventListener('click', displayPlaylistSongs); // Ensure no duplicate event listeners
//             list.addEventListener('click', displayPlaylistSongs);
//         });
//     } else {
//         alert('Please enter playlist name!');
//     }
// });

// // Display songs in the selected playlist
// function displayPlaylistSongs(event) {
//     currentPlaylistName = event.target.textContent;

//     // Remove the active class from all playlist items
//     document.querySelectorAll('.dispList').forEach(item => {
//         item.classList.remove('active-playlist');
//     });

//     // Add the active class to the clicked playlist item
//     event.target.classList.add('active-playlist');

//     updatePlaylistSongs(currentPlaylistName);
// }

// // Add the current song to the selected playlist
// addToPlay.addEventListener('click', function () {
//     if (allPlayList.length > 0) {
//         if (currentPlaylistName !== null && currentSongIndex !== null) {
//             allPlayList.forEach((playObj) => {
//                 if (currentPlaylistName === playObj.name) {
//                     if (!playObj.songs.some(song => song.id === allSongs[currentSongIndex].id)) {
//                         playObj.songs.push(allSongs[currentSongIndex]);
//                         updatePlaylistSongs(currentPlaylistName); // Update playlist display
//                     } else {
//                         alert('Song already in playlist');
//                     }
//                 }
//             });
//         } else {
//             alert('Select a playlist and a song first');
//         }
//     } else {
//         alert('Create a playlist first');
//     }
// });

// // Navigate to the previous song
// backBtn.addEventListener('click', function () {
//     if (currentPlaylist === currentPlaylistSongs && currentSongIndex > 0) {
//         currentSongIndex--;
//         let song = currentPlaylist[currentSongIndex];
//         playSong(song, currentSongIndex, currentPlaylistSongs);
//     } else if (currentPlaylist !== currentPlaylistSongs && currentSongIndex > 0) {
//         currentSongIndex--;
//         let song = currentPlaylist[currentSongIndex];
//         playSong(song, currentSongIndex, allSongs);
//     }
// });

// // Navigate to the next song
// forBtn.addEventListener('click', function () {
//     if (currentPlaylist === currentPlaylistSongs && currentSongIndex < currentPlaylistSongs.length - 1) {
//         currentSongIndex++;
//         let song = currentPlaylist[currentSongIndex];
//         playSong(song, currentSongIndex, currentPlaylistSongs);
//     } else if (currentPlaylist !== currentPlaylistSongs && currentSongIndex < allSongs.length - 1) {
//         currentSongIndex++;
//         let song = currentPlaylist[currentSongIndex];
//         playSong(song, currentSongIndex, allSongs);
//     }
// });

// // Update song list based on selected genre


// selectGenre.addEventListener('change', function () {
//     let selectedOption = this.options[this.selectedIndex];
//     mainList.textContent = '';

//     let filteredSongs = selectedOption.value === 'All Songs' 
//         ? allSongs 
//         : allSongs.filter(song => song.genre.toLowerCase() === selectedOption.value.toLowerCase());

//     filteredSongs.forEach(function (song) {
//         let listItem = document.createElement('li');
//         listItem.classList.add('play');
//         listItem.classList.add('dmode');
//         listItem.textContent = song.name;
//         mainList.appendChild(listItem);
//         if (checkbox.checked) {
//             listItem.classList.add('dark-mode');
//         }
//     });

//     attachSongClickListeners();
// });

// // selectGenre.addEventListener('change', function () {
// //     let selectedOption = this.options[this.selectedIndex];
// //     mainList.textContent = '';
// //     if (selectedOption.value == 'All Songs') {
// //         allSongs.forEach(function (song) {
// //             let listItem = document.createElement('li');
// //             listItem.classList.add('play');
// //             listItem.classList.add('dmode');
// //             listItem.textContent = song.name;
// //             mainList.appendChild(listItem);
// //             if (checkbox.checked) {
// //                 listItem.classList.add('dark-mode');
// //             }
// //         });
// //     } else {
// //         allSongs.forEach(function (song) {
// //             if (song.genre.toLowerCase() === selectedOption.value.toLowerCase()) {
// //                 let listItem = document.createElement('li');
// //                 listItem.classList.add('play');
// //                 listItem.classList.add('dmode');
// //                 listItem.textContent = song.name;
// //                 mainList.appendChild(listItem);
// //                 if (checkbox.checked) {
// //                     listItem.classList.add('dark-mode');
// //                 }
// //             }
// //         });
// //     }

// //     attachSongClickListeners();
// // });