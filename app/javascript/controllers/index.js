import { Application } from "@hotwired/stimulus";
import Autocomplete from "stimulus-autocomplete";

const application = Application.start();

const controllers = require.context("controllers", true, /_controller\.js$/);
controllers.keys().forEach((filename) => {
  const controllerModule = controllers(filename);
  const controllerName = filename.replace(/(^.\/|_controller\.js$)/g, "");
  application.register(controllerName, controllerModule.default);
});

application.register("autocomplete", Autocomplete);

export { application };
