const Listing = require('../models/listing');

// INDEX - show all listings
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
};

// NEW - form to create listing
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

// SHOW - show one listing (with reviews + owner)
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: { path: "author" }
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing Not Found");
        return res.redirect("/listings");
    }

    res.render("listings/show", { listing });
};

// CREATE - add new listing
module.exports.createListing = async (req, res) => {
    let url =  req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;   // logged-in user becomes owner
    newListing.image = {url, filename};
    await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect('/listings');
};

// EDIT - form to edit listing
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing Not Found");
        return res.redirect("/listings");
    }

    res.render("listings/edit", { listing });
};

// UPDATE - update listing
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;

    let updatedListing = await Listing.findByIdAndUpdate(
        id,
        { ...req.body.listing },
        { new: true }
    );

    if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        updatedListing.image = { url, filename };
        await updatedListing.save();
    }

    req.flash("success", "Listing Modified!");
    res.redirect(`/listings/${updatedListing._id}`);
};


// DELETE - delete listing
module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};
