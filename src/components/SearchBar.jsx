import { useState } from "react";
import {API_URL} from "../utils/utils.js"

function SearchBar({ onResults, onResetSearch }) {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [hasSearched, setHasSearched] = useState(false);
    const [resultsCount, setResultsCount] = useState(0);

    async function handleSubmit(event) {
        event.preventDefault();

        const trimmedQuery = query.trim();

        if (!trimmedQuery) {
            setHasSearched(false);
            setResultsCount(0);
            setError("");
            onResetSearch();
            return;
        }

        try {
            setLoading(true);
            setError("");
            setHasSearched(true);

            const response = await fetch(
                `${API_URL}/products?search=${encodeURIComponent(trimmedQuery)}`
            );

            const data = await response.json();

            if (response.status === 404) {
                setResultsCount(0);
                onResults([]);
                return;
            }

            if (!response.ok) {
                throw new Error(data.error || "Errore nella chiamata al server");
            }

            const results = data.results || [];

            setResultsCount(results.length);
            onResults(results);
        } catch (err) {
            setError(err.message || "Errore durante la ricerca");
            setResultsCount(0);
            onResults([]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="search-wrapper">
            <form onSubmit={handleSubmit}>
                <label htmlFor="search" className="form-label mb-1">
                    Cerca
                </label>

                <input
                    id="search"
                    type="text"
                    className="form-control"
                    placeholder="Find product..."
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
            </form>

            {loading && <p className="mt-2 mb-0">Caricamento...</p>}

            {error && <p className="mt-2 mb-0 text-danger">{error}</p>}

            {!loading && hasSearched && !error && resultsCount === 0 && (
                <p className="mt-2 mb-0">Nessun prodotto trovato</p>
            )}
        </div>
    );
}

export default SearchBar;