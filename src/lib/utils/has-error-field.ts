export function hasErrorField(err: unknown): err is {
  error: string;
  message: string;
  response: { data: { message: string } };
  statusCode: number;
} {
  return (
    typeof err === 'object' &&
    err !== null &&
    'response' in err &&
    typeof err.response === 'object' &&
    err.response !== null &&
    'data' in err.response &&
    typeof err.response.data === 'object' &&
    err.response.data !== null &&
    'message' in err.response.data &&
    typeof err.response.data.message === 'string'
  );
}
