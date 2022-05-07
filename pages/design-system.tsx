import type { NextPage } from "next";

const DesignSystemRoute: NextPage = () => {
  return (
    <div>
      <div className="flex">
        <div className="w-[24px] h-[24px] bg-primary-10"></div>
        <p>bg-primary-10</p>
      </div>
      <div className="flex">
        <div className="w-[24px] h-[24px] bg-primary-20"></div>
        <p>bg-primary-20</p>
      </div>
      <div className="flex">
        <div className="w-[24px] h-[24px] bg-primary-30"></div>
        <p>bg-primary-30</p>
      </div>
      <div className="flex">
        <div className="w-[24px] h-[24px] bg-primary-40"></div>
        <p>bg-primary-40</p>
      </div>

      <div className="flex">
        <div className="w-[24px] h-[24px] bg-dark-10"></div>
        <p>bg-dark-10</p>
      </div>
      <div className="flex">
        <div className="w-[24px] h-[24px] bg-dark-20"></div>
        <p>bg-dark-20</p>
      </div>
      <div className="flex">
        <div className="w-[24px] h-[24px] bg-dark-30"></div>
        <p>bg-dark-30</p>
      </div>
      <div className="flex">
        <div className="w-[24px] h-[24px] bg-dark-40"></div>
        <p>bg-dark-40</p>
      </div>
      <div className="flex">
        <div className="w-[24px] h-[24px] bg-dark-50"></div>
        <p>bg-dark-50</p>
      </div>

      <div className="flex">
        <div className="w-[24px] h-[24px] bg-error"></div>
        <p>bg-error</p>
      </div>

      <p className="heading1">Heading1</p>
      <p className="heading2">Heading2</p>
      <p className="heading3">Heading3</p>
      <p className="heading4">Heading4</p>
      <p className="heading5">Heading5</p>
      <p className="subtitle">Subtitle</p>
      <p className="body">Body</p>
      <p className="button">Button</p>
      <p className="caption">Caption</p>
    </div>
  );
};

export default DesignSystemRoute;
