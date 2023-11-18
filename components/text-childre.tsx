"use client";

import {useEffect} from "react";

const TextChildrenComponent = () => {
    useEffect(() => {
        console.log("RENDERIZADO CHILDREN")
    }, []);
    return (
        <div>
            Text Children Component
        </div>
    );
};

export default TextChildrenComponent;
