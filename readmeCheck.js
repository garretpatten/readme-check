/* GitHub Dependencies */
const core = require('@actions/core');
const github = require('@actions/github');

/* Node Dependencies */
const fs = require('fs');
// TODO: Is this needed?
const spawn = require('child_process').spawn;
const xml2js = require('xml2js');

const INPUT_README_PATH = 'readmePath';
// TODO: Delete this
const OUTPUT_README_DATA = 'readmeData';
const OUTPUT_TIMESTAMP = time;

try {
	const readmePath = core.getInput(INPUT_README_PATH);

	const readmeMetadata = fs.readFileSync(readmePath, 'utf8');

	const metadataParser = new xml2js.Parser();
	// TODO: Does this support () => {} syntax?
	metadataParser.parseString(readmeMetadata, function() {
		if (err) {
			console.log('There was an error parsing the README file');
			// TODO: Is this needed?
			process.exit(1);
		}

		// TODO: Validate format of data
		console.log('Test console log');
		console.log(data);
	});

	core.setOutput(
		OUTPUT_README_DATA,
		data
	);
	core.setOutput(
		OUTPUT_TIMESTAMP,
		new Date().toTimeString()
	);
} catch (error) {
	core.setFailed(error.message);
}