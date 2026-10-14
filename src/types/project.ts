import type { ImageMetadata } from 'astro';

export interface Project {
    title: string;
    description: string;
    techStack: string[];
    imageUrl: ImageMetadata;
    /** Demo en vivo. Si falta, la tarjeta solo enlaza al repositorio. */
    projectUrl?: string;
    githubUrl: string;
}
