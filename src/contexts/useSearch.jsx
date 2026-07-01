import { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");

    return <>
        <SearchContext value={{ searchQuery, setSearchQuery }}>
            {children}
        </SearchContext>
    </>;

};

function useSearch() {
    return useContext(SearchContext);
};


export {
    SearchProvider,
    SearchContext,
    useSearch
};
