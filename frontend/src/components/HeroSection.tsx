import React from 'react';

function HeroSection() {
  return (
    <div className='bg-slate-900 flex flex-col items-center text-center px-4 py-16'>
      <div className='text-6xl text-white'>
        Collect and embed video <br />
        testimonials in minutes
      </div>
      <div className='text-slate-500 text-lg py-8'>
        Testimonial helps your agency boost conversions on your clients'<br />
        websites with social proof. Collect and embed video testimonials <br />
        in record time like this 👉
      </div>
      <button className='text-white bg-blue-600 h-11 w-40'>TRY IT NOW</button>
      <div className='text-slate-600 mt-1'>7 days free trial, get started today!</div>
      <div className='mt-11 bg-white text-slate-600 font-semibold text-xl px-3 rounded-xl'>
        Once we added Testimonial, it unlocked so much <br />
        more conversion for us!
      </div>
      <div className="w-1/2 rounded-lg shadow-md">
        <video
          className="w-full rounded-md"
          controls
          src="/1.testimony.mp4"
          poster="/1.testimony.png"
        >
          Your browser does not support the video tag.
        </video>
        <hr className="h-[2px] mt-16  bg-white border-0" />
      </div>


        <div className='text-blue-600 mt-14'>OPPORTUNITIES FOR YOU</div>
        <div className='text-white text-6xl font-bold'>Offer a unique, dynamic service</div>
        <div className='text-slate-400 mt-4 text-xl'>Your clients need testimonials to drice more conversions for their buisness.</div>
        <div className='text-slate-600 mt-1 text-xl'>They understand the value of the social proof.Helping them collect, manage embed <br />
         testimonials is a no-brainer service they are eager to have!
        </div>

        <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col sm:flex-row md:flex-col lg:flex-row justify-between gap-8'>
        
        <div className='flex-1 bg-gray-700 p-6 rounded-lg shadow-md sm:text-center md:text-left'>
          <h6 className='text-xl font-semibold text-white'>Easy Upsell</h6>
          <div className=' mt-1 text-slate-900'>
            Your clients know getting testimonials is crucial for their business. It's your job to help them get more!
          </div>
        </div>
        
        <div className='flex-1 bg-gray-700 p-6 rounded-lg shadow-md sm:text-center md:text-left'>
          <h6 className='text-xl font-semibold text-white'>Simple Process</h6>
          <div className=' mt-1 text-slate-900'>
            Collect and embed video testimonials in record time to boost conversions effortlessly.
          </div>
        </div>

        <div className='flex-1 bg-gray-700 p-6 rounded-lg shadow-md sm:text-center md:text-left'>
          <h6 className='text-xl font-semibold text-white'>Maximize Engagement</h6>
          <div className=' mt-1 text-slate-900'>
            Testimonials provide social proof and enhance trust, increasing customer engagement and sales.
          </div>
        </div>

      </div>
      <hr className='h-px mt-16 bg-gray-300 border-0' />
    </div>

    
    </div>
  );
}

export default HeroSection;
