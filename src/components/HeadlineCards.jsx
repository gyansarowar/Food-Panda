// import React from 'react'

const HeadlineCards = () => {
  return (
    <div className="max-w-[1640px] mx-auto p-4 my-12 grid md:grid-cols-3 gap-6">
      {/*CARD */}
      <div className="hover:scale-105 duration-300 relative rounded-xl">
        {/*OVERLAYS */}
        <div className="absolute w-full h-full bg-black/50 rounded-xl text-white">
          <p className="font-bold font-mono text-2xl px-2 pt-4">
            Sun&apos;s Out,BOGO&apos;s Out
          </p>
          <p className="px-2 font-mono ">Through 8/26</p>
          <button className=" font-semibold text-orange-500 hover:bg-orange-500 hover:text-white border-white font-mono bg-white  mx-2 absolute bottom-4 px-4 py-2 rounded-3xl">
            Order Now
          </button>
        </div>
        <img
          className="max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl"
          src="https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="/"
        ></img>
      </div>
      {/*CARD */}
      <div className="hover:scale-105 duration-300 relative rounded-xl">
        {/*OVERLAYS */}
        <div className="absolute w-full h-full bg-black/50 rounded-xl text-white">
          <p className="font-bold font-mono text-2xl px-2 pt-4">
            New Restaurants
          </p>
          <p className="px-2 font-mono ">Added Daily!</p>
          <button className="font-semibold text-orange-500 border-white font-mono bg-white  mx-2 hover:bg-orange-500 hover:text-white absolute bottom-4 px-4 py-2 rounded-3xl">
            Order Now
          </button>
        </div>
        <img
          className="max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl"
          src="https://images.pexels.com/photos/1143754/pexels-photo-1143754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="/"
        ></img>
      </div>
      {/*CARD */}
      <div className=" hover:scale-105 duration-300 relative rounded-xl">
        {/*OVERLAYS */}
        <div className="absolute w-full h-full bg-black/50 rounded-xl text-white">
          <p className="font-bold font-mono text-2xl px-2 pt-4">
            Deserts & Sweets
          </p>
          <p className="px-2 font-mono ">Tasty Treat!</p>
          <button className="text-orange-500 hover:bg-orange-500 hover:text-white border-white font-mono bg-white  mx-2 absolute bottom-4 px-4 py-2 rounded-3xl">
            Order Now
          </button>
        </div>
        <img
          className="max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl"
          src="https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="/"
        ></img>
      </div>
    </div>
  );
}

export default HeadlineCards