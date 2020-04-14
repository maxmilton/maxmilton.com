// https://github.com/sveltejs/sapper/blob/master/src/interfaces.ts
// https://github.com/sveltejs/sapper/blob/master/templates/src/server/middleware/types.ts

/* eslint-disable @typescript-eslint/no-explicit-any */

import { IncomingMessage, ServerResponse } from 'http';

export interface Req extends IncomingMessage {
  params?: Record<string, string>;
  query?: { [key: string]: string };
  rawBody?: string;
  body?: { [key: string]: any };
}

export interface Res extends ServerResponse {}

export type Next = () => void;

export interface PostItem {
  html: string;
  metadata: Record<string, string>;
  slug: string;
}
