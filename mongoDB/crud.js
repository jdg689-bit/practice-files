async function createListing(client, newListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
    console.log(`New listing created. id: ${result.insertedId}`);
}

async function findOneListingByName(client, nameOfListing) {
    // Returns first document that matches query
    
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({name: nameOfListing});

    if (result) {
        console.log(`Listing found with name matching: ${nameOfListing}:`);
        console.log(result);
    } else {
        console.log(`Unable to find listing with name matching ${nameOfListing}`);
    }
}

async function findMultipleByBedrooms(client, minBedrooms) {
    // find() returns a CURSOR -> allows traversal over the result set of a query
    const cursor = await client.db("sample_airbnb").collection("listingsAndReviews").find(
        {
            bedrooms: {$gte: minBedrooms} // gte is a comparison query operator >=
        }
    ).sort({last_review: -1}) // listings with most recent reviews returned first
    .limit(5);

    const results = await cursor.toArray();
    
    if (results.length > 0) {
        results.forEach(listing => {
            console.log(`id: ${listing._id}`);
            console.log(`name: ${listing.name}`);
            console.log(`bedrooms: ${listing.bedrooms}`);
            console.log(`last_reviewed: ${listing.last_review}`);
        })
    } else {
        console.log(`No listing found with ${minBedrooms} or more bedrooms.`)
    }
}

module.exports = {
    createListing,
    findOneListingByName,
    findMultipleByBedrooms
}