import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
        <div className="flex justify-center">
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-8"
            alt="Flowbite Logo"
            width={32}
            height={32}
          />
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            Ka Ke-Bo
          </span>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 dark:text-gray-400 sm:text-center">
          © 2023 Ka Ke-Bo™. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
