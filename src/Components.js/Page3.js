import {Button} from 'antd';
import React, {useState} from 'react';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import Cropper from 'react-easy-crop';
import Dialog from 'react-modal';
import '../App.css';
import Header from './Header';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  word-wrap: break-word;
`;

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalContainer = styled(FlexCol)`
  padding: 0rem;
  align-items: center;
  justify-content: space-between;
`;

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user'
};

const customStyles = {
    content: {
        height: '500px',
        width: '900px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '0.25rem',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)'
    }
};

function Page3() {
    const webcamRef = React.useRef(null);
    const [image, setImage] = useState(null);
    const [cropModal, setCropModal] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [croppedArea, setCroppedAreaPixel] = useState({});
    const [crop, setCrop] = useState({
        x: 0,
        y: 0
    });

    const capture = React.useCallback(
        () => {
            const croppedImage = webcamRef.current.getScreenshot();
            setImage(croppedImage);
            setCropModal(true);
        },
        [webcamRef]
    );

    const onCropComplete = (_, croppedAreaPixels) => {
        setCroppedAreaPixel(croppedAreaPixels);
    };

    const setCroppedImage = async () => {
        if (image) {
            const croppedImage = await getCroppedImg(image, croppedArea);
            setImage(croppedImage);
            setCropModal(false);
        }
    };

    return (
        <div className='App'>
            <Header/>
            <Container>
                <Webcam
                    audio={false}
                    height={360}
                    ref={webcamRef}
                    screenshotFormat='image/jpeg'
                    width={420}
                    videoConstraints={videoConstraints}
                />
            </Container>

            <Container>
                <Button
                    onClick={capture}
                    type='primary'
                >
                    Capture photo
                </Button>
            </Container>

            <br/>
            <Dialog
                ariaHideApp={false}
                isOpen={cropModal}
                style={customStyles}
                onRequestClose={() => setCropModal(false)}
            >
                <ModalContainer>
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={4 / 3}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                    />
                    <Button
                        onClick={setCroppedImage}
                        type='primary'
                    >
                        Crop Photo
                    </Button>
                </ModalContainer>
            </Dialog>
            <Container>
                <div style={{height: 360, width: 420}}>
                    <img
                        style={{
                            marginTop: 40
                        }}
                        src={image}
                    />
                </div>
            </Container>
            <br/>
        </div>
    );
}

const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = url;
    });

const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    canvas.width = safeArea;
    canvas.height = safeArea;

    ctx.drawImage(
        image,
        (safeArea / 2) - (image.width * 0.5),
        (safeArea / 2) - (image.height * 0.5)
    );
    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.putImageData(
        data,
        Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
        Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
    );

    return new Promise((resolve) => {
        canvas.toBlob((file) => {
            resolve(URL.createObjectURL(file));
        }, 'image/jpeg');
    });
};

export default Page3;
