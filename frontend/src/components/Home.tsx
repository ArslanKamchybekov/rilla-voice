import sapesperson from "./assets/salesperson.jpg";

const Home = () => {
  return (
    <div className="relative">
      <div className="px-6 lg:px-10">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <img
            className="w-full h-auto object-cover "
            src={sapesperson}
            alt="salesperson"
            style={{ height: "80vh" }}
          />
        </div>
        <div className="relative z-10 max-w-lg py-32 sm:py-48 lg:py-56">
          <div className="bg-black bg-opacity-60 p-10 rounded-md w-[60rem]">
            <h1 className="text-left text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Transform Sales Conversation
            </h1>
            <p className="mt-6 text-left text-lg leading-8 text-gray-300">
              Analyze sales conversations, add comments, and summarize key
              insights to drive actionable feedback
            </p>
            <div className="mt-5 flex items-start gap-x-6">
              <a
                href="#"
                className="rounded-md bg-[#FCF217] px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FCF217]"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;