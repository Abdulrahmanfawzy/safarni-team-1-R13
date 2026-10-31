import {
  HiArrowLeftStartOnRectangle,
  HiOutlineCalendarDays,
  HiOutlineGlobeAlt,
  HiOutlineLockClosed,
  HiOutlineUser,
} from "react-icons/hi2";

import CardProfile from "../cardprofile/page";
import ModalLogout from "../../shared/Modal/page";

export default function Info_profile() {
  return (
    <div>
      <div className="mt-4 rounded-md  border border-[#b9c4ff]">
        <CardProfile
          icon={
            <HiOutlineUser className="size-5 shrink-0" aria-hidden="true" />
          }
          title="Personal Info"
          href="/profile/personalInfo"
        />

        <CardProfile
          icon={
            <HiOutlineCalendarDays
              className="size-5 shrink-0"
              aria-hidden="true"
            />
          }
          title="My Booking"
          href="/profile/booking"
        />

        <CardProfile
          icon={
            <HiOutlineGlobeAlt className="size-5 shrink-0" aria-hidden="true" />
          }
          title="App Language"
          href="/profile/myAppLang"
        />

        <CardProfile
          icon={
            <HiOutlineLockClosed
              className="size-5 shrink-0"
              aria-hidden="true"
            />
          }
          title="Account & Security"
          href="/profile/security"
        />
      </div>

      <h5 className="text-red-500 flex items-center mt-8 font-bold">
        <HiArrowLeftStartOnRectangle />

        <ModalLogout />
      </h5>
    </div>
  );
}
