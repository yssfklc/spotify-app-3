import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './SearchBar.js'
import PlayList from './PlayList.js'
import TrackList from './TrackList.js'


function App() {
  
  // post();
var client_id = '';
var client_secret = '';
const [access_token, setAccess_token]=useState('');
const [value, setValue]=useState('');
const [albums, setAlbums]=useState([])
const [myList, setMyList]=useState([])


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
      setAlbums([...albums, newData.items]);
      console.log(albums);
    }
   
    getSearchRequest();
  }
  const AddList=(e)=>{
    
    e.preventDefault();
    console.log(e.target.value)
    albums[0].map((album)=>{
      if(album.id==e.target.value){
        console.log('lale')
       setMyList([...myList, album])
       console.log(myList)
      }
    })

  }
  const RemoveList=(e)=>{
    e.preventDefault();

    setMyList(myList.filter((item)=>item.id!==e.target.value))

  }
  const submitList=(e)=>{
    e.preventDefault();

  }

  return (
    <div className="App">
      <div className='search-container'>
        <form>
          <input onChange={e=>setValue(e.target.value)} />
          <button onClick={(e)=>handleClick(e)} type='submit' >Search</button>
        </form>
      </div>
      {albums.length==[]?null:(<h2>Albums</h2>)}
      <div className='list-container'>
        <div className='default-list'>
          {albums.length==[]?'Loading':albums[0].map((album)=>{
           return (<div className='card' >
              <h2>{album.name}</h2>
              <p>{album.type}</p>
              <img src={album.images[1].url}/>
              <button type='submit' value={album.id} onClick={(e)=>AddList(e)} >Add to My List</button>
            </div>)
          })}
          
        </div>
        <div className='my-list-container'>
          <h2>My List</h2>
          <div className='my-list'>
          { myList.map((item)=>{
           return (<div className='card' >
              <h2>{item.name}</h2>
              <p>{item.type}</p>
              <img src={item.images[1].url}/>
              <button type='submit' value={item.id} onClick={(e)=>RemoveList(e)} >Remove From My List</button>
            </div>)
          })}
          </div>
       
          <button type='submit' onClick={(e)=>submitList(e)} >Save My List</button>
        </div>
      </div>
      
    </div>
  );
}

export default App;
