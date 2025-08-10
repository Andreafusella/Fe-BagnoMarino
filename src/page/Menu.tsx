import CopertoAndButtonAllergens from '@/componentsPlus/CopertoAndButtonAllergens'
import Footer from '@/componentsPlus/Footer'
import HeaderMenu from '@/componentsPlus/HeaderMenu'
import HeaderMenuSecond from '@/componentsPlus/HeaderMenuSecond'
import MenuAndCategory from '@/componentsPlus/MenuAndCategory'

const Menu = () => {
    return (
        <>
            <HeaderMenu></HeaderMenu>
            <HeaderMenuSecond title={'Mare e Tradizione'} descritpion={'Pesce Fresco, Menù di carne e pesce'}></HeaderMenuSecond>
            <MenuAndCategory></MenuAndCategory>
            <CopertoAndButtonAllergens/>
            <Footer></Footer>
        </>

        
    )
}

export default Menu