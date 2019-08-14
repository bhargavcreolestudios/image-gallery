import React from 'react';
import { Grid, Image, Header, Container, Modal } from 'semantic-ui-react';
import Spinner from 'react-spinkit';
import leftArrow from '../assets/left-arrow.svg';
import rightArrow from '../assets/right-arrow.svg';
//interface for modal's props
interface ModalProps {
  modalOpen: boolean;
  modalLoader: boolean;
  imageData: {
    id: number;
    url: string;
    title: string;
  };
  dataLength: number;
  onModalClose: () => void;
  prev: (id: number) => void;
  next: (id: number) => void;
}
const ModalContainer: React.FC<ModalProps> = props => (
  <Modal
    open={props.modalOpen}
    basic
    size="small"
    onClose={() => props.onModalClose()}
    className="imageModal"
  >
    <Modal.Content>
      {/* modal loader */}
      {props.modalLoader && (
        <Spinner
          name="wordpress"
          className="dataLoader"
          style={{ position: 'absolute', top: '50%', left: '50%' }}
          fadeIn="none"
        />
      )}
      {/* for previous image */}
      {props.imageData.id !== 1 && (
        <Image
          src={leftArrow}
          onClick={() => props.prev(props.imageData.id)}
          className="prevArrow"
        />
      )}
      <Image src={props.imageData.url} className="mainImage" />
      <Header size="large" className="modalTitle">
        {props.imageData.title}
      </Header>
      {/* for next image */}
      {props.imageData.id !== props.dataLength && (
        <Image
          src={rightArrow}
          onClick={() => props.next(props.imageData.id)}
          className="nextArrow"
        />
      )}
    </Modal.Content>
  </Modal>
);

export default ModalContainer;
