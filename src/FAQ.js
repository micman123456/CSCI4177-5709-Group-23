import React, { useState } from 'react';
import './FAQ.css'; // Import the FAQ.css file

const FAQ = () => {
  

  const faqData = [
    {
      question: 'What is TaskPro?',
      answer:
        'TaskPro is an assignment and task management tool designed for students. It helps you stay organized, keep track of tasks, due dates, and exam schedules.',
    },
    {
      question: 'How do I create an account on TaskPro?',
      answer:
        'To create an account on TaskPro, navigate to the registration page by clicking get started. Provide the required information, such as your name, email address, and password. Once registered, you can log in and start using TaskPro.',
    },
    {
      question: 'Can I use TaskPro on my mobile device?',
      answer:
        'Yes, TaskPro is designed to be responsive and accessible on various devices, including mobile phones and tablets. You can access TaskPro using your preferred web browser on your mobile device.',
    },
    {
      question: 'How can I add a new task to TaskPro?',
      answer:
        'To add a new task, log in to your TaskPro account and navigate to the task management section. Click on the "Add Task" button and fill in the necessary details, such as task name, due date, and any additional information.',
    },
    {
      question: 'Can I share tasks with other users?',
      answer:
        'Yes, TaskPro allows you to share tasks with other users. You can invite collaborators or group members to join your task and collaborate on assignments and projects together.',
    },
  ];

  
  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-list">
        
        {faqData.map((faq, index) => (
          <div className={'p-2'} key={index}>
            <br></br>
            <h3 className="question">{faq.question}</h3>
            <div className="answer">{faq.answer}</div>
            <br></br>
          </div>

        ))}
      </div>
    </div>
  );
};

export default FAQ;
