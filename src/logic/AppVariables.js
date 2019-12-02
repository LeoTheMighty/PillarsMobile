/** Whether the app is in development mode or not. */
export const isDevelopment =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
