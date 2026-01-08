import express from 'express';
const app = express();
const PORT = 5005;

app.get('/', (req, res) => res.send('SUCCESS'));

app.listen(PORT, () => {
    console.log(`TEST SERVER ONLINE AT ${PORT}`);
});