
import { App } from "./app";

const application = new App();
const PORT = 2909;

application.app.listen(PORT, () => {
   console.log('Express server listening on port ' + PORT);
})