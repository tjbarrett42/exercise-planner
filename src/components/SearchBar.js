import React, { useState, useEffect } from 'react';
import { Input } from '@mui/material';
// import './SearchBar.css';

const SearchBar = (props) => {
    /* States for updating term */
    const [ term, setTerm ] = useState('');

    /* Callback for updating term on input change */
    function onInputChange(e) {
        setTerm(e.target.value);
    }

    /* useEffect to update term to parent during term update*/
    useEffect(() => {
        props.onFormSubmitToSB(term);
    }, [term]);

    return (
        <div>
            <div>
                <Input
                    fullWidth
                    placeholder={props.placeholder}
                    type="text" value={term}
                    onChange={onInputChange}
                    className="search-bar"
                />
            </div>
        </div>
    );
}

export default SearchBar;

