/// <reference types="astro/client" />

declare module 'virtual:particle-data' {
    const data: {
        refSize: number;
        particles: Array<{
            x: number;
            y: number;
            r: number;
            g: number;
            b: number;
            brightness: number;
            lineLength: number;
        }>;
    };
    export default data;
}
