// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @returns {import('vite').Plugin} */
function particleDataPlugin() {
    const VIRTUAL_ID  = 'virtual:particle-data';
    const RESOLVED_ID = '\0' + VIRTUAL_ID;

    return {
        name: 'vite-plugin-particle-data',
        resolveId(/** @type {string} */ id) {
            if (id === VIRTUAL_ID) return RESOLVED_ID;
        },
        async load(/** @type {string} */ id) {
            if (id !== RESOLVED_ID) return;

            const { default: sharp } = await import('sharp');
            const imgPath = path.resolve(__dirname, 'src/assets/images/me.png');

            const REF     = 450;
            const MAX_IMG = Math.round(REF * 0.8); // 360

            const meta = await sharp(imgPath).metadata();
            if (!meta.width || !meta.height) {
                throw new Error('[particle-data] Cannot read dimensions of me.png');
            }

            const aspect = meta.width / meta.height;
            const drawW  = aspect >= 1 ? MAX_IMG : Math.round(MAX_IMG * aspect);
            const drawH  = aspect >= 1 ? Math.round(MAX_IMG / aspect) : MAX_IMG;
            const offX   = Math.floor((REF - drawW) / 2);
            const offY   = Math.floor((REF - drawH) / 2);

            const { data } = await sharp(imgPath)
                .resize(drawW, drawH, { fit: 'fill' })
                .ensureAlpha()
                .extend({
                    top:    Math.max(0, offY),
                    bottom: Math.max(0, REF - drawH - offY),
                    left:   Math.max(0, offX),
                    right:  Math.max(0, REF - drawW - offX),
                    background: { r: 0, g: 0, b: 0, alpha: 0 },
                })
                .raw()
                .toBuffer({ resolveWithObject: true });

            const ALPHA_THRESH = 128;
            const TRANSP_STEP  = 4;
            const LL_MIN       = 3;
            const LL_MAX       = 15;
            const LL_GAP       = 3;
            const ROW_GAP      = 6;

            /** @type {{ x:number, y:number, r:number, g:number, b:number, brightness:number, lineLength:number }[]} */
            const particles = [];

            for (let y = 0; y < REF; y += ROW_GAP) {
                let x = 0;
                while (x < REF) {
                    const px  = Math.min(Math.floor(x), REF - 1);
                    const idx = (y * REF + px) * 4;
                    const r   = data[idx];
                    const g   = data[idx + 1];
                    const b   = data[idx + 2];
                    const a   = data[idx + 3];

                    if (a > ALPHA_THRESH) {
                        const brightness = Math.round((r + g + b) / 3);
                        const lineLength = Math.floor(LL_MIN + (brightness / 255) * LL_MAX);
                        particles.push({ x: px, y, r, g, b, brightness, lineLength });
                        x += lineLength + LL_GAP;
                    } else {
                        x += TRANSP_STEP;
                    }
                }
            }

            return `export default ${JSON.stringify({ refSize: REF, particles })};`;
        },
    };
}

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss(), particleDataPlugin()],
    },
});
