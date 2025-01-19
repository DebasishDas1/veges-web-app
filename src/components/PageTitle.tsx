type Props = {
  title: string;
};

const PageTitle = ({ title }: Props) => {
  return (
    <div className="md:text-8xl text-5xl font-bold py-10 text-center flex justify-center">
      <h1>
        Biryani{" "}
        <span className="bg-gradient-to-r from-emerald-500 to-lime-600 bg-clip-text text-transparent">
          {title}
        </span>
      </h1>
    </div>
  );
};

export default PageTitle;
