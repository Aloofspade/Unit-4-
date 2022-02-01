import { Form, Header, Icon, Segment } from "semantic-ui-react";


const ImageDropDiv = ({handleChange, inputRef, setHightlighed, highlighted, setMedia, setMediaPreview, media, mediaPreview}) => {
  return <>
    <Form.Field>
        <Segment placeholder basic secondary>
            <input type="file" accept="image/" onChange={handleChange}
            name="media" style={{display: "none"}} ref={inputRef}
            />
            <div 
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
                console.log(e.dataTransfer.files);
            }}>
                <Segment basic placeholder
                style={{curser:"pointer"}}
                onClick={() => {
                    inputRef.current.click();
                }}
                >
                    <Header icon>
                        <Icon name="file image outline"  />

                        Drag n Drop or Click to upload
                    </Header>
                </Segment>
            </div>
        </Segment>
    </Form.Field>
  </>;
};

export default ImageDropDiv;
