import { Route } from "@solidjs/router";
import App from "~/pages/App";
import Checkout from "~/pages/Checkout";

export function Routes() {
  return (
    <>
      <Route path="/" component={App} />
      <Route path="/checkout" component={Checkout} />
    </>
  );
}
