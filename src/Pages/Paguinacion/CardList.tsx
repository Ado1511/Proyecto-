import { useState } from 'react';
import Pagination from './Pagination'; // Asegúrate de que la ruta sea correcta

const MyCards = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalRecords = 100; // Cambia esto por el total de registros reales que tienes
    const pageLimit = 10; // Define cuántos registros quieres mostrar por página

    const handlePageChange = (data: { currentPage: number }) => {
        setCurrentPage(data.currentPage);
    };

    return (
        <div>
            {/* Renderiza tus tarjetas aquí utilizando currentPage y pageLimit */}
            <div>
                {/* Aquí podrías mapear tus datos para mostrar solo los de la página actual */}
                {/* Ejemplo: renderizar tarjetas basadas en el número de página actual */}
            </div>

            <Pagination
                totalRecords={totalRecords}
                pageLimit={pageLimit}
                currentPage={currentPage}
                onPageChanged={handlePageChange}
            />
        </div>
    );
};

export default MyCards;
