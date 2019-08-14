//basic package importing
import React from 'react';
import axios from 'axios';
import Spinner from 'react-spinkit';
import { Image } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroll-component';
//component importing
import Header from '../components/Header';
import ModalContainer from '../components/ModalContainer';
//interface declaration for state
interface State {
  loading: boolean;
  imageData: { id: number; title: string; thumbnailUrl: string; url: string }[];
  modalOpen: boolean;
  image: { id: number; url: string; title: string };
  modalLoader: boolean;
  start: number;
  limit: number;
  dataLoader: boolean;
}
class ImageGrid extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    //all state initialization
    this.state = {
      loading: false,
      imageData: [],
      modalOpen: false,
      modalLoader: false,
      image: {
        id: 0,
        url: '',
        title: '',
      },
      start: 0,
      limit: 48,
      dataLoader: false,
    };
  }
  componentDidUpdate = (prevProps: {}, prevState: { modalOpen: boolean }) => {
    if (this.state.modalOpen !== prevState.modalOpen) {
      setTimeout(() => {
        this.setState({ modalLoader: false });
      }, 500);
    }
  };
  componentDidMount = () => {
    this.getData();
  };
  // get whole data by limit and offset
  getData = async () => {
    try {
      const { start, limit } = this.state;
      let imageURL = `https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`; //data fetch url
      this.setState({ loading: true });
      const response = await axios.get(imageURL);
      if (response.status === 200) {
        this.setState({
          loading: false,
          imageData: this.state.imageData.concat(response.data), //concat for load more
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  // render perticular image in modal
  handleClick = async (
    data: { id: number; url: string; title: string },
    from: string
  ) => {
    this.setState({ modalOpen: true, image: data });
    if (from === 'prev' || from === 'next') {
      this.setState({ modalLoader: false });
    } else {
      this.setState({ modalLoader: true });
    }
  };
  // on page scroll fetch more data
  fetchMoreData = () => {
    this.setState({
      start: this.state.limit,
      limit: this.state.limit + 48,
      dataLoader: true,
    });
    this.getData(); // get that more data by changing offset and limit
  };
  // for modal close event
  onModalClose = () => {
    this.setState({ modalOpen: false, modalLoader: false });
  };
  // render previous image
  prev = (id: number) => {
    const { imageData } = this.state;
    let imageId = id - 1;
    let data = imageData.filter(data => data.id == imageId);
    if (data.length > 0) {
      this.handleClick(data[0], 'prev');
    }
  };
  // render next image
  next = (id: number) => {
    const { imageData } = this.state;
    let imageId = id + 1;
    let data = imageData.filter(data => data.id == imageId);
    if (imageData.length >= imageId) {
      this.handleClick(data[0], 'next');
    }
  };
  render() {
    const {
      loading,
      imageData,
      modalOpen,
      image,
      modalLoader,
      dataLoader,
    } = this.state;
    return (
      <div>
        {/* Header of the page */}
        <Header loading={loading} />

        {/* Image grid with infinite scroll */}
        <div className="App">
          <InfiniteScroll
            dataLength={imageData.length}
            next={this.fetchMoreData}
            hasMore={true}
            loader={dataLoader && <Spinner name="wordpress" fadeIn="none" />}
          >
            {imageData.map((data, index) => (
              <div
                key={index}
                className="App__imageWrapper"
                onClick={() => this.handleClick(data, '')}
              >
                <Image src={data.thumbnailUrl} rounded className="image" />
                <span>{data.title}</span>
              </div>
            ))}
          </InfiniteScroll>
        </div>

        {/* Modal for perticular image */}
        <ModalContainer
          modalOpen={modalOpen}
          modalLoader={modalLoader}
          dataLength={imageData.length}
          imageData={image}
          onModalClose={this.onModalClose}
          prev={this.prev}
          next={this.next}
        />
      </div>
    );
  }
}

export default ImageGrid;
