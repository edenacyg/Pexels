import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'react-bootstrap';

function SearchBar(props) {
    console.log(props);
    const [search, setSearch] = useState('');

    const handleSearchBtn = (e) => {
        e.preventDefault(); 
        console.log(`Searching...`);      
        props.fetchImages(search);            
    }

    return (
        <>
            <div className='searchbar_section'>
                <h1>The best free stock photos, royalty free images&nbsp;&&nbsp;videos shared by creators.</h1>
                <div className='search_bar'>
                    <input className='input' type="search" onChange={(e) => setSearch(e.target.value)} placeholder='Search for free photos' />
                    <Button variant='btn btn-dark btn-lg' type='submit' onClick={handleSearchBtn}><SearchOutlined onClick={handleSearchBtn}/></Button>
                </div>               
            </div>
        </>   
    )
}

export default SearchBar;
