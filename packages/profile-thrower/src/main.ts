import "./style.css";

import { mount } from "svelte";

import App from "./lib/components/app.svelte";

const app = mount(App, {
  target: document.body
})

export default app;
