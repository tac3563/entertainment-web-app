/** Reads `?q=` from page search params, ignoring repeated values. */
export function readQuery(params: Record<string, string | string[] | undefined>): string {
  const q = params.q;
  return (Array.isArray(q) ? q[0] : q)?.trim() ?? "";
}
