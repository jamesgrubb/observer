import styled from 'styled-components'
import PropTypes from 'prop-types'

export const StyledCanvas = styled.canvas`
background-color: #235df6;
`
export const StyledCanvasContainer = styled.div`
grid-column: 2 / -1;
grid-row: 2 / -1;
background-color: #858fa3
`
StyledCanvas.propTypes = {
    canvasWidth: PropTypes.number.isRequired,
    canvasHeight: PropTypes.number.isRequired
}
