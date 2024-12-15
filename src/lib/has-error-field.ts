export function hasErrorField(
  err: unknown,
): err is { data: { error: string; message: string; statusCode: number } } {
  return (
    typeof err === 'object' && err !== null && 'message' in err && typeof err.message === 'string'
  );
}
