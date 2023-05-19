import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './SearchBar.js'
import PlayList from './PlayList.js'
import TrackList from './TrackList.js'


function App() {
  
  // post();
var client_id = 'b4c2a14fb8734fff86e81c01ff04ab40';
var client_secret = 'a3e2b55d47854f0582e8c767b2bf04e1';
var access_token='BQD60oFtOHgWJYAXZe7l-WGaBsK_RPjlfKnTpOBLpaiUV_7H3njcBtM-qGDyWSsxjg26CCVyLKYyEv3gN5WNqrof7KYUOUh_rK-bZDg7iJ_mObRUmSev';
const [isTrue, setIsTrue] = useState(false);
const [listfortrack, setTrack] = useState();
const n=[];
const i=[];



// async function post(){
//   const jsonData=await fetch("https://accounts.spotify.com/api/token",{
//     method:"POST",
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Authorization': 'Basic ' + 'YjRjMmExNGZiODczNGZmZjg2ZTgxYzAxZmYwNGFiNDA6YTNlMmI1NWQ0Nzg1NGYwNTgyZThjNzY3YjJiZjA0ZTE='
//     },
//     body:'grant_type=client_credentials'
      
    
  
//   })
//   const data=await jsonData.json();
  
//   return data.access_token;
  
// };

// console.log(post());


//get artist
// async function getArtist(){
//   const data=await fetch('https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb',{
//     headers: {'Authorization': 'Bearer ' + 'BQD60oFtOHgWJYAXZe7l-WGaBsK_RPjlfKnTpOBLpaiUV_7H3njcBtM-qGDyWSsxjg26CCVyLKYyEv3gN5WNqrof7KYUOUh_rK-bZDg7iJ_mObRUmSev'}
//   })

//   console.log(await data.json());
//   return (await data);
// }


  async function getSearch(){
    try {
      const q='remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis';
      const type='type=artist';
      const response = await fetch(('https://api.spotify.com/v1/search?q=' + q + '&' + type),{ 
      headers: {'Authorization': 'Bearer ' + 'BQAwT5IHKBFUHAkNzqhKJ6MT0w_Bx80gKIScjZEVpL8qVBDm9SQUqtaYWJIPYrywBeXHbMbdJTki3LYkMjEaxbMwbcoGaXUzgQpbvXzTAUzKdGWOR71p'}
      }
     
    )
    if(response.ok){
      const jsonData = await response.json();
      
      const id= jsonData.artists.items[0].id;
      for( const item of jsonData.artists.items){
        const secondResponse=await fetch(('https://api.spotify.com/v1/artists/' + item.id),{
      headers: {'Authorization': 'Bearer ' + 'BQAwT5IHKBFUHAkNzqhKJ6MT0w_Bx80gKIScjZEVpL8qVBDm9SQUqtaYWJIPYrywBeXHbMbdJTki3LYkMjEaxbMwbcoGaXUzgQpbvXzTAUzKdGWOR71p'}
    })
    if(secondResponse.ok){
      
      const secondJsonData = await secondResponse.json();
      n.push(secondJsonData.name);
      i.push(secondJsonData.images[0].url);
      

      
    }
      }
      
  
    
    }
    
    
    }catch(err){
      console.log(err)
    }
    
    
  };
  
  

  getSearch();
  console.log(n);
  console.log(i);
  return (
    <div className="App">
      <header className="App-header">

        <SearchBar  />
        <div className='App-body' >
          <div className='playlist-container'>
              <div className='playlist-body'>
                <PlayList isTrue={isTrue} setIsTrue={setIsTrue} names={n} img={i} setTrack={setTrack} />
              </div>
          </div>
          <TrackList isTrue={isTrue} setIsTrue={setIsTrue} listfortrack={listfortrack} />
      
        </div>
      </header>
      
    </div>
  );
}

export default App;
