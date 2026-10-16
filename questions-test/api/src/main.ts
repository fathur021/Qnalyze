import { app } from "@/config/express.js";
import config from "@/config/vars.js";

app.listen(config.port, () => {
  console.log(`APP is running on http://localhost:${config.port}  `);
});

export default app;
