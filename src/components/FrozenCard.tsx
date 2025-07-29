import { Snowflake } from 'lucide-react'
import React from 'react'

const FrozenCard = () => {
    return (
        <div className="rounded-xl bg-blue-400 border border-blue-500 px-3 pt-[2px]">
            <div className="flex gap-2 items-center justify-center">
                <Snowflake className="text-white"/>
                <h1 className="font-semibold text-amber-50">Congelato</h1>
            </div>
        </div>
    )
}

export default FrozenCard