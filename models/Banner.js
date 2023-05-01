import mongoose from "mongoose";

const bannerSchema = mongoose.Schema({
    images: {
        type: [String],

    }
})

const Banner = mongoose.model('banner', bannerSchema);

export default Banner;