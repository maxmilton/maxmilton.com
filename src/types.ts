// https://github.com/sveltejs/sapper/blob/master/src/interfaces.ts
// https://github.com/sveltejs/sapper/blob/master/templates/src/server/middleware/types.ts

/* eslint-disable @typescript-eslint/no-explicit-any */

import { IncomingMessage, ServerResponse } from 'http';

export interface Req extends IncomingMessage {
  body?: { [key: string]: any };
  params?: Record<string, string>;
  query?: { [key: string]: string };
  rawBody?: string;
}

export interface Res extends ServerResponse {}

export type Next = () => void;

export interface MetaData {
  date: string;
  description?: string;
  draft?: boolean;
  pubdate: string;
  tags?: string[];
  title?: string;
}

export interface PostItem {
  html: string;
  metadata: MetaData;
  slug: string;
}
