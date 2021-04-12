declare module '@sapper/service-worker' {
  const timestamp: number;
  const files: string[];
  const shell: string[];
  const routes: { pattern: RegExp }[];

  export { timestamp, files, files as assets, shell, routes };
}

declare module '*.gif' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}

declare module '*.webp' {
  const value: string;
  export default value;
}
