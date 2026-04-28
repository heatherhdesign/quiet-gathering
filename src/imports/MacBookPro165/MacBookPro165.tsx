import imgImage4 from "./74ab02cc8af099874d86d4822223316b07b0658d.png";
import imgImage5 from "./aef579dd32303b01ce098ab84d0937d8eb439326.png";

export default function MacBookPro() {
  return (
    <div className="bg-white border border-black border-solid relative size-full" data-name="MacBook Pro 16' - 5">
      <div className="absolute h-[1490px] left-[-325px] top-[-17px] w-[2648px]" data-name="image 4">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage4} />
      </div>
      <p className="-translate-x-1/2 absolute font-['Public_Sans:Regular',sans-serif] font-normal h-[23px] leading-[normal] left-[232px] text-[#f7e7ce] text-[20px] text-center top-[1317px] w-[348px]">You are not required to engage</p>
      <p className="-translate-x-1/2 absolute font-['Public_Sans:Regular',sans-serif] font-normal h-[23px] leading-[normal] left-[1104px] text-[#f7e7ce] text-[20px] text-center top-[1317px] w-[348px]">Move a little closer</p>
      <p className="-translate-x-1/2 absolute font-['Public_Sans:Regular',sans-serif] font-normal h-[23px] leading-[normal] left-[1978px] text-[#f7e7ce] text-[20px] text-center top-[1317px] w-[348px]">Leave Constellation</p>
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal h-[232px] leading-[normal] left-[calc(50%-0.5px)] not-italic text-[#f7e7ce] text-[96px] text-center top-[620px] w-[1343px]">{`{Twilight with stars scattered across the screen}`}</p>
      <div className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal h-[143px] leading-[0] left-[calc(50%+0.5px)] not-italic text-[#f7e7ce] text-[48px] text-center top-[1013px] w-[785px]">
        <p className="leading-[normal] mb-0">Star Hover / Tap (Overlay)</p>
        <p className="leading-[normal]">Trigger: Tap or click nearby star</p>
      </div>
      <div className="absolute h-[39px] left-[1849px] top-[1309px] w-[29px]" data-name="image 5">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage5} />
      </div>
    </div>
  );
}