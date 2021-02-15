declare module '@sapper/app' {
  // from sapper/runtime/src/app/types.ts
  // sapper doesn't export its types yet
  interface Redirect {
    statusCode: number;
    location: string;
  }
  // end

  function goto(
    href: string,
    opts: { replaceState: boolean },
  ): Promise<unknown>;
  function prefetch(
    href: string,
  ): Promise<{ redirect?: Redirect; data?: unknown }>;
  function prefetchRoutes(pathnames: string[]): Promise<unknown>;
  function start(opts: { target: Node }): Promise<unknown>;
  const stores: () => unknown;

  export { goto, prefetch, prefetchRoutes, start, stores };
}

declare module '@sapper/server' {
  import { RequestHandler } from 'express'; // eslint-disable-line import/no-unresolved

  interface MiddlewareOptions {
    session?: (req: Express.Request, res: Express.Response) => unknown;
    ignore?: unknown;
  }

  function middleware(opts?: MiddlewareOptions): RequestHandler;

  export { middleware };
}

declare module '@sapper/service-worker' {
  const timestamp: number;
  const files: string[];
  const shell: string[];
  const routes: { pattern: RegExp }[];

  export { timestamp, files, files as assets, shell, routes };
}

/**
 * These declarations tell TypeScript that we allow import of images, e.g.
 * ```.
    <script lang='ts'>
      import successkid from 'images/successkid.jpg';
    </script>
    <img src="{successkid}">
   ```.
 */
declare module '*.gif' {
  const value: string;
  export = value;
}

declare module '*.jpg' {
  const value: string;
  export = value;
}

declare module '*.jpeg' {
  const value: string;
  export = value;
}

declare module '*.png' {
  const value: string;
  export = value;
}

declare module '*.svg' {
  const value: string;
  export = value;
}

declare module '*.webp' {
  const value: string;
  export = value;
}
