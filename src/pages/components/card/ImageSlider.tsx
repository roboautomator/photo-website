import { createStyles, withStyles, WithStyles } from '@material-ui/core'
import React from 'react'
import CollectionCardHome from './HomeCollectionCard'
import CollectionCardGallery from './GalleryCollectionCard'
import Arrow from './Arrow'
import Underscore from 'underscore'
import ImageSliderButtonWrapper from './ImageSliderButtonWrapper'

interface ImageSliderProps extends WithStyles<typeof styles> {
    data: {
        url: string
        title: string
        tagTitle?: string | undefined
        tagColour?: string | undefined
        index: number
    }[]
    startingIndex?: number
    mode: "Home" | "Gallery"
    height: number

}

class ImageSlider extends React.Component<ImageSliderProps, any> {
    constructor(props: ImageSliderProps) {
        super(props)
        this.handleWheelMovement = Underscore.debounce(
            this.handleWheelMovement,
            30,
            true
        )

        this.state = {
            selected: this.props.startingIndex ? this.props.startingIndex : 0,
            properties: this.props.data,
            property: this.props.data[
                this.props.startingIndex ? this.props.startingIndex : 0
            ],
        }
    }

    next = () => {
        if (this.state.property.index === this.state.properties.length - 1)
            return
        const newIndex = this.state.property.index + 1
        this.setState({
            property: this.state.properties[newIndex],
            selected: newIndex,
        })
    }

    previous = () => {
        if (this.state.property.index === 0) return
        const newIndex = this.state.property.index - 1
        this.setState({
            property: this.state.properties[newIndex],
            selected: newIndex,
        })
    }

    handleWheelMovement = (e: React.WheelEvent<HTMLDivElement>) => {
        let movement = e.deltaX ? e.deltaX : e.deltaY
        if (movement > 0) {
            this.next()
        } else {
            this.previous()
        }
    }

    render() {
        const classes = this.props.classes
        const { properties, property } = this.state

        console.log(property.index * (85 / properties.length))

        return (
            <div
                data-testid="ImageSlider-Container"
                className={classes.container}>
                <ImageSliderButtonWrapper
                    mode={this.props.mode}
                    index={property.index}
                    length={properties.length}
                    next={this.next}
                    previous={this.previous}
                />
                <div
                    data-testid="ImageSlider-Card-Slider"
                    className={classes.card_slider}
                    style={{ height: `${this.props.height}px` }}
                    onWheel={(e) => {
                        this.handleWheelMovement(e)
                    }}>
                    <div
                        className={classes.card_slider_wrapper}
                        style={{
                            transform: `translateX(-${property.index * (((this.props.mode === "Gallery") ? 90.6 : 100) / properties.length)
                                }%)`,
                        }}>
                        {properties.map(
                            (property: {
                                key: string
                                url: string
                                title: string
                                tagTitle: string
                                tagColour: string
                                index: number
                            }) => (
                                (this.props.mode === "Home") ?
                                    <CollectionCardHome
                                        key={property.key}
                                        coverSrc={property.url}
                                        title={property.title}
                                        selected={
                                            this.state.selected === property.index
                                        }
                                        tagTitle={property.tagTitle}
                                        tagColour={property.tagColour}
                                    />
                                    :
                                    <CollectionCardGallery
                                        key={property.key}
                                        coverSrc={property.url}
                                        title={property.title}
                                        selected={
                                            this.state.selected - property.index
                                        }
                                        tagTitle={property.tagTitle}
                                        tagColour={property.tagColour}
                                        height={this.props.height}
                                    />
                            )
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

const styles = () =>
    createStyles({
        container: {
            pointerEvents: 'auto',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            overflowX: 'hidden',
        },
        card_slider: {
            pointerEvents: 'auto',
            position: 'relative',
            maxWidth: '370px',
            width: '370px',
        },
        card_slider_wrapper: {
            pointerEvents: 'auto',
            display: 'flex',
            position: 'absolute',
            margin: '10px',
            transition: '300ms cubic-bezier(0.455, 0.03, 0.515, 0.955)',
        },
    })

export default withStyles(styles)(ImageSlider)
