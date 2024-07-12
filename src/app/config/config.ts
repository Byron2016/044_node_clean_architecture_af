export const config = {
  server: {
    port: process.env.PORT || 3000,
  },
  db: {
    db_type: process.env.DB_TYPE || "mongo",
  },
};
