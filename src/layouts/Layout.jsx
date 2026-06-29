import React from "react";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { Outlet } from "react-router";
import styles from "./Layout.module.css";
import ChatWidget from "../components/chat.jsx";

function Layout() {
    return <>
        <div className={styles.layout}>
            <Header />
            <main className={styles.main}>
                <Outlet />
            </main>
            <Footer />
        </div>
        <div className="chat-sticky-wrapper">
            <ChatWidget />
        </div>
    </>
        ;
}
export default Layout;

