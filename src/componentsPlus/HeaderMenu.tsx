import HeaderLogoIcon from "@/components/HeaderLogoIcon"


const HeaderMenu = () => {
  return (
    <div className='beach-header-bg bg-gradient-white-transparent glass-nav sticky top-0 z-50 relative overflow-hidden'>
        <img src="/public/palma-sinistra.png" className="absolute bottom-0 left-0 h-24 md:h-32 lg:h-40 object-contain z-0 pointer-events-none blur-none" />
        <img src="/public/palma-destra.png" className="absolute bottom-0 right-0 h-24 md:h-32 lg:h-40 object-contain z-0 pointer-events-none blur-none" />
        <HeaderLogoIcon/>
    </div>
  )
}

export default HeaderMenu