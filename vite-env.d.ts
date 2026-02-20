/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_STORY_API_URL?: string;
    readonly VITE_STORY_GENERATION_MODE?: 'local' | 'hybrid' | 'remote';
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
