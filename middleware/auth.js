const Event = require('../models/meetupEvent');

// check if user is a guest
exports.isGuest = (req, res, next) => 
{
    if (!req.session.user)
    {
        return next();
    }
    else
    {
        req.flash("error", "You're already logged in.");
        return res.redirect("/users/profile");
    }
}

// check if user is logged in
exports.isLoggedIn = (req, res, next) =>
{
    if (req.session.user)
    {
        return next();
    }
    else
    {
        req.flash("error", "You're not logged in.");
        return res.redirect("/users/login");
    }
}

// check if user is author of a story
exports.isAuthor = (req, res, next) =>
{
    let id = req.params.id;
    Event.findById(id)
    .then((story) =>
    {
        if (story)
        {
            // check the author
            if (story.author == req.session.user)
            {
                return next();
            }
            else
            {
                let err = new Error("Unauthorized to access the resource.");
                err.status = 401;
                return next(err);
            }
        }
        else
        {
            let err = new Error('Cannot find a Meetup with id.');
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
}
