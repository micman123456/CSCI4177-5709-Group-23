import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import "../styles/Dash.css";
import NavbarLoggedIn from '../components/NavbarLoggedIn';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Modal from '../components/AddTaskModal';

const Dashboard = () => {
  if(!localStorage.getItem('token')){
    window.location.href = '/logout';
  }
  else{
    console.log(localStorage.getItem('token'));
  }

  const [userId, setUserId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserId(token);
    } else {
      // Redirect to the logout page if the token is missing
      window.location.href = '/logout';
    }
  }, []);

  const fetchUserId = (token) => {
    axios.post('/.netlify/functions/server/decodeToken', { token })
      .then((response) => {
        setUserId(response.data.userId);
        localStorage.setItem('userID', response.data.userId);
      })
      .catch((error) => {
        console.error('Error decoding token:', error);
        window.location.href = '/logout';
      });
  };

  useEffect(() => {
    const userId = localStorage.getItem('userID');
    if (userId) {
      fetchTasks(userId);
    }
  }, [userId]);

  const fetchTasks = (userId) => {
    axios.get(`/.netlify/functions/tasks/?userId=${userId}`)
      .then((response) => {
        setTasks(response.data);
        setIsLoading(false); // Set loading to false when data is available
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
        setIsLoading(false); // Set loading to false on error as well
      });
  };
  

  const renderTasks = () =>{
    
      // Get the user's id from the JWT or session (replace 'YOUR_USER_ID' with the actual user id)
      const userId = localStorage.getItem('userID');
      console.log(localStorage.getItem('userID'));
  
      // Send a request to the backend to fetch tasks based on the user's id
      axios.get(`/.netlify/functions/tasks/?userId=${userId}`)

      
        .then((response) => {
          console.log('Fetched tasks: ', response.data); // Log the fetched data
          // Update the tasks state with the retrieved tasks
          setTasks(response.data);
        })
        .catch((error) => {
          console.error('Error fetching tasks: ', error);
          // Handle the error, display an error message, etc.
        });

  }

  

  
  const [daysContent, setDaysContent] = useState('');
  const [currentDateContent, setCurrentDateContent] = useState('');
  const currentDate = new Date();
  
  const [month, setMonth] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());

  useEffect(() => {
    renderCalendar();
  }, [month, year]);

  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  const renderCalendar = () => {
    let firstDayofMonth = new Date(year, month, 1).getDay();
    let lastDateofMonth = new Date(year, month + 1, 0).getDate();
    let lastDayofMonth = new Date(year, month, lastDateofMonth).getDay();
    let lastDateofLastMonth = new Date(year, month, 0).getDate();
    let liTags = [];

    let day = new Date();

    for (let i = firstDayofMonth; i > 0; i--) {
      liTags.push(<li className='inactive'>{lastDateofLastMonth - i + 1}</li>);
    }
     
    for (let i = 1; i <= lastDateofMonth; i++) {
      if (i === day.getDate() && month === new Date().getMonth()){liTags.push(<li className='active'>{i}</li>);}
      else{liTags.push(<li>{i}</li>);}
    }

    for (let i = lastDayofMonth; i < 6; i++) {
      liTags.push(<li className='inactive'>{i - lastDayofMonth + 1}</li>);
    }

    setDaysContent(liTags);
    setCurrentDateContent(`${months[month]} ${year}`);
  };

  const handlePreviousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };



  const formatTime = (timeDifference,weekInMs,dayInMs) => {
    if (timeDifference >= weekInMs) {
      const weeks = Math.floor(timeDifference / weekInMs);
      return weeks === 1 ? `${weeks} week` : `${weeks} weeks`;
    } else if (timeDifference >= dayInMs) {
      const days = Math.floor(timeDifference / dayInMs);
      return days === 1 ? `${days} day` : `${days} days`;
    } else if (timeDifference >= 0) {
      
      return timeDifference < dayInMs ? 'today' : 'tomorrow';
    } else {
      
      return 'past due';
    }
  }


  const [upcomingTasks, setupcomingTasks] = useState('');

  useEffect(() => {
    renderUpcoming();
  }, [tasks]);


  const renderUpcoming = () => {
     
    let taskListElements = [];
    tasks.slice(0, Math.min(tasks.length, 7)).map((task, index) => {
      const dueDate = new Date(task.Due);
      const today = new Date();
      const timeDifference = dueDate.getTime() - today.getTime(); // Time difference in milliseconds
      const oneDayInMs = 24 * 60 * 60 * 1000;
      const oneWeekInMs = 7 * oneDayInMs;

      const due = formatTime(timeDifference,oneWeekInMs,oneDayInMs);

      if (task.Completed == 'No'){
      
      if (due == 'today' || due == 'past due'){
        taskListElements.push(<span key={index} href="#" className="list-group-item list-group-item-action flex-column align-items-start" style={{background:'#dc39127a'}}>
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{task.TaskName} - <small>{task.TaskType}</small></h5>
          <small style={{color:'red'}}>Due: {due} <button onClick={() => removeTask(task.TASKID,index)} style={{color:'red', borderStyle:'none', background:'none'}}>&#x00d7;</button></small>
        </div>
        <p className="mb-1">Class: {task.TaskClass}</p>
        {}
      </span>
      )}
      else{
        taskListElements.push(<span key={index} href="#" className="list-group-item list-group-item-action flex-column align-items-start" style={{background:'#dc39127a'}}>
        <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{task.TaskName} - <small>{task.TaskType}</small></h5>
          <small>Due: {due}<button onClick={() => removeTask(task.TASKID,index)} style={{color:'red', borderStyle:'none', background:'none'}}>&#x00d7;</button></small>
        </div>
        <p className="mb-1">Class: {task.TaskClass}</p>
        {}
      </span>
      )}
      
    }
    else{
      if (true){
        taskListElements.push(<span key={index} href="#" className="list-group-item list-group-item-action flex-column align-items-start" style={{background:'#1953c661'}}>
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{task.TaskName} - <small>{task.TaskType}</small></h5>
          <small style={{color:'green'}}>Completed! <button onClick={() => removeTask(task.TASKID,index)} style={{color:'red', borderStyle:'none', background:'none'}}>&#x00d7;</button></small>
        </div>
        <p className="mb-1">Class: {task.TaskClass}</p>
        {}
      </span>
      )}
    }
    

  });
    
    setupcomingTasks(taskListElements);
    
  };

  const getCompleted = () => {
    let completed = 0;
    tasks.slice(0,tasks.length).map((task, index) => {
    if (task.Completed == 'Yes'){completed++;}
  })
  return Math.round(100*(completed/tasks.length));
  }

  const [error, setError] = useState('');
  const removeTask = async (key,index) => {
    const taskIDtoRemove = key;
  
    try {
      const response = await axios.delete('/.netlify/functions/server/removeTask', { data: { taskID: taskIDtoRemove } });
      if (response.data.success) {
        for (let i = 0; i < tasks.length; i++){
          if (tasks[i].TASKID == key){
              setTasks(tasks.filter((task) => task.TASKID !== taskIDtoRemove));
              renderUpcoming();
              break;
          }
        }

      } else {
        setError(response.data.message);
        console.log("error!")
      }
    } catch (error) {
      setError('An error occurred');
    }
    
  };
  
  const countTaskTypes = (tasks) => {
    // Initialize counts for each task type
    let quizTestCount = 0;
    let assignmentLabCount = 0;
    let readingWritingCount = 0;
    let otherMiscCount = 0;
  
    // Loop through the tasks array and count the tasks for each type
    tasks.forEach((task) => {
      switch (task.TaskType) {
        case 'Quizzes/Tests':
          quizTestCount++;
          break;
        case 'Assignments/Labs':
          assignmentLabCount++;
          break;
        case 'Readings/Writings':
          readingWritingCount++;
          break;
        case 'Other/Misc':
          otherMiscCount++;
          break;
        default:
          break;
      }
    });
  
    // Return an object containing the counts for each task type
    return {
      'Quizzes/Tests': quizTestCount,
      'Assignments/Labs': assignmentLabCount,
      'Readings/Writings': readingWritingCount,
      'Other/Misc': otherMiscCount,
    };
  };

  const taskTypeCounts = countTaskTypes(tasks);
  
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    console.log('clicked');
    console.log(showModal);
    setShowModal((prevState) => !prevState);
    
  };

  const [taskName, setTaskName] = useState('');
  const [taskClass, setTaskClass] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [taskType, setTaskType] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  console.log(taskName + ' ' + taskClass + ' ' + taskType + ' ' + dueDate );
  const completed = 'No';
  const userID = localStorage.getItem('userID');
  try {
    const response = await axios.post('/.netlify/functions/server/addTask', {userID,taskName,taskClass,dueDate,taskType,completed});
    
    if (response.data.success) {
      renderTasks();
      renderUpcoming();

    } else {
      console.log(response.data.message);
    }
  } catch (error) {
    console.log("Error");
  }
    
    
    toggleModal();
  };

  return (
    
    <>
      
    <NavbarLoggedIn/>
      <div className="dash-container">
      <Modal show={showModal} onClose={toggleModal} onSubmit={handleSubmit}>
          {/* Form for task parameters */}
          <form>
            <div className="form-group">
              <label htmlFor="taskName">Task Name</label>
              <input
                type="text"
                className="form-control"
                id="taskName"
                style={{border:'1px solid #8b8b8b'}}
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="taskType">Task Type</label>
              <select class="form-select" value={taskType} id="taskType" style={{border:'1px solid #8b8b8b'}} onChange={(e) => setTaskType(e.target.value)}>
                <option selected>Choose...</option>
                <option value='Quizzes/Tests'>Quizzes/Tests</option>
                <option value='Assignments/Labs'>Assignments/Labs</option>
                <option value='Readings/Writings'>Readings/Writings</option>
                <option value='Other/Misc'>Other/Misc</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="taskClass">Task Class</label>
              <input
                type="text"
                className="form-control"
                id="taskClass"
                style={{border:'1px solid #8b8b8b'}}
                value={taskClass}
                onChange={(e) => setTaskClass(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dueDate">Due Date</label>
              <input
                type="date"
                className="form-control"
                id="dueDate"
                style={{border:'1px solid #8b8b8b'}}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            {/* Add more form inputs for other parameters if needed */}
          </form>
        </Modal>
      
      
        <div className='container' style={{marginTop:'15px'}}>
          <div className='row'>
          
          <div className='col-md-5'>
              <div className='row'>
              <div className='calender'>
            
            <header>
              <div className='month'>

              
              <p className="current-date" style={{marginLeft:'-20px'}}>{currentDateContent}</p>
              </div>
              <div className="icons">
                <span id="prev" className="material-symbols-rounded" onClick={handlePreviousMonth}>-</span>
                <span id="next" className="material-symbols-rounded" onClick={handleNextMonth}>+</span>
              </div>
            </header>
            <div className="calendar">
              <ul className="weeks" style={{paddingLeft:"1px"}}>
                <li>Sun</li>
                <li>Mon</li>
                <li>Tue</li>
                <li>Wed</li>
                <li>Thu</li>
                <li>Fri</li>
                <li>Sat</li>
              </ul>
              <ul className="days">
                {daysContent}
              </ul>
            </div>
          </div>

              </div>
              <div className='row'>
              <Chart
                
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Task', 'Hours per Day'],
                  ['Completed', getCompleted()],
                  ['Pending', (100-getCompleted())],
                ]}
                options={{
                  title: 'Task Completion',
                  pieHole: 0.4,
                }}
                rootProps={{ 'data-testid': '1' }}
              />
              </div>
              
              
            </div>
          
          <div className='col-md-7'>
          <div className="card card-dash">
            <div className='upcoming' style={{color:'#242d37', marginLeft:'10px', display:'flex', justifyContent:'space-between'}}>
              <h4>Here's a list of your upcoming tasks:</h4>
              <button onClick={toggleModal}style={{border:'none', marginRight:'15px'}}>Add task &#9998;</button>
              
            </div>
            <div className="list-group" style={{marginLeft:'5px',width:'98%'}}>
              {upcomingTasks}
            </div>
        </div>
        
        </div>
          

          </div>
          <div className="">
            <div className="row">
              <div className="col-md-3 grid-margin">
                <div className="card card-footer">
                  <div className="card-body">
                    <div className="d-flex flex-row p-3">
                      <div className="align-self-top">
                        <p className="card-title mb-1 font-weight-bold">Quizzes/Tests</p>
                        <h3 className="mb-0">{taskTypeCounts['Quizzes/Tests']}</h3> 
                      </div>
                      <div className="align-self-center flex-grow text-end">
                        <i className="icon-lg mdi mdi-chart-pie text-primary"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 grid-margin">
                <div className="card card-footer">
                  <div className="card-body">
                    <div className="d-flex flex-row p-3">
                      <div className="align-self-top">
                        <p className="card-title mb-1 font-weight-bold">Assignments/Labs</p>
                        <h3 className="mb-0">{taskTypeCounts['Assignments/Labs']}</h3>
                      </div>
                      <div className="align-self-center flex-grow text-end">
                        <i className="icon-lg mdi mdi-cash-multiple text-warning"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 grid-margin">
                <div className="card card-footer">
                  <div className="card-body">
                    <div className="d-flex flex-row p-3">
                      <div className="align-self-top">
                        <p className="card-title mb-1 font-weight-bold">Readings/Writings</p>
                        <h3 className="mb-0">{taskTypeCounts['Readings/Writings']}</h3> 
                      </div>
                      <div className="align-self-center flex-grow text-end">
                        <i className="icon-lg mdi mdi-cash-multiple text-warning"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 grid-margin">
                <div className="card card-footer">
                  <div className="card-body">
                    <div className="d-flex flex-row p-3">
                      <div className="align-self-top">
                        <p className="card-title mb-1 font-weight-bold">Other/Misc</p>
                        <h3 className="mb-0">{taskTypeCounts['Other/Misc']}</h3>
                      </div>
                      <div className="align-self-center flex-grow text-end">
                        <i className="icon-lg mdi mdi-account-outline text-success"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default Dashboard;
