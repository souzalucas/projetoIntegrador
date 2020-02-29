import React from 'react';
import MainLayout from '../layouts';
import './home.css'
import img from '../home.jpg'

function Home() {
    return (
        <MainLayout class="container">
            <img src={img}/>
        </MainLayout>
    );
}

export default Home;  