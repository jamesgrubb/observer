import React, { useEffect, useCallback, useRef } from 'react'
import {StyledCanvas, StyledCanvasContainer} from './Canvas.Styled'
import useResizeObserver from '../../hooks/useResizeObserver'
import { useSound } from '../../hooks/useSound'
import { scale } from '../../utils/scale'
import { clamp } from '../../utils/clamp'


const Canvas = () => {
    const track = useRef('https://res.cloudinary.com/makingthings/video/upload/v1568881368/mp3/go_for_landing.mp3')
    
    // The canvas
    const cnvRef = useRef()
    // requestAnimationFrame ID
    const rAF = useRef()
    // useSound animation data
    const [handlePlay, loaded, trackData ] = useSound(track.current) 
    console.log(trackData)
    // const animationData = useRef(data)
// useEffect(()=>{
//     const { width, height} = cnvRef.current
//     const context = cnvRef.current.getContext('2d')
//     const length = trackData.length
//     console.log(trackData)
//     trackData.forEach((v,i) => {
//        const x = scale(i, [0, length], [0, width])
//        const y = scale(v, [-1, 1], [0, height]) 
//        if( i === 0){
//            context.moveTo(x,y)
//        }else{
//            context.lineTo(x,y)
//        }
//     })
//     context.lineCap='round';
//     context.strokeStyle='white';
//     context.stroke()
    
    
// },[trackData])

    useEffect(() => {
        
        const { width, height} = cnvRef.current
        const context = cnvRef.current.getContext('2d')
    
        const loop = () => {           
            rAF.current = requestAnimationFrame(loop)
            const length = trackData.length
             console.log(trackData.length)
             context.clearRect(0, 0, width, height)
             context.beginPath();
    
            trackData.forEach((v,i) => {
                    const x = scale(i,[0,length],[0,width])
                    const barHeight = clamp(scale(v,[-100,0],[0,height]),0,height)
                    const opacity = scale(i,[0,length],[0,1])
                    context.fillRect(x, height/2 - barHeight/2, 2, barHeight)
                    context.fillStyle='#235df6';                
                    context.fill()
                    context.lineWidth = 1 + i
                    context.beginPath()
                    context.moveTo(x, height/2 - barHeight/2);
                    context.lineTo(x, barHeight - barHeight/2 );
                    context.strokeStyle=`hsla(224, 92%, 55%, ${opacity})`;
                    context.lineCap='round';
                    
                    context.stroke()
                    
                    
                    
                })
                    
                    
        }
        loop()
        return()=> cancelAnimationFrame(rAF.current)
          
    },[trackData])
    const [ref, {contentRect}] = useResizeObserver();
    const canvRef = useRef()
    const getContentRect = useCallback(( key ) => {
        return contentRect && Math.round(contentRect[key])
    }, [contentRect])
    console.log(canvRef.current)
 
 return (
<StyledCanvasContainer ref={ref}>
    <button disabled={!loaded} onClick = {handlePlay}>Play</button>
    <StyledCanvas ref={cnvRef} width={getContentRect('width')} height={300} />
</StyledCanvasContainer>)
}


export default Canvas