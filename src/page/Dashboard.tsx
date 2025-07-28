

const Dashboard = () => {
    return (
        <>
            <div className="pl-5 w-full">
                <h1 className="text-2xl font-bold mb-5">Dashboard</h1>
                <div className="flex gap-2">
                    <div className="p-5 border-[1px] border-blue-200 rounded-2xl min-w-[300px] space-y-5">
                        <div className="flex flex-col items-center">
                            <h1 className="text-xl font-semibold">Piatti</h1>
                            <h1 className="text-lg">50</h1>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex flex-col items-center">
                                <h1>Disponibili</h1>
                                <h1>30</h1>
                            </div>

                            <div className="flex flex-col items-center">
                                <h1>Non disponibili</h1>
                                <h1>20</h1>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 border-[1px] border-blue-200 rounded-2xl min-w-[300px] space-y-5">
                        <div className="flex flex-col items-center">
                            <h1 className="text-xl font-semibold">Categorie</h1>
                            <h1 className="text-lg">5</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard