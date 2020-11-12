const UnsplashImage = ({ url, key }) => (
    <div className="image-item" key={key} >
      <img src={url} />
    </div>
  );
  
  let Project = () => {
    const [images, setImages] = React.useState([]);
    const [loaded, setIsLoaded] = React.useState(false);
  
    React.useEffect(() => {
      fetchImages();
    }, []);
  
    const fetchImages = (count = 10) => {
      const apiRoot = "https://api.unsplash.com";
      const accessKey =
        "fK6qac1qNUXP6Bx2hBX1d38q9750NYY0dJ545vtLHfk"; //api key
  
      axios
        .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`)
        .then(res => {
          setImages([...images, ...res.data]);
          setIsLoaded(true);
  
          console.log(images);
        });
    };
  
    return (
      <div className="hero is-fullheight is-bold is-info">
        <div className="hero-body">
          <div className="container">
            <div className="header content">
              <h2 className="subtitle is-6">Made by- Prajjwal Mishra</h2>
              <h1 className="title is-1">
                 Photo Feed App
              </h1>
            </div>
  
            <InfiniteScroll
              dataLength={images}
              next={() => fetchImages(5)}
              hasMore={true}
              loader={
                <img
                  src="https://media.giphy.com/media/TvLuZ00OIADoQ/giphy.gif"
                  alt="loading"
                />
              }
            >
              <div className="image-grid" style={{ marginTop: "30px" }}>
                {loaded
                  ? images.map((image, index) => (
                      <UnsplashImage
                        url={image.urls.regular}
                        key={index}
                      />
                    ))
                  : ""}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    );
  };
  
  ReactDOM.render(<Project />, document.getElementById("root"));
  