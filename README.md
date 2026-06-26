## How to Run This React Project On Local Machine

Step(1): Clone The Whole Directory
        
        git clone https://github.com/kartikeyofficial/shoefify-shoes-website.git

Step(2): open the Dedicated Terminal of that Directory

        npm install

Step(3): Install NodeMailer for Email Otp system

        npm install nodemailer
Step(4): Set up the Environment Variable Also (.env)

        MONGODB_URI="mongodb://localhost:27017/shoefify" // Only When Local Host But i Prefer Mongodb Atlas as Same Github account
        NODEMAILER_EMAIL="give Your Website Email For Otp System"
        NODEMAILER_PASSWORD=""  // It is generated whwen you Create the otp system via App Setting 16 digit password
        RAZORPAY_KEY_ID=""     // When You verify this website from razorpay the they gives you API key
        RAZORPAY_KEY_SECRET=""  // Secret API Razorpay Payment Key

Step(5): Run the React App

        npm run dev 

After That two host are provided:

  Local Host:
  
  Network: 

I Prefer to Choose Network Host
        
