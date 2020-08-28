import React, { useState } from 'react'
import './style.css'
import Layout from '../layout'
import SEO from '../seo'
import { useEffect } from 'react'


function VideoPageTemplate(props) {
  const containerRef = React.useRef(null)
  const [size, setSize] = useState(getCurrentSize())

  function getCurrentSize() {
    console.log("get current size")
    
    if (!containerRef || !containerRef.current) return { width: 400, heigth: 400 }
    
    const width = (containerRef.current.clientWidth > 960 ? 960 : containerRef.current.clientWidth );

    return { width, height: width * 9 / 16 }
  }
  // function getCurrentSize() {
  //   if (typeof window === 'undefined') return { width: 400, heigth: 400 }

  //   const width = (window.innerWidth > 960 ? 960 : window.innerWidth) - 50;

  //   return { width, height: width * 9 / 16 }
  // }

  useEffect(() => {
    setSize(getCurrentSize());

    window.addEventListener('load', () => {
      setSize(getCurrentSize());
    })

    window.addEventListener('resize', () => {
      setSize(getCurrentSize());
    })

  }, [])

  const { title, description, video_url } = props.pathContext

  return (
    <React.Fragment>
      <SEO lang="en" title={title} description={description} />
      <Layout>
        <div className="video-page-container" ref={containerRef}>
          <iframe
            title={title}
            className="video"
            height={size.height + 'px'}
            width={size.width + 'px'}
            src={video_url}
            allow="autoplay; fullscreen"
            frameborder="0"
            allowfullscreen
          ></iframe>
          <div className="video-description">{description}</div>
        </div>
      </Layout>
    </React.Fragment>
  )

}

export default VideoPageTemplate
