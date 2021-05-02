import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { findCollectionById } from '../../assets/data/Images'
import { image, placeholder } from '../../assets/data/ImageDataStructure'
import ImageViewerTitle from './ImageViewerTitle'
import ImageViewerViewport from './ImageViewerViewport'

interface ImageViewerProps extends WithStyles<typeof styles>, React.PropsWithChildren<RouteComponentProps<any, any, unknown>> {
    source?: string
}

interface ImageViewerState {
    //collection: any
    index: number
    previousIndex: number
}

class ImageViewer extends React.Component<ImageViewerProps, ImageViewerState> {

    // componentDidMount = () => {
    //     // This will become an API call based on the collection ID
    //     this.setState({
    //         //collection: natureImages[0]
    //         index: 0
    //     })
    // }

    constructor(props: ImageViewerProps) {
        super(props)
        this.state = ({
            index: 0,
            previousIndex: 0,
        })
    }

    next = () => {
        const currentIndex = this.state.index
        const updatedIndex = this.state.index + 1;
        this.setState({
            previousIndex: currentIndex,
            index: updatedIndex
        })
    }

    previous = () => {
        const currentIndex = this.state.index
        const updatedIndex = this.state.index - 1;
        this.setState({
            previousIndex: currentIndex,
            index: updatedIndex
        })
    }

    render() {
        const { collectionId } = this.props.match.params
        const collection = findCollectionById(collectionId)
        const images = collection?.images

        const state = this.state
        const props = this.props
        const classes = this.props.classes

        const collectionLength = (collection?.images === undefined) ? 0 : collection.images.length
        const targetImage: image = (collection?.images === undefined) ? placeholder : collection?.images[state.index]
        return (

            <div className={classes.container}>
                <ImageViewerTitle
                    collectionTitle={collection?.title.toUpperCase() ?? ""}
                    imageTitle={(images === undefined) ? "" : images[this.state.index].title.toUpperCase() ?? ""}
                />
                <ImageViewerViewport
                    targetImage={(images === undefined) ? "" : images[this.state.index].url ?? ""}
                    previousImage={(images === undefined) ? "" : images[this.state.previousIndex].url ?? ""}

                    //collection={collection}
                    collectionLength={images?.length ?? 0}
                    index={this.state.index}
                    next={this.next}
                    previous={this.previous}
                />
            </div>
            // <div style={{background: 'red', height: '80vh', display: 'flex', justifyContent: 'center'}}>
            //     <img src={(images === undefined) ? placeholder.url : images[0]?.url} alt="none" style={{height: '100%'}} />
            // </div>
        )
    }
}

const styles = () =>
    createStyles({

        container: {
            //background: 'red',

            display: 'flex',
            flexDirection: 'column',

            justifyContent: 'center',
            alignContent: 'center',
        },
        title: {

        },


    })

export default withStyles(styles)(ImageViewer)
