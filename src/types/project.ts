import type { ImageMetadata } from 'astro';

export interface Project {
    title: string;
    description: string;
    techStack: string[];
    imageUrl: ImageMetadata;
    projectUrl: string;
    githubUrl: string;
}
