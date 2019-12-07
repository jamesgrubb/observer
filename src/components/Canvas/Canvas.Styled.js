import styled from 'styled-components'
import PropTypes from 'prop-types'

export const StyledCanvas = styled.canvas`
background-color: #282728;
`
export const StyledCanvasContainer = styled.div`
grid-column: 2 / -1;
grid-row: 2 / -1;
background-color: #282728
`
StyledCanvas.propTypes = {
    canvasWidth: PropTypes.number.isRequired,
    canvasHeight: PropTypes.number.isRequired
}
