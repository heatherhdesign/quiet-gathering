import imgImage7 from "./744304efce34358975b6a2838dc4c5ff6485daa4.png";

function Group() {
  return (
    <div className="absolute h-[290px] left-[1000px] top-[263px] w-[208px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 208 290">
        <g id="Group 1">
          <line id="Line 1" stroke="var(--stroke-0, #F3C987)" strokeWidth="4" x1="109" x2="109" y1="7.18733e-08" y2="290" />
          <line id="Line 6" stroke="var(--stroke-0, #F3C987)" strokeWidth="4" x1="53.8202" x2="150.458" y1="29.1713" y2="241.445" />
          <line id="Line 5" stroke="var(--stroke-0, #F3C987)" strokeWidth="4" x1="164.367" x2="65.8164" y1="30.8371" y2="244.673" />
          <line id="Line 2" stroke="var(--stroke-0, #F3C987)" strokeWidth="4" x1="208" x2="1.74846e-07" y1="150" y2="150" />
          <line id="Line 8" stroke="var(--stroke-0, #F3C987)" strokeWidth="4" x1="177.658" x2="28.5779" y1="188.27" y2="104.843" />
          <line id="Line 7" stroke="var(--stroke-0, #F3C987)" strokeWidth="4" x1="196.745" x2="24.1625" y1="87.6275" y2="210.897" />
        </g>
      </svg>
    </div>
  );
}

export default function MacBookPro() {
  return (
    <div className="bg-white border border-black border-solid relative size-full" data-name="MacBook Pro 16' - 4">
      <div className="absolute h-[1435px] left-[-342px] top-[-1px] w-[2551px]" data-name="image 7">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage7} />
      </div>
      <p className="-translate-x-1/2 absolute font-['Fraunces:Regular',sans-serif] font-normal h-[179px] leading-[normal] left-[calc(50%-0.5px)] text-[#f7e7ce] text-[96px] text-center top-[623px] w-[1213px]" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
        Your light is here
      </p>
      <Group />
    </div>
  );
}