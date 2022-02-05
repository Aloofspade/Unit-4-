import { Form, Header, Icon, Segment, Image } from "semantic-ui-react";


const ImageDropDiv = ({handleChange, inputRef, setHightlighed, highlighted, setMedia, setMediaPreview, media, mediaPreview}) => {
  return <>
    <Form.Field>
        <Segment placeholder basic secondary>
            <input type="file" accept="image/" onChange={handleChange}
            name="media" style={{display: "none"}} ref={inputRef}
            />
            <div 

             onClick={() => {
                    inputRef.current.click();
                }}
                style={{cursor: "pointer"}}
            onDragOver={(e) => {
                e.preventDefault()
                setHightlighed(true)

            }}
            onDragLeave={(e) => {
                e.preventDefault()
                setHightlighed(false)
            }}
            onDrop={(e) => {
                e.preventDefault()
                setHightlighed(true)
                // console.log(e.dataTransfer.files);

                const droppedFile = e.dataTransfer.files[0];
                setMediaPreview(URL.createObjectURL(droppedFile))
                setMedia(droppedFile);
            }}>

            {mediaPreview === null ? (


                <Segment basic placeholder
                style={{curser:"pointer"}}
               

                style={{ cursor: "pointer"}}
                {...(highlighted && {color: "green"})}
                >
                    <Header icon>
                        <Icon name="file image outline"  />

                        Drag n Drop or Click to upload
                    </Header>
                </Segment>
               ) : (
                <Segment placeholder basic color="green">
                    <Image 
                    src={mediaPreview}
                    size="large"
                    centered
                    style={{ cursor: "pointer"}}
                    
                    />
                </Segment>
                )} 
            </div>
        </Segment>
        
    </Form.Field>
  </>;
};

export default ImageDropDiv;
