import "./index.css";
import { getUsers, deleteUser } from "./api/userApi";
import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";

Sentry.init({
	dsn:
		"https://05d8c7f1fa2740539873cd9db9a70fb5@o554858.ingest.sentry.io/5683981",
	integrations: [new Integrations.BrowserTracing()],

	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 1.0,
});

getUsers().then((result) => {
	let usersBody = "";

	result.forEach((user) => {
		usersBody += `<tr>
		<td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
		<td>${user.id}</td>
		<td>${user.firstName}</td>
		<td>${user.lastName}</td>
		<td>${user.email}</td>
		</tr>
		`;
	});

	global.document.getElementById("users").innerHTML = usersBody;

	const deleteLinks = global.document.getElementsByClassName("deleteUser");

	// Must use array.from to create a real array from a DOM collection
	// getElementsByClassname only returns an "array like" object
	Array.from(deleteLinks, (link) => {
		link.onclick = function (event) {
			const element = event.target;
			event.preventDefault();
			deleteUser(element.attributes["data-id"].value);
			const row = element.parentNode.parentNode;
			row.parentNode.removeChild(row);
		};
	});
});
