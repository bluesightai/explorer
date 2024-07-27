const FindButton = ({ handleFindSimilar, isLoading }: { handleFindSimilar: () => void; isLoading: boolean; }) => < button
    onClick={handleFindSimilar}
    className="carousel__container-button button"
    disabled={isLoading}
>

    {
        isLoading ? (
            <span> Loading...</span >
        ) : (
            <>
                <span>
                    <i className="fas fa-search"></i>
                </span>
                Find Similar
            </>
        )}
</button >
export default FindButton