var mysql = require('mysql');

let count = 1;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "546678"
});

// Credit to string-similarity by aceakash
function compareTwoStrings(first, second) {
	first = first.replace(/\s+/g, '')
	second = second.replace(/\s+/g, '')

	if (first === second) return 1; // identical or empty
	if (first.length < 2 || second.length < 2) return 0; // if either is a 0-letter or 1-letter string

	let firstBigrams = new Map();
	for (let i = 0; i < first.length - 1; i++) {
		const bigram = first.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram) + 1
			: 1;

		firstBigrams.set(bigram, count);
	};

	let intersectionSize = 0;
	for (let i = 0; i < second.length - 1; i++) {
		const bigram = second.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram)
			: 0;

		if (count > 0) {
			firstBigrams.set(bigram, count - 1);
			intersectionSize++;
		}
	}

	return (2.0 * intersectionSize) / (first.length + second.length - 2);
}

function validate(awnser, solution) {
    similarity = compareTwoStrings(awnser, solution);
    if(similarity >= 0.8) {
        return true;
    }
    return false;
}

function getNextAnwser() {
    con.connect(function(err) {
        if (err) throw err;
        con.query("USE questions;", function (err, result, fields) {
            con.query("SELECT * FROM allgemein WHERE id = " + count, function (err, result, fields) {
                document.getElementById("questionCount").innerText = count + " von 10 Fragen";
                document.getElementById("questionCount").innerText = result[0].question;

            });
        })
      });
}

window.onload = getNextAnwser();
console.log("Finished");