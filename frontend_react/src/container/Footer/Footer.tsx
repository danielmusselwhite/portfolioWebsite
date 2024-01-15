import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';

import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';
import './Footer.scss';


const Footer = () => {

    // #region Logic to handle form submission
    const [formData, setFormData] = useState({ name: '', email: '', message: '' }); // formData is an object with name, email and message properties
    const [isFormSubmitted, setIsFormSubmitted] = useState(false); // isFormSubmitted is a boolean to check if the form is submitted
    const [loading, setLoading] = useState(false); // loading is a boolean to check if the form is loading
    const [emailError, setEmailError] = useState(false); // emailError is a boolean to check if the email is valid

    const { name, email, message } = formData; // destructuring the formData object to get name, email and message

    // handleChangeInput - which handles the change in the input fields and updates the formData object
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target; // destructuring the event target to get name and value
        setFormData({ ...formData, [name]: value }); // updating the formData object
    };

    // validateEmail - which validates the email field using regular expressions
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    };

    // handleSubmit - which handles the form submission
    const handleSubmit = () => {
        setLoading(true); // set loading to true

        // creating a contact object to be sent to sanity
        const contact = {
            _type: 'contact',
            name: formData.name,
            email: formData.email,
            message: formData.message,
        };

        // sending the contact object to sanity
        client.create(contact)
            .then(() => { // if the contact object is sent successfully, then set loading to false and isFormSubmitted to true
            setLoading(false);
            setIsFormSubmitted(true);
            })
            .catch((err) => console.log(err)); // catching and logging any errors
    };

    return (
        <>
            <h2 className="head-text">Reach Out And Chat!</h2>

            {/* Contact Cards */}
            <div className="app__footer-cards">
                <div className="app__footer-card ">
                    <img src={images.email} alt="email" />
                    <a href="mailto:danielmusselwhite@outlook.com+test" className="p-text">danielmusselwhite@outlook.com</a>
                </div>
                <div className="app__footer-card">
                    <img src={images.mobile} alt="phone" />
                    <a href="tel:+447907064241" className="p-text">07907 064 241</a>
                </div>
            </div>


            {/* Contact Form */}
            {
                // Ternary operator to check if the form is submitted or not
                !isFormSubmitted ? 
                    // If the form is not submitted, then render the form
                    (
                    <div className="app__footer-form app__flex">
                        <div className="app__flex">
                        <input className="p-text" type="text" placeholder="Your Name" name="name" value={name} onChange={handleChangeInput} />
                        </div>
                        <div className="app__flex">

                        <input className={`p-text ${emailError ? 'app__footer-invalid-email' : ''}`} 
                            type="email" 
                            placeholder="Your Email" 
                            name="email" 
                            data-tip 
                            data-for="email-tooltip" 
                            value={email} 
                            onChange={(e) => { // update the formData object and validate email when the input field is changed
                                handleChangeInput(e);
                            }}
                            onBlur={(e) => { // validate email when the input field is blurred (clicked out of)
                                validateEmail(e.target.value);
                            }} 
                        />
                        {/* Show ReactTooLTip saying invalid email if email is invalid */}
                        {emailError && <ReactTooltip className="app__footer-tooltip" id="email-tooltip" place="top" effect="solid" arrowColor='#915757'>Invalid email</ReactTooltip>}
                        </div>
                        <div>
                        <textarea
                            className="p-text"
                            placeholder="Your Message"
                            value={message}
                            name="message"
                            onChange={handleChangeInput}
                        />
                        </div>
                        <button type="button" 
                            className="p-text" 
                            onClick={handleSubmit} 
                            disabled={emailError || !name || !email || !message} /* disable button if either email is invalid or any fields are empty */
                            data-tip 
                            data-for="send-tooltip"
                        > 
                            {!loading ? 'Send Message' : 'Sending...' /* Show 'Send Message' if the form is not loading, else show 'Sending...' */ }
                        </button>
                        {/* If we cannot click button display a tooltip saying why */}
                        {(emailError || !name || !email || !message) && <ReactTooltip className="app__footer-tooltip" id="send-tooltip" place="top" effect="solid" arrowColor='#915757'>Cannot send please validate</ReactTooltip>}
                    </div>
                    ) 
                    
                : // If the form is submitted, then render the thank you message
                    (
                    <div>
                        <h3 className="head-text">
                        Thank you for getting in touch!
                        </h3>
                    </div>
                    )
            }
        </>
    );
};

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__primarybg',
);