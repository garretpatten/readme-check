// TODO: Uncomment out readmePath input

/* GitHub Dependencies */
const core = require('@actions/core');
const github = require('@actions/github');

/* Node Dependencies */
const fs = require('fs');

// const INPUT_README_PATH = 'readmePath';
const OUTPUT_TIMESTAMP = 'time';

console.log('Entering try block');

try {
	// const readmePath = core.getInput(INPUT_README_PATH);
	const readmePath = 'README.md'

	const readmeMetadata = fs.readFileSync(readmePath, 'utf8');
	const fileLines = readmeMetadata.split('\n');

	// TODO: Process README content
	for (let fileLine of fileLines) {
		console.log('LINE START');
		console.log(fileLine);
		console.log('LINE END');
		console.log('');
	}

	core.setOutput(
		OUTPUT_TIMESTAMP,
		new Date().toTimeString()
	);
} catch (error) {
	core.setFailed(error.message);
}