function StatusMessage({ isLoading, error, data}) {
    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <p>Data loaded successfully!</p>
            )}
        </div>
    );
}

export default StatusMessage;