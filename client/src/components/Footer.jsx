import React from 'react';
import { Container } from '@mui/material';
import "./Footer.css";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
  return (
    <Container>
    <div className='footer-container'>
       
    <div className='footer-content'>
       <div className='footer-content-about'>
         <div>
           <h3>About Tech Blogs</h3>
        </div>
        <div>
            Newsletters
        </div>
        <div>
            Sitemap
        </div>
        <div>
            Careers
        </div>

      </div>
      <div className='footer-content-policies'>
        <div>
        <h3>Policies</h3>
        </div>
        <div>
        Privacy Policy
        </div>
       <div>
          Terms of use
      </div>
      <div>
        Licensing
      </div>
      </div>
      <div className='footer-content-countries'>
        <div>
            <h3>Countries</h3>
        </div>
        <div>
            India
        </div>
        <div>
            USA
        </div>
        <div>
            Singapore
        </div>
        
    </div>
       
      </div> 
      <div className='footer-content-social-media'>
         <InstagramIcon/>
         <FacebookIcon/>
         <TwitterIcon/>
         <YouTubeIcon/>


       </div>
    </div>
    </Container>
  )
}

export default Footer
