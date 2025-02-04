import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { ProfileAvatarProps } from "@/lib/type";

const ProfileAvatar = ({
  loggedIn,
  avatarImage,
  avatarName,
}: ProfileAvatarProps) => {
  return (
    <div className="pl-4 md:px-8">
      {loggedIn ? (
        <Link href="/profile" className="flex">
          <Avatar className="h-fit">
            <AvatarImage src={avatarImage} aria-label={"user"} />
            <AvatarFallback>{avatarName ? avatarName[0] : ""}</AvatarFallback>
          </Avatar>
          <span className="hidden md:flex pl-3 text-green-700">
            {avatarName}
          </span>
        </Link>
      ) : (
        <Link href="/sign-in">
          <UserRound aria-label={"user"} />
        </Link>
      )}
    </div>
  );
};

export default ProfileAvatar;
