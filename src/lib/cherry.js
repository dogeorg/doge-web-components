// import { setBasePath } from '../../resources/blocks/shoelace@2.12.0/utilities/base-path.js';

export const resourceBasePath = "https://fetch.dogecoin.local/resources"

export function dogeComponentInit() {
	// Ensures the page utilising the component has the base doge components stylesheet
	addStylesheetsIfNotPresent(stylesheetPaths);

	// Ensures components utilising elements from shoelace have an accurate shoelace basepath set.
	// setBasePath('https://fetch.dogecoin.org/resources/blocks/shoelace@2.12.0');
}

let stylesheetPaths = [
	`${resourceBasePath}/css/doge-components.css`,
];

function addStylesheetsIfNotPresent(stylesheetPaths) {
	try {

		const existingSheets = Array.from(document.styleSheets);

		stylesheetPaths.forEach((path) => {
			const sheetExists = existingSheets.some((sheet) => sheet.href === path);

			if (!sheetExists) {
				const newSheet = document.createElement("link");
				newSheet.setAttribute("rel", "stylesheet");
				newSheet.setAttribute("href", path);
				document.head.appendChild(newSheet);
			}
		});
	} catch (err) {
		console.error(err)
	}
}