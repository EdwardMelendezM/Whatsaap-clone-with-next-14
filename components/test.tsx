"use client"
import {useEffect} from "react";
import TextChildrenComponent from "@/components/text-childre";

const TestComponent = () => {
    useEffect(() => {
        console.log("RENDERIZADO")
    }, []);
    return (
        <div>
            <h1>hola</h1>
            <TextChildrenComponent />
        </div>
    );
};

export default TestComponent;
