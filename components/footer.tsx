export default function Footer() {
  return (
    <footer className="h-[100px] px-[48px] flex items-center justify-center bg-[#2563EBDB]">
      <div className="flex flex-col md:flex-row gap-[8px] md:gap-[16px] justify-center items-center">
        <img
          src="/logo/logo-putih.svg"
          alt="logo"
          className="w-[122px] h-[22px] md:w-[133.4px] md:h-[24px] "
        />
        <p className="text-center text-white text-sm font-normal leading-[20px]">
          © 2025 Blog genzet. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
