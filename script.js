var mysql = import("https://unpkg.com/browse/mysql@2.18.1/");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "wibso3-rIdwaz-dejrob"
});

con.connect(function(err) {
    if (err) throw err;
	console.log("connected");
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

let count = 1;
let defaultDatabase = "questions";
let table = "allgemein";

function nextAnwser() {
    con.query("USE " + defaultDatabase + ";", function () {
        con.query("SELECT * FROM " + table + " WHERE id = " + count, function (err, result, fields) {
            document.getElementById("questionCount").innerText = count + " von 10 Fragen";
            document.getElementById("question").innerText = result[0].question;
        });
    })
}

function validate() {
    answer = document.getElementById("answerInput");
    con.query("SELECT * FROM " + table + " WHERE id = " + count, function (err, result, fields) {
        solution = result[0].solution;
    });

    similarity = compareTwoStrings(answer, solution);
    if(similarity >= 0.8) {
        console.log("right");
        return true;
    }
    console.log("false");
    return false;
}

window.onload = nextAnwser();