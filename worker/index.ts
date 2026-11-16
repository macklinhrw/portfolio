/**
 * Runs in front of the static assets, but only for /media/* (see run_worker_first in
 * wrangler.jsonc). Workers static assets answers a byte-range request with the whole file
 * and a 200, and Safari, iOS Safari above all, won't play a video unless it gets a 206 for
 * its opening `Range: bytes=0-1` request. Clips are a few MB at most, so slicing the
 * asset in memory is fine.
 */

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const range = request.headers.get("Range");
    if (!range || !["GET", "HEAD"].includes(request.method)) {
      return withAcceptRanges(await env.ASSETS.fetch(request));
    }
    // A HEAD comes back without a body, so fetch the file itself to learn its size.
    const response = await env.ASSETS.fetch(
      request.method === "HEAD" ? new Request(request, { method: "GET" }) : request,
    );
    if (response.status !== 200) return response;

    const body = await response.arrayBuffer();
    const size = body.byteLength;
    const span = parseRange(range, size);
    // A multi-range or malformed header: sending the whole file is a valid answer.
    if (span === null) return withAcceptRanges(new Response(body, response));

    const headers = new Headers(response.headers);
    headers.set("Accept-Ranges", "bytes");
    if (span === "unsatisfiable") {
      headers.set("Content-Range", `bytes */${size}`);
      headers.delete("Content-Length");
      return new Response(null, { status: 416, headers });
    }

    const [start, end] = span;
    headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
    headers.set("Content-Length", String(end - start + 1));
    const slice = request.method === "HEAD" ? null : body.slice(start, end + 1);
    return new Response(slice, { status: 206, headers });
  },
};

/** Parses a single `bytes=` range into inclusive [start, end] offsets. */
function parseRange(header: string, size: number): [number, number] | "unsatisfiable" | null {
  const match = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!match || (match[1] === "" && match[2] === "")) return null;
  let start: number;
  let end: number;
  if (match[1] === "") {
    // bytes=-N is the last N bytes.
    const length = Number(match[2]);
    if (length === 0) return "unsatisfiable";
    start = Math.max(0, size - length);
    end = size - 1;
  } else {
    start = Number(match[1]);
    end = match[2] === "" ? size - 1 : Math.min(Number(match[2]), size - 1);
  }
  if (start >= size || start > end) return "unsatisfiable";
  return [start, end];
}

function withAcceptRanges(response: Response): Response {
  if (response.status !== 200) return response;
  const copy = new Response(response.body, response);
  copy.headers.set("Accept-Ranges", "bytes");
  return copy;
}
