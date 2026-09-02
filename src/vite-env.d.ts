/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WORDPRESS_URL?: string;
  readonly VITE_PAYSTACK_PUBLIC_KEY?: string;
  readonly VITE_ADSENSE_CLIENT?: string;
  readonly VITE_ADSENSE_CONTENT_SLOT?: string;
  readonly VITE_ADSENSE_DIRECTORY_SLOT?: string;
  readonly VITE_ADSENSE_TEST_MODE?: "true" | "false";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
