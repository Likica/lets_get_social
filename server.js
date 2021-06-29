const express = require('express');
const mongoose = require('mongoose');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

//set up Mongoose to connect when we start the app
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/lets_get_social', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//****USE THIS TO LOG MONGO QUERIES BEING EXECUTED!****
mongoose.set('debug', true);


app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));