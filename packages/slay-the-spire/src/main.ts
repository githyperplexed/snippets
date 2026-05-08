import { mount } from "svelte"

import App from "$lib/components/app.svelte"

import "$lib/styles/style.css"

const app = mount(App, {
	target: document.body
})

export default app
