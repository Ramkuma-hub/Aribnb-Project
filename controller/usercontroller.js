import User from "../model/user.js";

export const getsignup = (req, res) => {
    res.render("users/signup.ejs")


}

export const postsignup = async (req, res) => {
    let { email, username, password } = req.body;
    const newuser = new User({ email, username })
    const registeredUser = await User.register(newuser, password);
    req.login(registeredUser, function (err) {
        if (err) { return next(err); }
        req.flash("success", "New User Registered");
        res.redirect("/listings");
    });
};

export const getlogin = (req, res) => {
    res.render("users/login.ejs")
}

export const postlogin = async (req, res) => {
    req.flash("success", "Logged in Successfully");
    res.redirect(res.locals.redirectUrl || "/listings");
}

export const logout = (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash("success", "Logged out Successfully");
        res.redirect("/listings");
    });
}