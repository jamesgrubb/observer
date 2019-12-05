import { useState } from 'react'

export const useScale =  (inputY, yRange, xRange) => {
    const [scale, setScale] = useState(0);
    const [xMin, xMax] = xRange;
    const [yMin, yMax] = yRange;
    const percent = (inputY - yMin) / (yMax - yMin)
    setScale( percent * (xMax - xMin) + xMin)
return [scale]
}

