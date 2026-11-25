// A stand-in for Vercel's response that records what the handler set
export function createResponse() {
  return {
    statusCode: undefined as number | undefined,
    headers: {} as Record<string, string>,
    body: undefined as unknown,
    setHeader(name: string, value: string) {
      this.headers[name.toLowerCase()] = value;
      return this;
    },
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(body: unknown) {
      this.body = body;
      return this;
    },
    send(body?: string) {
      this.body = body;
      return this;
    },
    end() {
      return this;
    },
  };
}
