import app from "./src/app";
import { connectToDB } from "./src/config/mongoose";

connectToDB();
const port = process.env.PORT || 4400;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
