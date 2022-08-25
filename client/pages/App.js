import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Table from "./components/Table";
import InlineDot from "./components/InlineDot";

const App = () => {
    const [ rows, setRows ] = useState([]);

    const [ filter, setFilter ] = useState([
        { color: 'green', isActive: false},
        { color: 'orange', isActive: false},
        { color: 'red', isActive: false},
        { color: 'purple', isActive: false},
        { color: 'blue', isActive: false},
        { color: 'gray', isActive: false},
    ]);

    const handleChangeFilter = ({ color, isActive}) => {
        setFilter((filter) => {
            const objIndex = filter.findIndex((obj => obj.color === color));

            filter[objIndex] = { color, isActive };

            return [...filter];
        });
    };

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

    return (
        <>
            <InlineDot filter={filter} handleChangeFilter={handleChangeFilter} />
            <Table rows={rows.filter((row) => {
                const objIndex = filter.findIndex((obj => obj.color === row.meta.color))
                const isAnyActive = filter.filter((value) => value.isActive).length > 0;

                if (objIndex === -1) return true;
                if (!isAnyActive) return true;

                return filter[objIndex].isActive;
            })} />
        </>
    );
};

export default App;