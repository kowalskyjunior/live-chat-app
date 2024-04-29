import { useRef, useState } from "react";
import io from 'socket.io-client'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Join.css'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

export default function Join({ setChatVisibility, setSocket }) {
    const usernameRef = useRef();
    const [error, setError] = useState(false);

    const handleSubmit = async () => {
        const username = usernameRef.current.value.trim();
        if (username === '') {
            setError(true);
        } else {
            setError(false);
            const socket = await io.connect('http://localhost:5000');
            socket.emit('setUsername', username);
            setSocket(socket);
            setChatVisibility(true);
        }
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            handleSubmit()
        }
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="70vh"
            className="body-box"
        >
            <Card className="card">
                <h1 style={{ marginBottom: '2rem', color: '#262F40' }}>Live Chat</h1>
                <TextField
                    error={error}
                    helperText={error ? "Este campo não pode ser vazio" : ''}
                    inputRef={usernameRef}
                    id="standard-basic"
                    label='Nome de usuário'
                    onKeyDown={handleEnter}
                />

                <Button
                    style={{ marginLeft: '1rem', height: '56px', backgroundColor: "#262F40" }}
                    variant="contained"
                    onClick={handleSubmit}
                    className="btn-join"
                >
                    Entrar
                </Button>
            </Card>
        </Box>
    );
}
