export default {
  plugins: {
    "tailwindcss/nesting": {},
    tailwindcss: {},
    autoprefixer: {},
    // eslint-disable-next-line no-undef
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
  },
};
