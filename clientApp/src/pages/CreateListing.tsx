import React from "react";

function CreateListing() {
  return (
    <main className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 ">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row flex-1 mx-auto">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            name="name"
            maxLength={60}
            minLength={10}
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            name="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            name="address"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" name="sale" classname="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="rent" classname="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="parking" classname="w-5" />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="furnished" classname="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="offer" classname="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="">
            <div className="flex item-center gap-2">
              <input
                type="number"
                name="number"
                max="10"
                required
                className="p-3 border border-gray-100 rounded-lg"
              />
              <span>Bedroom</span>
            </div>
            <div className="flex item-center gap-2">
              <input
                type="number"
                name="number"
                max="10"
                required
                className="p-3 border border-gray-100 rounded-lg"
              />
              <span>Bathrooms</span>
            </div>
            <div className="flex item-center gap-2">
              <input
                type="number"
                name="regularprice"
                max="10"
                required
                className="p-3 border border-gray-100 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <span>Regular Price</span>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex item-center gap-2">
                <input
                  type="number"
                  name="discountedprice"
                  max="10"
                  required
                  className="p-3 border border-gray-100 rounded-lg"
                />
                <div className="flex flex-col items-center">
                  <span>Discounted Price</span>
                  <span className="text-xs">($ / month)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <p className="font-semibold">
            Images
            <span className="font-normal text-gray-600 ml-2">
              First Image will be used as cover (max 6)
            </span>
          </p>
          <div className="flex flex-row">
            <input
              type="file"
              name="images"
              accept="images/*"
              multiple
              className="p-3 border border-gray-300 rounded w-full"
            />
            <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="p-3 mt-4 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
