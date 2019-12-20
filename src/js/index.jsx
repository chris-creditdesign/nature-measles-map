import "../scss/index.css"

import React from "react"
import ReactDOM from "react-dom"
import ResizeObserver from "resize-observer-polyfill"

import App from "./components/App"

const loadPolyfills = () => {
	const polyfills = []

	if (!window.ResizeObserver) {
		polyfills.push(
			import(
				/* webpackChunkName: "resize-observer-polyfill" */ "resize-observer-polyfill"
			)
		)
	}

	return Promise.all(polyfills)
}

loadPolyfills()
	.then(() => {
		Promise.all([
			import("./formatData"),
			import("./buildParams"),
		]).then(([formatData, buildParams]) => {
			const data = formatData.default()
			const params = buildParams.default()

			const props = { ...data, ...params }

			ReactDOM.render(
				<App {...props} />,
				document.getElementById("js-outerwrapper")
			)
		})

		let requestData = {}

		const listener = event => {
			// stop the ResizeObserver triggering a message
			if (event.origin !== document.location.origin) {
				const height = document.body.offsetHeight
				requestData = event.data

				window.parent.postMessage(
					{ height, requestData },
					"*"
				)
			}
		}

		window.addEventListener("message", listener)

		const ro = new ResizeObserver(entries => {
			const [entry] = entries
			const { contentRect } = entry
			const { height } = contentRect

			window.parent.postMessage({ height, requestData }, "*")
		})

		ro.observe(document.body)
	})
	.catch(error => {
		throw new Error(error)
	})
