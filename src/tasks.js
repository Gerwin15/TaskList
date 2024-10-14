import React, { useState } from 'react';
import { Container, TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography, Grid, List, ListItem, ListItemText } from '@mui/material';
import './task.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', priority: 'low', dueDate: '', status: 'incomplete' });
  const [filter, setFilter] = useState('all');
  const [sortOption, setSortOption] = useState('priority');

  const addTask = () => {
    if (!newTask.name || !newTask.dueDate) {
      alert('Please fill in all fields.');
      return;
    }
    const newTaskWithId = { ...newTask, id: Date.now() };
    setTasks([...tasks, newTaskWithId]);
    setNewTask({ name: '', priority: 'low', dueDate: '', status: 'incomplete' });
  };

  const toggleTaskStatus = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: task.status === 'complete' ? 'incomplete' : 'complete' } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const removeAllTasks = () => {
    setTasks([]);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    return filter === 'complete' ? task.status === 'complete' : task.status === 'incomplete';
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOption === 'priority') {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    } else if (sortOption === 'dueDate') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    return 0;
  });

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Task Manager
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Task Name"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel shrink>Priority</InputLabel>
            <Select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            type="date"
            label="Due Date"
            InputLabelProps={{ shrink: true }}
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained" color="primary" onClick={addTask}>
            Add Task
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ marginTop: 3 }}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel shrink>Status Filter</InputLabel>
            <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="complete">Complete</MenuItem>
              <MenuItem value="incomplete">Incomplete</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel shrink>Sort By</InputLabel>
            <Select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <MenuItem value="priority">Priority</MenuItem>
              <MenuItem value="dueDate">Due Date</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <List sx={{ marginTop: 3 }}>
        {sortedTasks.length > 0 ? (
          sortedTasks.map((task) => (
            <ListItem
              key={task.id}
              sx={{ backgroundColor: task.status === 'complete' ? '#dcedc8' : '#f0f4c3', marginBottom: 2, borderRadius: 1 }}
            >
              <ListItemText
                primary={task.name}
                secondary={`Priority: ${task.priority} | Due: ${new Date(task.dueDate).toLocaleDateString()}`}
              />
              <Button
                variant="contained"
                color={task.status === 'complete' ? 'secondary' : 'success'}
                onClick={() => toggleTaskStatus(task.id)}
                sx={{ marginRight: 2 }}
              >
                {task.status === 'complete' ? 'Mark Incomplete' : 'Mark Complete'}
              </Button>
              <Button variant="contained" color="error" onClick={() => removeTask(task.id)}>
                Remove
              </Button>
            </ListItem>
          ))
        ) : (
          <Typography variant="h6" textAlign="center">
            No tasks available.
          </Typography>
        )}
      </List>

      {tasks.length > 0 && (
        <Button
          fullWidth
          variant="contained"
          color="error"
          onClick={removeAllTasks}
          sx={{ marginTop: 2 }}
        >
          Remove All Tasks
        </Button>
      )}
    </Container>
  );
};

export default TaskManager;
