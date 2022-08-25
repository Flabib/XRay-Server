import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Table from "./components/Table";

const App = () => {
    const [ rows, setRows ] = useState([]);

    useEffect(() => {
        const socket = io('http://localhost:1945');

        socket.on('data', (data) => {
            setRows((rows) => [data, ...rows]);
        });

        socket.on('all-data', (allData) => {
            setRows(allData);
        });

        socket.emit('all-data');
    },[]);

    return <Table rows={rows} />;
}

export default App;