import Link from "next/link";
import Image from 'next/image'
import { Fragment } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import placeholder from '../assets/images/user.avif'

type SidebarLink = {
  href: string;
  label: string;
  icon: IconDefinition;
};

type SidebarProps = {
  [key: string]: SidebarLink[];
};

function Sidebar({ links }: {links: SidebarProps}) {
  return (
    <aside>
      <nav className="flex flex-col h-screen">
        <div className="mt-6 ml-6 p-2">
          <Image 
            src='https://app.mainstack.me/assets/logo.734cf801.svg' 
            alt='Mainstack Logo'
            width={40}
            height={40} />
        </div>

        <ul className="mb-9 pl-4">
          {Object.keys(links).map((key) => {
            // Type guard to ensure links[key] is an array
            if (Array.isArray(links[key])) {
              return (
                <Fragment key={key}>
                  <li className="tracking-wider font-bold mb-2 ml-6 mt-8 text-xs">{key}</li>
                  {links[key].map((link: SidebarLink, index: number) => (
                    <li key={link.href} className={link.label == 'Dashboard' ? "ml-6 mb-4 active" : 'ml-6 mb-4'}>
                      <span className="mr-4"><FontAwesomeIcon size='lg' icon={link.icon} /></span>
                      <Link className='p-2' href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </Fragment>
              );
            } else {
              return null;
            }
          })}
        </ul>
        <div className="mt-9 ml-6 flex items-center">
          <Image 
            src={placeholder}
            height={30}
            width={40}
            alt='Placeholder'
            className="rounded-[50%]"
          />
          <h2 className="ml-4">Blessing Daniels</h2>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar