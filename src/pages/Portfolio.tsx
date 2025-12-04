import empty_nest from '../assets/empty_nest.png';

function Portfolio() {
  return (
    <>
      <h3 className="font-poppins pl-6 pt-5 font-semibold text-2xl">
        Portfolio
      </h3>
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <img src={empty_nest} className="h-25 mt-50"/>
        <p>No coins to show.</p>
        <p className="font-poppins text-md font-semibold text-center">
          Keep track of coins you’re interested in.
        </p>
        <button className="bg-[#fe5914] hover:bg-[#ff6b2a] text-white font-semibold px-4 py-2 rounded-md transition-colors w-30">
          Add Coin
        </button>
      </div>
    </>
  );
}

export default Portfolio;
