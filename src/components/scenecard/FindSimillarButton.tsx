const FindButton = ({ handleFindSimilar, isLoading }: { handleFindSimilar: () => void; isLoading: boolean; }) => isLoading ? <span className="slider-loading">Searching...</span> : < button
    onClick={handleFindSimilar}
    className="carousel__container-button button"
    disabled={isLoading}
>


    <>
        <span>
            <i className="fas fa-search"></i>
        </span>
        Find Similar
    </>
</button >
export default FindButton