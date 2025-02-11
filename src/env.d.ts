/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
    readonly PUBLIC_PRINTIFY_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
