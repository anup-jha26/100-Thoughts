const Thought = require('../models/thought');
const ADMIN_PASS = "Anup@@btgs";

module.exports.index = async (req, res) => {
    const allThoughts = await Thought.find({}).collation({ locale: "en", numericOrdering: true }).sort({ day: 1 });
    res.render('thoughts/index', { allThoughts });
};

module.exports.renderNewForm = (req, res) => res.render('thoughts/new');

module.exports.createThought = async (req, res) => {
    if (req.body.adminPassword !== ADMIN_PASS) {
        req.flash("error", "Wrong Password!");
        return res.redirect('/new');
    }
    await new Thought(req.body.thought).save();
    req.flash("success", "Thought added to the journey!");
    res.redirect('/');
};

module.exports.renderEditForm = async (req, res) => {
    const thought = await Thought.findById(req.params.id);
    if (!thought) return res.redirect('/');
    res.render("thoughts/edit", { thought });
};

module.exports.updateThought = async (req, res) => {
    if (req.body.adminPassword !== ADMIN_PASS) {
        req.flash("error", "Wrong Password!");
        return res.redirect(`/${req.params.id}/edit`);
    }
    await Thought.findByIdAndUpdate(req.params.id, { ...req.body.thought });
    req.flash("success", "Thought updated!");
    res.redirect("/");
};

module.exports.deleteThought = async (req, res) => {
    if (req.body.adminPassword !== ADMIN_PASS) {
        req.flash("error", "Wrong Password!");
        return res.redirect("/");
    }
    await Thought.findByIdAndDelete(req.params.id);
    req.flash("success", "Thought deleted.");
    res.redirect("/");
};