

const Banner = ({title}) => {
    return (
        <header className='bg-primary w-100 text-white text-center p-5'>
            <h1 className='display-6 fw-bold'>{title}</h1>
        </header>
        
    );
};

export default Banner;