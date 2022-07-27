/* GitHub Dependencies */
const core = require('@actions/core');
const github = require('@actions/github');

/* Node Dependencies */
const fs = require('fs');

/* I/O */
const INPUT_README_PATH = 'readmePath';
const OUTPUT_TIMESTAMP = 'time';

const repoName = github.event.repository.name;
console.log(github.context);

/* Validates the title of the README
 * which should be an image title or
 * a top level markdown heading whose
 * title matches the repository name
 */
function validateTopLine(topLine) {
	const topLineSplit = topLine.split(' ');

	// Check for image title
	if (topLineSplit.length === 1 && topLineSplit[0].substring(0, 2) !== '[!') {
		return;
	}

	// Check for markdown heading
	if (topLineSplit[0] === '#'
		|| topLineSplit[1].toUpperCase() != repoName.toUpperCase()) {
			return;
	}

	core.setFailed('The top line of the README should contain a descriptive image or a top level markdown heading that matches the repository name');
}

try {
	const readmePath = core.getInput(INPUT_README_PATH);

	const readmeMetadata = fs.readFileSync(readmePath, 'utf8');
	const readmeLines = readmeMetadata.split('\n');

	if (readmeLines.length == 0) {
		core.setFailed('The README file is empty.');
	}

	const topLine = readmeLines[0];
	validateTopLine(topLine);

	// TODO: Add additional processing of README content

	core.setOutput(
		OUTPUT_TIMESTAMP,
		new Date().toTimeString()
	);
} catch (error) {
	core.setFailed(error.message);
}