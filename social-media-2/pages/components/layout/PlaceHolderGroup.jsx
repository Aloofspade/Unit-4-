import { range } from "lodash"
import { Placeholder } from "semantic-ui-react"



export const LikesPlaceHolder = () => range(1,6).map((item) => (
    <Placeholder key={item} style={{minWidth: "200px"}}>
        <Placeholder.Header image>
            <Placeholder.Line  length="full"/>
        </Placeholder.Header>
    </Placeholder>
))
