import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


type ImagePanProps = {
    src: string;
}

export function ImagePan({ src }: ImagePanProps) {
    return (
        <TransformWrapper>
            <TransformComponent>
                <img src={src} className="w-64 h-56" alt="test" />
            </TransformComponent>
        </TransformWrapper>
    );
};