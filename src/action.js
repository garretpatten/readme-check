/* GitHub Dependencies */
const core = require('@actions/core');
const github = require('@actions/github');

/* Node Dependencies */
const fs = require('fs');

/* I/O */
const INPUT_README_PATH = 'readmePath';
const OUTPUT_TIMESTAMP = 'timestamp';

const repoName = github.context.payload.repository.full_name.split('/')[1];

// TODO: Define checks logic

function checkTableOfContents() {

}

function checkInstallationSection() {

}

function checkUsageSection() {

}

function checkRelatedEffortsSection() {

}

function checkMaintainers() {

}

function checkContributingSection() {

}

function checkLicenseSection() {

}

/* Validates the title of the README
 * which should be an image title or
 * a top level markdown heading whose
 * title matches the repository name
 */
function checkTopLine(topLine) {
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

	// Errors array will collect all failed checks
	// to be surfaced in the final check failure.
	// The action will pass on an empty errors array.
	// This may need to be in the scope of the entire
	// file to avoid passing it through to each check.
	const errors = [];

	// TODO: Structure checks into an array
	// of functions that are run on a map
	// built out of the parsed readme data.
	// All checks must take the same params
	// for this approach to work.

	const topLine = readmeLines[0];
	checkTopLine(topLine);

	checkTableOfContents();

	checkInstallationSection();

	checkUsageSection();

	checkRelatedEffortsSection();

	checkMaintainers();

	checkContributingSection();

	checkLicenseSection();

	core.setOutput(
		OUTPUT_TIMESTAMP,
		new Date().toTimeString()
	);
} catch (error) {
	core.setFailed(error.message);
}