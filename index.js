const express = require("express")
const cors = require("cors");
const app = express()
const path = require('path')
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 4000;

const API_KEY = '2ca4716ae3eaf563682313467255f26d-ef80054a-b54fc87f';
const DOMAIN = 'sandbox921705cc6f7245f090fd5d3ee2618573.mailgun.org';

const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: API_KEY, url: 'https://api.mailgun.net/' })

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'templates'))
app.get("/", (req, res) => {
    res.render('pages/mailBox', { title: 'Mail Gun' });
})
app.post("/data", async (req, res) => {
    console.log("getData", req.body);
    try {
        await mg.messages.create(DOMAIN, {
            from: "Excited User <kumarshubham5040289@gmail.com>",
            to: ["kumarshubham5040289@gmail.com"],
            subject: "Hello",
            text: "Testing some Mailgun awesomness!",
            html: "<h1>Testing some Mailgun awesomness!</h1>"
        })
            .then(msg => console.log(msg)) // logs response data
            .catch(err => console.log(err)); // logs any error
    } catch (error) {
        console.log("ERROR", error)
    }

})



app.listen(PORT, () => console.log(`Server List to Port no ${PORT}`))
