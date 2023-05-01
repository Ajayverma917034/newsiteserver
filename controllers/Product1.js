import Product1 from "../models/ProductData.js";
import ErrorHandler from "../utils/errorHandler.js";
import tryCatch from "./utils/tryCatch.js"
import ApiFeatures from "../middleware/apiFeature.js";

export const produt1Create = tryCatch(async (req, res) => {
    const { heading, rating } = req.body;
    if (rating > 5 || rating < 1)
        return res.status(400).json({
            success: false,
            message: 'Rating must be in range 1 to 5',
        });
    if (heading.length < 1 || heading.length > 30)
        return res.status(400).json({
            success: false,
            message: 'Heading must be in range of 1 to 30 letter',
        });


    const user = await Product1.create({ ...req.body });

    res.status(201).json({
        success: true,
        result: {},
    });
});
export const getProduct1 = tryCatch(async (req, res) => {
    const product = await Product1.find().sort({ _id: -1 })
    res.status(200).json({ success: true, result: product })
})

// new backend
