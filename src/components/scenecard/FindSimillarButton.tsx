const FindButton = ({ handleFindSimilar, isLoading }: { handleFindSimilar: () => void; isLoading: boolean }) =>
  isLoading ? (
    <span className="slider-loading">Searching...</span>
  ) : (
    <button onClick={handleFindSimilar} className="find-similar-btn" disabled={isLoading}>
      <img src="./magnifing-glass.svg" alt="pin icon" className="find-similar-icon" />
      Find Similar
    </button>
  )
export default FindButton
