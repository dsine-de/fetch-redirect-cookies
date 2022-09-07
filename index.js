import express from 'express';

const app = express();

app.get('/redirect', (req, res, next) => {
	res.cookie('test', 'value');
	res.redirect('/redirect_to');
});

app.get('/redirect_to', (req, res, next) => {
	console.log(`Cookie: ${req.get('cookie')}`);
	res.status(200).end();
});

app.listen(8080, async () => {
	try {
		await fetch('http://localhost:8080/redirect');

		await fetch('http://localhost:8080/redirect', {
			credentials: 'include'
		});
	} catch (err) {
		console.error(err);
	}
});
