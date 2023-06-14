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
const [access_token, setAccess_token]=useState('');
const [value, setValue]=useState('');
const [albums, setAlbums]=useState([])


useEffect(()=>{
  async function post(){
    const jsonData=await fetch("https://accounts.spotify.com/api/token",{
      method:"POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + 'YjRjMmExNGZiODczNGZmZjg2ZTgxYzAxZmYwNGFiNDA6YTNlMmI1NWQ0Nzg1NGYwNTgyZThjNzY3YjJiZjA0ZTE='
      },
      body:'grant_type=client_credentials'
    
    })
    const data=await jsonData.json();
    setAccess_token(data.access_token);
    
  };
  post();
  
}, [])






  const handleClick=(e)=>{
    e.preventDefault();
    let artistId;
    async function getSearchRequest(){
      const jsonData = await fetch('https://api.spotify.com/v1/search?q='+ value +'&type=artist' , {
        headers:{Authorization: `Bearer ${access_token}`}
      })
      const data=await jsonData.json();
      artistId=data.artists.items[0].id
      const response=await fetch('https://api.spotify.com/v1/artists/'+ artistId +'/albums' ,{
        headers:{Authorization: `Bearer ${access_token}`}
      })
      const newData= await response.json();
      setAlbums([...albums, newData.items])
    }
   
    getSearchRequest();
    console.log(albums);
  }
  return (
    <div className="App">
      <div className='search-container'>
        <form>
          <input onChange={e=>setValue(e.target.value)} />
          <button onClick={(e)=>handleClick(e)} type='submit' >Search</button>
        </form>
      </div>
      <div className='list-container'>
        <div className='default-list'>
          <div className='card'>
            <h2>test1</h2>
            <p>test1</p>
            <img/>
          </div>
        </div>
        <div className='my-list'>
        <div className='card'>
            <h2>test1</h2>
            <p>test1</p>
            <img/>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
