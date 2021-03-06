import Link from "next/link";

const Movie = ({ movie }) => {
  const maxTextLength = 150;
  const shortenText = (text) => {
    if (text && text.length > maxTextLength) {
      return text.substr(0, maxTextLength) + "...";
    }
    return text.substr(0, maxTextLength);
  };

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card h-100">
        <a href="#">
          <img className="card-img-top" src={movie.image} alt={movie.title} />
        </a>
        <div className="card-body">
          <h4 className="card-title">
            <Link href={`/movies/${movie.id}`}>
              <a>{movie.name}</a>
            </Link>
          </h4>
          <div className="movie-genre">{movie.genres.map((g) => g + " ")}</div>
          <h5>{movie.releaseYear}</h5>
          <p className="card-text">{shortenText(movie.description)}</p>
        </div>
        <div className="card-footer">
          <small className="text-muted">{movie.rating}</small>
        </div>
      </div>
    </div>
  );
};

export default Movie;
