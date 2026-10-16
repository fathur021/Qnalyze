interface Vars {
  readonly port: number;
}

const port = Number(process.env.PORT ?? 3000);

const config: Vars = {
  port: Number.isFinite(port) ? port : 3000,
};

export default config;
