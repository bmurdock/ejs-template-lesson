const express = require('express');
const port = 8765;

const users = [{
    name: 'Brian Murdock',
    email: 'brian@helio.com',
    id: 312,
}, {
    name: 'Alex Something',
    email: 'alex@helio.com',
    id: 313,
}, {
    name: 'Chris Smith',
    email: 'csmith@helio.com',
    id: 314,
}, {
    name: 'Giacinta Bianchi',
    email: 'giabia@helio.com',
    id: 315,
}];

const app = express();

//app.use(express.static('public'));
app.set('view engine', 'ejs');

// create a route for the index page
app.get('/', (req, res, next) => {
    res.render('pages/index', {
        color: 'red',
        title: 'Welcome',
        users,
        element: '<div>Some text</div>',
    });
});

const profileLookup = (_id) => {
    /* 
        This function should return an array of matching users
        Hopefully that array only has 1 element which is THE
        matching user. So the result should look like:
        [{
            name: 'Brian Murdock',
            email: 'brian@helio.com',
            id: 312,
        }]
    */
    const id = parseInt(_id);
    return users.filter((user) => {
        return user.id === id;
    });
};

app.get('/search/:name', (req, res, next) => {
    res.json(users.filter((user) => {
        // return true if the search name matches even PART
        // of the user name
        return user.name.indexOf(req.params.name) !== -1;
    }))
});
app.get('/profile/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    let user = profileLookup(id);
    if (user.length === 0) {
        console.log('user not found..');
        res.render('pages/notfound');
        return;
    }
    user = user[0];

    console.log('found user: ', user);
    res.render('pages/profile', {
        title: `Profile > ${user.name}`,
        user,
    });
});

app.listen(port, (err) => {
    if (err) {
        console.log('Error launching server: ', err);
    }
    console.log(`Application is listening on port ${port}...`);
});