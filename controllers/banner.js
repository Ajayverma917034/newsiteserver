import Banner from "../models/banner.js";
import tryCatch from "./utils/tryCatch.js";

export const createBanner = tryCatch(async (req, res) => {
    const images = req.body;
    // console.log(images)
    const newBanner = new Banner({ images });
    await newBanner.save();
    res.status(201).json({ success: true, result: newBanner });
});

export const getBanner = tryCatch(async (req, res) => {
    const banner = await Banner.find().sort({ _id: -1 })
    res.status(200).json({ success: true, result: banner })
})

export const addBanner = tryCatch(async (req, res) => {
    // console.log(req.body)
    const { id, images } = req.body;
    // console.log(id, images)
    const result = await Banner.updateOne({ _id: id }, {
        $push: {
            images: images,
        }
    });
    // console.log(result)
    res.status(200).json({ success: true, result: {} })
})
export const delBanner = tryCatch(async (req, res) => {
    const { id, image } = req.body;
    // console.log(id, image)
    await Banner.updateOne({ _id: id }, {
        $pull: {
            images: image,
        }
    });
    res.status(200).json({ success: true, result: {} })

})