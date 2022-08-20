import React from 'react';
import { io } from 'socket.io-client';
import { render } from "../helpers";
import Table from "./components/Table";

const App = () => {
    React.useEffect(() => {
        const socket = io('http://localhost:1945');

        socket.on('data', function (data) {
            render(data, document.getElementById("table-content"));
        });

        socket.on('all-data', function (datas) {
            datas.forEach((data) => {
                render(data, document.getElementById("table-content"));
            });
        });

        socket.emit('all-data');
    },[]);

    return <Table />;
}

export default App;