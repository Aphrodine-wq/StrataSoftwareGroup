import React, { useState, useEffect } from 'react';
import './Preloader.css';

function Preloader() {
    const [loaded, setLoaded] = useState(false);
    const [removed, setRemoved] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 1500);
        const removeTimer = setTimeout(() => setRemoved(true), 2200);
        return () => {
            clearTimeout(timer);
            clearTimeout(removeTimer);
        };
    }, []);

    if (removed) return null;

    return (
        <div className={`preloader ${loaded ? 'preloader--done' : ''}`}>
            <div className="preloader-content">
                <div className="preloader-logo-ring" aria-hidden="true" />
                <img
                    src={`${process.env.PUBLIC_URL}/logo.png`}
                    alt=""
                    className="preloader-logo"
                />
                <div className="preloader-bar">
                    <div className="preloader-bar-fill" />
                </div>
            </div>
        </div>
    );
}

export default Preloader;
