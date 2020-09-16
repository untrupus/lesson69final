import React, {useReducer, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import axiosOrder from "../../axiosOrder";
import './Header.css';

const INPUT_TEXT = "INPUT_TEXT";
const FETCH_SHOWS = "FETCH_SHOWS";
const CLEAN_FIELD = "CLEAN_FIELD"

const initialState = {
    name: '',
    shows: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case INPUT_TEXT:
            return {
                ...state,
                name: action.value
            }
        case FETCH_SHOWS:
            return {
                ...state,
                shows: action.value
            }
        case CLEAN_FIELD:
            return {
                ...state,
                name: ''
            }
        default:
            return state
    }
};

const Header = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const inputTextHandler = (event) => {
        dispatch({type: INPUT_TEXT, value: event.target.value});
    };

    const cleanInputHandler = () => {
        dispatch({type: CLEAN_FIELD});
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await axiosOrder(state.name);
            dispatch({type: FETCH_SHOWS, value: response.data})
        };
        fetchData().catch(console.error);
    }, [state.name]);

    const shows = state.shows.map(show => {
        return (
            <div key={show.show.id}>
                <NavLink to={/shows/ + show.show.id}
                         className="link"
                         onClick={cleanInputHandler}
                >{show.show.name}</NavLink>
            </div>
        )
    });

    return (
        <>
            <div className="header">
                <div className="container">
                    <h3>TV Shows</h3>
                </div>
            </div>
            <div className="container search">
                <input type="text"
                       placeholder="Search for TV show"
                       value={state.name}
                       onChange={inputTextHandler}
                       className="field"
                />
                <div className="modal">
                    {shows}
                </div>
            </div>
        </>
    );
};

export default Header;