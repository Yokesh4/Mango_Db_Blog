import React, { useState } from 'react';
import emailjs from 'emailjs-com'; // Import EmailJS
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    suggestion: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Use Email.js connection
    emailjs.send(
      'service_s7pv7mt', // Replace with your EmailJS service ID
      'template_p9zjj7q', // Replace with your EmailJS template ID
      {
        from_name: formData.name,  // Corresponds to {{from_name}} in your template
        to_name: 'Blog Author',    // Corresponds to {{to_name}} in your template
        message: formData.message, // Corresponds to {{message}} in your template
        suggestion: formData.suggestion, // Can add extra data like suggestion
        email: formData.email      // Add any other fields if needed
      },
      '3tWsyEsXchGkzQPrV' // Replace with your EmailJS user ID
    ).then((result) => {
        console.log('Message Sent:', result.text);
        alert('Message sent successfully!');
    }).catch((error) => {
        console.error('Failed to send message:', error.text);
        alert('Message failed to send. Please try again.');
    });

    // Clear form after submission
    setFormData({
      name: '',
      email: '',
      message: '',
      suggestion: ''
    });
  };

  return (
    <div className='contact-container'>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className='contact-form'>
        <label>
          Name:
          <input 
            type='text' 
            name='name' 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </label>
        <label>
          Email:
          <input 
            type='email' 
            name='email' 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </label>
        <label>
          Message:
          <textarea 
            name='message' 
            value={formData.message} 
            onChange={handleChange} 
            required 
            placeholder="Write your message here..." 
          />
        </label>
        <label>
          Suggest a Topic for the Next Blog:
          <textarea 
            name='suggestion' 
            value={formData.suggestion} 
            onChange={handleChange} 
            placeholder="Any suggestions for future topics?" 
          />
        </label>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Contact;
