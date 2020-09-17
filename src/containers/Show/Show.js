import React, {useReducer, useEffect} from 'react';
import axios from "axios";
import parse from 'html-react-parser';
import './Show.css';

const FETCH_SHOW = "FETCH_SHOW";

const initialState = {
    show: {
        network: {name: '', country: {name: ''}},
        genres: [],
        runtime: '',
        image: {}
    }
};

const reducer = (state, action) => {
    switch (action.type) {
        case FETCH_SHOW:
            return {
                ...state,
                show: action.value
            }
        default:
            return state
    }
};

const Show = props => {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchData = async () => {
            const response =
                await axios("http://api.tvmaze.com/shows/" + props.match.params.id);
            dispatch({type: FETCH_SHOW, value: response.data});
        }
        fetchData().catch(console.error);
    }, [props.match.params.id]);

    const summary = parse("" + state.show.summary);

    let image;
    if (state.show.image === null) {
        image = require('../../no-img.png');
    } else {
        image = state.show.image.original;
    }

    return (
        <>
            <h3>{state.show.name}</h3>
            <div className="showInfo">
                <div className="showDescription inner">
                    <img src={image}
                         alt="showImage"
                         className="image"
                    />
                </div>
                <div className="showAbout inner">
                    <p><span>Type:</span> {state.show.type}</p>
                    <p><span>Network:</span> {state.show.network.name}</p>
                    <p><span>Country:</span> {state.show.network.country.name}</p>
                    <p><span>Language:</span> {state.show.language}</p>
                    <p><span>Status:</span> {state.show.status}</p>
                    <p><span>Runtime:</span> {state.show.runtime}</p>
                    <p><span>Genres:</span> {state.show.genres.join(' ')}</p>
                    {summary}
                </div>
            </div>
        </>
    );
};

export default Show;