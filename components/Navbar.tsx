import { NavLinks } from "@/constant";
import Image from "next/image";
import Link from "next/link";
import AuthProviders from "./AuthProviders";
import { getSession } from "@/lib/session";
import ProfileMenu from "./ProfileMenu";
import Button from "./Button";

const Navbar = async () => {
  const session = await getSession();
  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image
            src="/logo.svg"
            width={115}
            height={43}
            alt="Flexibble Logo"
            priority
            className="w-full h-auto"
          />
        </Link>

        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.text}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            <ProfileMenu session={session} />

            <Link href="/create-project">
              <Button 
                title="Share your project"
              />
            </Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
