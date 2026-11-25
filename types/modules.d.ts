// Declarations for dependencies that ship no usable types. They only cover what
// this repository uses.
//
// Checked alternatives: Eleventy's own "@11ty/eleventy/UserConfig" types are
// inferred from JSDoc (needs allowJs, mostly `any`, no htmlTransformer).
// @types/11ty__eleventy-plugin-rss targets v2 and the third-party 11ty.ts.

declare module "@11ty/eleventy" {
  interface CollectionItem {
    url: string;
    inputPath: string;
    data: Record<string, unknown>;
  }

  interface CollectionApi {
    getFilteredByGlob(glob: string | string[]): CollectionItem[];
  }

  export interface UserConfig {
    addCollection(
      name: string,
      callback: (collectionApi: CollectionApi) => unknown,
    ): void;
    addDataExtension(
      extensions: string,
      options: {
        parser: (contentsOrPath: string, filePath: string) => unknown;
        read?: boolean;
      },
    ): void;
    addFilter(name: string, callback: (...args: any[]) => unknown): void;
    addPassthroughCopy(paths: string | Record<string, string>): void;
    addPlugin(plugin: unknown, options?: unknown): void;
    setFrontMatterParsingOptions(options: Record<string, unknown>): void;
    htmlTransformer: {
      addPosthtmlPlugin(
        extensions: string,
        plugin: (context: {
          page: { inputPath: string; outputPath: string; url: string };
        }) => (tree: import("posthtml").Node) => unknown,
      ): void;
    };
  }
}

declare module "@11ty/eleventy-plugin-rss" {
  const plugin: unknown;
  export default plugin;
}

declare module "volunteer-contributions-fetch" {
  export interface Contribution {
    createdAt: string;
    description: string;
    link: string;
    type: string;
    source: string;
    tags?: string[];
  }

  // The package validates the config itself, see its README for all options.
  export interface Config {
    outputFile: string;
    [source: string]: unknown;
  }

  export function fetchAll(
    config: Config,
    contributions?: Contribution[],
  ): Promise<unknown>;

  export function backfillGitHub(
    config: Config,
    options: { orgs: string[] },
    contributions?: Contribution[],
  ): Promise<unknown>;
}
