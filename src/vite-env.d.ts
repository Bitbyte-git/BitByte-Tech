/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COUNTER_API_URL?: string;
  readonly VITE_VISITOR_COUNTER_API?: string;
  readonly VITE_GROQ_API_URL?: string;
  readonly VITE_CHAT_API_URL?: string;
  readonly VITE_GROQ_MODEL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
