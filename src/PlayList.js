import './PlayList.css';
import { useEffect } from 'react';

function PlayList(props){
    function addElementToTrackList(){
        props.setTrack();
    }
    useEffect(()=>{

    },[props.names])

    return (props.names.map(x => (
                    <div className='song song-1' id="1">
                        <h2 className='song-name'>{x}</h2>
                        <div className='artist-name'>UZI</div>
                        <img  />
                        <button className='add-button' onClick={addElementToTrackList}>Add</button>
                    </div>
                ))
                
                
            
    )
}
export default PlayList;