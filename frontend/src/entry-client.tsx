// @refresh reload
import { mount, StartClient } from "@solidjs/start/client";
import "~/styles/app.css";

mount(() => <StartClient />, document.getElementById("app")!);
