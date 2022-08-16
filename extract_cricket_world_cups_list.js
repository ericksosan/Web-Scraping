import fetch from 'node-fetch';
import cheerio from 'cheerio';

const getRawDate = (URL) => {
	return fetch(URL)
		.then((res) => res.text())
		.then((data) => data);
};

const URL = 'https://en.wikipedia.org/wiki/Cricket_World_Cup';

const getCricketWorldCupsList = async () => {
	const Cricket_World_CupRawData = await getRawDate(URL);
	const parsedCricketWorldCupData = cheerio.load(Cricket_World_CupRawData);
	const worldCupsDataTable =
		parsedCricketWorldCupData('table.wikitable')[0].children[1].children;
	console.log('Year --- Winner --- Runner');
	worldCupsDataTable.forEach((row) => {
		if (row.name === 'tr') {
			let year = null,
				winner = null,
				runner = null;

			const columns = row.children.filter((column) => column.name === 'td');

			const yearColumn = columns[0];
			if (yearColumn) {
				year = yearColumn.children[0];
				if (year) {
					year = year.children[0].data;
				}
			}

			const winnerColumn = columns[3];
			if (winnerColumn) {
				winner = winnerColumn.children[1];
				if (winner) {
					winner = winner.children[0].data;
				}
			}

			const runnerColumn = columns[5];
			if (runnerColumn) {
				runner = runnerColumn.children[1];
				if (runner) {
					runner = runner.children[0].data;
				}
			}

			if (year && winner && runner) {
				console.log(`${year} --- ${winner} --- ${runner}`);
			}
		}
	});
};

getCricketWorldCupsList();
