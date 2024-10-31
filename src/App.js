import React from 'react';
import Card from './Components/Card';

const App = () => {
    return (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Card
                title="Beautiful Sunset"
                content="A lovely view of the sunset over the mountains."
                image="https://via.placeholder.com/300x180"
                footer="Read More"
            />
            <Card
                title="Delicious Food"
                content="A delicious plate of food with various ingredients."
                image="https://via.placeholder.com/300x180"
                footer="See Recipe"
            />
            <Card
                title="Mountain Adventure"
                content="Experience an amazing mountain adventure with us."
                footer="Join Now"
            />
        </div>
    );
};

export default App;
