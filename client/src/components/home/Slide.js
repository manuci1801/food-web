import React from 'react'
import { Carousel } from 'antd'

const Slide = () => {
  return (
    <>
      <Carousel autoplay>
        <div>
          <img className='slide-img' src='https://res.cloudinary.com/grohealth/image/upload/c_fill,f_auto,fl_lossy,h_650,q_auto,w_1085,x_0,y_0/v1583843120/DCUK/Content/Surprisingly-High-Carb-Food.png' />
        </div>
        <div>
          <img className='slide-img' src='https://kfcvietnam.com.vn/uploads/banner/7185c7da5835e592c4b86cdd4725c171.png' />
        </div>
        <div>
          <img className='slide-img' src='https://kfcvietnam.com.vn/uploads/banner/7185c7da5835e592c4b86cdd4725c171.png' />
        </div>
        <div>
          <img className='slide-img' src='https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/foodnavigator.com/article/2020/04/22/coronavirus-and-obesity-doctors-take-aim-at-food-industry-over-poor-diets/10933380-3-eng-GB/Coronavirus-and-obesity-Doctors-take-aim-at-food-industry-over-poor-diets_wrbm_large.jpg' />
        </div>
      </Carousel>
    </>
  )
}

export default Slide
