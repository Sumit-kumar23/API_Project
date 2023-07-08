const express=require('express');
const request=require('request-promise');
const app=express();
require('dotenv').config()
const PORT=process.env.PORT || 4001;
app.use(express.json());

//const API_KEY= USE YOUR OWN API KEY;
const BASE_URL=`http://api.scraperapi.com?api_key=${API_KEY}&autoparse=true`
app.get('/' ,(req, res)=>{
    res.send("checking checking 123");
});

// get product details
app.get('/product/:productID', async(req, res)=>{
        const {productID}=req.params;
        try {
            const response=await request(`${BASE_URL}&url=https://www.amazon.in/dp/${productID}`)
            res.json(
                JSON.parse(response)
        )

        } 
        catch (error) {
            res.json({
                error
            })
        }
})

// geting product reviews
app.get('/product/:productID/review', async(req, res)=>{
    const {productID}=req.params;
    try {
        const response=await request(`${BASE_URL}&url=https://www.amazon.in/product-reviews/${productID}`)
        res.json(JSON.parse(response));

    } 
    catch (error) {
        res.json({
            error
        })
    }
})

// offers
app.get('/product/:productID/offers', async(req, res)=>{
    const {productID}=req.params;
    try {
        const response=await request(`${BASE_URL}&url=https://www.amazon.in/gp/offer-listing/${productID}`)
        res.json(JSON.parse(response));

    } 
    catch (error) {
        res.json({
            error
        })
    }
})

app.listen(PORT, ()=>{
    console.log(`server is working at ${PORT}`);
})
