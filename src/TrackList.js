import './TrackList.css';

function TrackList(props){

    return(
        <div className='tracklist-container'>
            <div className='tracklist-body'>
                {props.isTrue && <div className='song song-1'>
                    <h2 className='song-name'>İmdat İmdat</h2>
                    <div className='artist-name'>UZI</div>
                    
                </div>}
            </div>
            <button className='tracklist-button'>Save To My List</button>
        </div>
    )
}
export default TrackList;