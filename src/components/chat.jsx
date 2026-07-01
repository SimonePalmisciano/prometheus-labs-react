import { useState, useEffect, useRef } from 'react';
import agent from "../assets/agent.png";
import api from "../services/api.js";
import renderAgentResponse from '../utils/chatutils.jsx';
import "../styles/ChatWidget.css";

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [textInput, setTextInput] = useState('');
    const [convHistory, setConvHistory] = useState([]);
    const messagesEndRef = useRef(null);

    /* gestione scroll auto verso ultimo msg
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [convHistory]); */

    const submitHandler = async (event) => {
        event.preventDefault();

        if (textInput.trim() === '') {
            return;
        }

        const currentPrompt = textInput;// salvo msg

        setTextInput(''); // svuoto textarea

        setConvHistory((prevHistory) => [
            ...prevHistory,
            { sender: 'You', text: currentPrompt }
        ]);

        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 0);

        setIsLoading(true);

        // avvio chiamata a hermes

        try {
            const agentResponse = await api.sendMessageToHermes(currentPrompt);

            setConvHistory((prevHistory) => [
                ...prevHistory,
                { sender: 'Hermes', text: agentResponse }
            ]);

        } catch (error) {
            console.error('An error occoured while transmitting user message to Hermes:', error);

            // informo user che ci sono problemini 
            setConvHistory((prevHistory) => [
                ...prevHistory,
                { sender: 'System', text: 'Unable to get a response from Hermes. Please try again later.' }
            ]);

        } finally {

            setIsLoading(false);
        }

    };

    return (
        <>
            <button
                className="chatbtn position-fixed border-0 bg-transparent p-0"
                onClick={() => setIsOpen(!isOpen)}
            >
                <img className='imgchat mt-2' src={agent} alt="open chat" />
            </button>

            {isOpen && (
                <div
                    className="chat-window position-fixed bg-white rounded shadow d-flex flex-column"
                >
                    <div className="topbtchat bg-secondary text-dark p-3 fw-bold d-flex justify-content-between align-items-center">
                        <h3 className="mb-0">
                            Ask Hermes
                        </h3>
                        <button className='btn text-dark p-0' onClick={() => setIsOpen(!isOpen)}>
                            <i className="bi bi-x-circle-fill" style={{ fontSize: '1.8rem' }}></i>
                        </button>
                    </div>

                    <div className="flex-grow-1 p-3 overflow-auto chat-support">
                        {convHistory.map((msg, index) => {
                            // Capiamo se il messaggio è dell'utente attuale
                            const isYou = msg.sender === 'You';

                            return (
                                <div
                                    key={index}
                                    className={`d-flex flex-column mb-3 ${isYou ? 'align-items-end' : 'align-items-start'}`}
                                >
                                    <span className="small text-muted mb-1 fw-bold">
                                        {isYou ? 'You:' : 'Hermes:'}
                                    </span>
                                    <div
                                        className={`p-2 rounded max-width-75 ${isYou
                                            ? 'bg-secondary text-white rounded-start-3 rounded-bottom-3'
                                            : 'bg-light text-dark border rounded-end-3 rounded-bottom-3'
                                            }`}
                                        style={{ maxWidth: '75%' }} // Evita che la nuvoletta si allarghi al 100% dello schermo
                                    >
                                        {/* GESTIONE CONDIZIONALE DEL PARSING */}
                                        {isYou ? (
                                            // Se sei tu, stampa testo 
                                            msg.text
                                        ) : (
                                            // Se è Hermes o System, passa il testo all'utility che usa react-markdown
                                            renderAgentResponse(msg.text)
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                        {isLoading && (
                            <div className="d-flex flex-column mb-3 align-items-start">
                                <span className="small text-muted mb-1 fw-bold">Hermes:</span>
                                <div className="p-2 rounded bg-light text-dark border rounded-end-3 rounded-bottom-3" style={{ maxWidth: '75%' }}>
                                    <span className="spinner-border spinner-border-sm text-success me-2" role="status"></span>
                                    <span className="text-muted italic">Hermes is typing...</span>
                                </div>
                            </div>
                        )}
                        {/* div ancora per lo scroll auto verso ultimo msg */}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="topbtchat d-flex align-items-center gap-2 p-2 border-top bg-light"
                        onSubmit={submitHandler}>
                        <input
                            type="text"
                            className="form-control rounded-pill"
                            placeholder="Ask anything..."
                            value={textInput}
                            onChange={(event) => {
                                setTextInput(event.target.value)
                            }}
                            disabled={isLoading}
                        />
                        <button className="btn btn-success rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: '40px', height: '40px' }}
                            disabled={isLoading}>
                            <i className="bi bi-send-fill"></i>
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}