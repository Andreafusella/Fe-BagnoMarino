import Footer from '@/componentsPlus/Footer'
import HeaderMenu from '@/componentsPlus/HeaderMenu'
import HeaderMenuSecond from '@/componentsPlus/HeaderMenuSecond'
import MenuAndCategory from '@/componentsPlus/MenuAndCategory'
import { useGetInfoNotAdminRestaurant } from '@/service/GeneralService'

const Menu = () => {

    const {data: infoRestaurant} = useGetInfoNotAdminRestaurant()

    return (
        <>
            <HeaderMenu></HeaderMenu>
            <HeaderMenuSecond title={'Mare e Tradizione'} descritpion={'Pesce Fresco, Menù di carne e pesce'}></HeaderMenuSecond>
            <MenuAndCategory></MenuAndCategory>
            <Footer infoRestaurant={infoRestaurant}></Footer>
        </>
    )
}

export default Menu