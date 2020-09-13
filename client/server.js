const express = require('express');
const app = express();
const path = require('path');
const compression = require('compression');

app.use(compression());
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`REACT App is running on port ${PORT}`);
});
