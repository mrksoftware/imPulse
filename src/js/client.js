import React from 'react';
import ReactDOM from 'react-dom';

class Layout extends React.Component {
    render(){
        console.log('hello');
        return (
            <h1>imPulse</h1>
        );
    }
}

const app = document.getElementById('app');

ReactDOM.render(<Layout />, app);