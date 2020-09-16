import React, {useReducer, useEffect} from 'react';
import axios from "axios";
import parse from 'html-react-parser';
import './Show.css';

const FETCH_SHOW = "FETCH_SHOW";

const initialState = {
    show: {}
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
    return (
        <div className="container">
            <h3>{state.show.name}</h3>
            {summary}
        </div>
    );
};

export default Show;