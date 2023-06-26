import Link from 'next/link';
import Image from 'next/image';

const NavBar = () => {
  return (
    <nav className="border-gray-200">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <div className="flex items-center">
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
      </div>
    </nav>
  );
};

export default NavBar;
