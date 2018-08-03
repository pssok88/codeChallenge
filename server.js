const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.get('/api/reverse', (req, res) => {
    var text = req.param('text');
    var reversed = [];
    for (var i = text.length - 1; i >= 0; i--) {
        reversed.push(text[i])
    }
    text = reversed.join("");

    res.send({ reversed: text });
});

app.listen(port, () => console.log(`Listening on port ${port}`));