## How to Run This React Project On Local Machine

Step(1): Clone The Whole Directory
        
        git clone https://github.com/kartikeyofficial/shoefify-shoes-website.git

Step(2): open the Dedicated Terminal of that Directory

        npm install

Step(3): Install Nodemailer for Send OTP on Email for Authentication.

        npm install nodemailer

Step(4): Set up The Environment Variable of the Project.

        MONGODB_URI="mongodb://localhost:27017/shoefify"  //Only for localhost but i prefer use mongoDB Atalas and use their API key
        NODEMAILER_EMAIL=""   // give the email for Sending Otp
        NODEMAILER_PASSWORD="" # Generate this from Google Account Security -> App Passwords
        RAZORPAY_KEY_ID=""      // Create a account on Razorpay and verify your website and generate keys.
        RAZORPAY_KEY_SECRET=""
        

Step(3): Run the React App

        npm run dev 

After That two host are provided:

  Local Host:
  
  Network: 

I Prefer to Choose Network Host
        
