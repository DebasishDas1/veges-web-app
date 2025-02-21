import { AdvantageProp } from "@/lib/type";

const Advantage = ({ advantages }: { advantages: AdvantageProp[] }) => {
  return (
    <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
      {(advantages as AdvantageProp[]).map((advantage) => (
        <div
          key={advantage.name}
          className="text-center md:flex md:items-start md:text-left lg:block lg:text-center py-3"
          role="region"
          aria-label={advantage.name}
        >
          <div className="md:flex-shrink-0 flex justify-center">
            <div
              className="h-16 w-16 flex items-center justify-center rounded-full text-green-700 bg-white"
              role="img"
              aria-label={`${advantage.name} icon`}
            >
              <advantage.Icon className="w-1/3 h-1/3" aria-hidden="true" />
            </div>
          </div>

          <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
            <h3 className="text-xl font-black text-white">{advantage.name}</h3>
            <p className="mt-3 text-sm text-white">{advantage.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Advantage;
