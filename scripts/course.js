const courses = [
    { title: 'Introduction to Web Design', credits: 3, type: 'WDD', completed: true },
    { title: 'Advanced CSS Techniques', credits: 3, type: 'WDD', completed: false },
    { title: 'Computer Science Fundamentals', credits: 4, type: 'CSE', completed: true },
    // ... additional course objects
  ];
  
  // Function to display courses
  function displayCourses(filterType = 'all') {
    const courseContainer = document.getElementById('courseContainer');
    courseContainer.innerHTML = '';
  
    const filteredCourses = courses.filter(course => {
      return filterType === 'all' ? true : course.type === filterType;
    });
  
    // Create course cards and append them to the container
    filteredCourses.forEach(course => {
      const courseCard = document.createElement('div');
      courseCard.className = 'course-card';
      courseCard.innerHTML = `<h3>${course.title}</h3>
                              <p>Credits: ${course.credits}</p>
                              <p>Status: ${course.completed ? 'Completed' : 'In Progress'}</p>`;
      courseContainer.appendChild(courseCard);
    });
  
    // Calculate total credits using reduce
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById('totalCredits').textContent = `Total Credits: ${totalCredits}`;
  }
  
  // Event listeners for filter buttons (assumes you have buttons with appropriate IDs)
  document.getElementById('allBtn').addEventListener('click', () => displayCourses('all'));
  document.getElementById('wddBtn').addEventListener('click', () => displayCourses('WDD'));
  document.getElementById('cseBtn').addEventListener('click', () => displayCourses('CSE'));
  
  // Initial display
  displayCourses();
  