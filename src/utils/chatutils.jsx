import ReactMarkdown from 'react-markdown';

/**
 * Converte il testo Markdown ricevuto dall'agente in elementi HTML React sicuri.
 * Usa l'esportazione nominata (named export).
 * * @param {string} text - Il testo grezzo (con eventuale markdown) inviato da Hermes o dal Sistema
 * @returns {JSX.Element|null} - Il componente React pronto per essere renderizzato
 */
 const renderAgentResponse = (text) => {
    if (!text) return null;

    return (
        <ReactMarkdown>
            {text}
        </ReactMarkdown>
    );
};

export default renderAgentResponse;
