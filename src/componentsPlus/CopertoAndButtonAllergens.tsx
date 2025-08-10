import { Button } from '@/components/ui/button'
import { Info, Utensils } from 'lucide-react'
import { Link } from 'react-router-dom'


const CopertoAndButtonAllergens = () => {
    return (
        <div className='flex flex-col items-center justify-center p-4 space-y-4'> 
            <Button className='flex items-center space-x-2 rounded-xl shadow-sm justify-center'>
                <Utensils className='text-white' /> 
                <span className='text-lg font-semibold'>Coperto 2 €</span>
            </Button>

            
            <Link to="/allergeni" className='w-full flex justify-center cursor-pointer'>
                <Button className='flex items-center justify-center space-x-2 rounded-xl cursor-pointer transform transition-transform duration-200 hover:-translate-y-1'>
                    <Info className='text-white' />
                    <span className='font-semibold underline'>Pagina Allergeni</span>
                </Button>
            </Link>
        </div>
    )
}

export default CopertoAndButtonAllergens
