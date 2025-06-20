/* eslint-disable @typescript-eslint/no-explicit-any */
// vite-env.d.ts
/// <reference types="vite/client" />

declare module "*" {
  const content: any;
  export default content;
}

declare module "*?*as=srcset" {
  const srcset: string;
  export default srcset;
}

declare module "*.jpg?*" {
  const src: string | string[];
  export default src;
}

declare module "*.jpeg?*" {
  const src: string | string[];
  export default src;
}

declare module "*.png?*" {
  const src: string | string[];
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}
