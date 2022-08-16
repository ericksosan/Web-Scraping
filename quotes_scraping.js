import fetch from 'node-fetch';
import cheerio from 'cheerio';

const pageQuotes = (URL) => {
	return fetch(URL)
		.then((res) => res.text())
		.then((data) => data);
};

const URL = 'https://www.goodreads.com/quotes/tag/quotes';

const getQuotes = async () => {
	const quotes_data = await pageQuotes(URL);
	const $ = cheerio.load(quotes_data);
	const listQuotes = [];
	$('.quoteText').each((i, quotes) => {
		let allQuotes = $(quotes)[0].children[0].data;
		listQuotes.push(allQuotes);
	});

	listQuotes.map((quotes, count) => console.log(count, '-', quotes.trim()));
};

getQuotes();
