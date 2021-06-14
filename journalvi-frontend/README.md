# Welcome to JournalVi!

The title is short for journal + view. JournalVi is a daily journaling app that uses Amazon Web Services (AWS) Comprehend to help user track and visualize their mood day to day.

AWS Comprehend (Comprehend) is Amazon's machine learning API for Natural Language Processing and sentiment detection and leverages Amazon's pre-trained machine learning models to analyze the sentiment in text.

# Goal

The goal of this project is to provide users with an additional perspective and view on their mental health. 

The app pairs sentiment detection with data visualization via a clear, color-coded system utilizing graph and chart plugins, as well as custom built interactive calendar features. 

This system enables users to discern trends over time in their mood, and gain additional insight into sentiments and emotions of which they might not have been actively aware.

# User Stories

In this app a user can:

* Create and delete journal entries for a particular date
* Sort and filter all their historical entries
* See color-coded summary data on a monthly and weekly basis

# Built With

* AWS Comprehend
* React JS
* Redux (with Thunk middleware)
* Bootstrap
* Plotly
* Ruby on Rails
* PostgreSQL

# Installation
This application includes a backend and a frontend in two separate repositories: 

Frontend: https://github.com/racross1/journalvi-frontend
Backend: https://github.com/racross1/journalvi-backend

To open and use this app you will need to install and launch the code in both repositories, and so instructions for both the backend and frontend are included here.


## Backend Installation
Fork, clone, and navigate into this repository. 

Navigate into the **journalvi** folder and then enter the following command
in your terminal:

    bundle install

This will install all necessary gems.  

## Frontend Installation
Fork, clone, and navigate into this repository. 

Navigate into the **journalvi-frontend** folder and then enter the following command in your terminal:

    npm install (or yarn install if you use yarn as your package manager)


# Starting the App

## Starting Backend
To start the backend server, make sure you are in the **journalvi** folder in the backend repository and then enter the following command in your terminal: 

    rails s

## Starting Frontend
To start the frontend, make sure you are in the **journalvi-frontend** folder in the frontend repository and then enter the following command in your terminal:

    npm start


# Using the App

## Logging In 
Once you have launched your backend server and frontend interface, you will see a login page in your browser. This page is password protected and uses JSON Web Tokens to validate user access.

Choose your login and username and enter them into the appropriate fields and then hit the login button.

You can also access the app with an example user which comes with seeded data and example scores. This user has a username and password of "bb".


## Creating a New Entry
To create a new entry, go to "Create New Entry" on the sidebar. Fill in responses to each of the three prompts (one prompt for the morning, one for the afternoon and one for the evening) and then hit submit. That's it!
     
## Scoring System
Once you submit your entry, AWS Comprehend will analyze the text and return its response. Each of your three prompt responses (morning, afternoon and evening) will be analyzed separately and will receive its own **sentiment score**
          
The sentiment score has 2 main parts:

* Comprehend's assessment of the predominate sentiment of the text.
* Comprehend's **confidence score** that the sentiment of the text is Positive, Negative, Neutral and Mixed.

We also provide an additional summary output called the **Aggregate Day Score**, which is calculated by taking averages across the morning, afternoon and evening sentiment scores for each entry. 
       
### Sentiment Score
The first part, Comprehend's assessment of the sentiment, is a single word response of "POSTIVE", "NEGATIVE", "NEUTRAL", or "MIXED".
         
The second part, the sentiment scores, is a little different. Comprehend will assign a confidence score to each of the 4 sentiments, regardless of whether or not they are the single word sentiment Comprehend believes the text to be.
      
For example, given the text *"Hey, that's pretty neat!"* Comprehend's actual score is as follows: 

* Overall sentiment assessed: 
    "POSITIVE"

* Individual sentiment confidence scores:
    Positive: 97.39%
    Negative: 0.09%
    Neutral: 24.82%
    Mixed: 0.03%

### Aggregate Day Score

In addition to the sentiment scores created by Comprehend for each prompt, we also provide an additional output called the **aggregate day score**. 

For the aggregate day score, we take the average of each sentiment across all 3 of your prompts (i.e. we add the positive sentiment score for morning, afternoon and evening prompts and divide the sum by 3 and we do the same for negative neutral and mixed). 

This gives us 4 averages (one for each of the 4 sentiments). We then take the highest of those 4 averages and assign it to your entry as the aggregate day score. This is meant to give a sense of the most predominant sentiment for a given day!

### Seeing Your Scores

To help you visualize Comprehend's results we've color coded each of the 4 sentiments as follows:

* Positive: Green
* Negative: Orange
* Neutral: Yellow
* Mixed: Purple

For each entry you'll see the color associated with the sentiment for each prompt. 

Also, the corresponding sentiment color, will be darker (higher opacity), the higher it is. For example, a sentiment score of "POSITIVE" with a confidence score for positive that is 99.9% will show up as a darker green than a sentiment score of "POSITIVE" that only has a 75.0% positive confidence score.
        
To see this in action, check out your All Entries list, or, go to your Dashboard to see the monthly and weekly breakdown of your sentiment scores. 
           
Happy journaling!